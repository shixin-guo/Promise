import { createZoomConfig } from '@lib/zoom';
import { useState, useCallback } from 'react';
import zoomSDK from '@zoom/appssdk';

function dowloadFirebaseImage(url: string) {
  return new Promise((res,rej) => {
    const img = new Image()
    img.crossOrigin = ''
    img.onload = () => {
      res(img)
    }
    img.src = url
  }).then((img: any) => {
    let [w,h] = [img.width,img.height]
    // Say the file is 1920x1080
    // divide max(w,h) by 256 to get factor
    let factor = Math.max(w,h)/256
    w = w/factor
    h = h/factor
    const canvas = document.createElement('canvas')
    canvas.width = w
    canvas.height = h
    const ctx = canvas.getContext('2d')
    ctx!.drawImage(img, 0, 0)
    return ctx!.getImageData(0, 0, w, h)
  })
}

type PromiseType<T> = T extends Promise<infer P> ? P : never

export type ZoomVirtualBackgroundResult = PromiseType<ReturnType<typeof zoomSDK.setVirtualBackground>>['message'] | 'Pendding' | 'Null'

export function useZoomVirtualBackground() {
  const [ state, setState ] = useState<ZoomVirtualBackgroundResult>('Null')
  const [ meeting, setMeeting ] = useState(false)
  
  const upload = useCallback(async (data: ImageData | string) => {
    setState('Pendding')
    const string = typeof data === 'string'
    const params = {
      imageData: string ? await dowloadFirebaseImage(data) : data
    }
    console.log(params)
    try {
      const resp = await createZoomConfig()
      if (resp?.runningContext === 'inMeeting') {
        setMeeting(true)
      } else {
        setMeeting(false)
      }
      zoomSDK.setVirtualBackground(params).then(resp => {
        console.log(resp)
        setState(resp.message)
      }).catch((err) => {
        console.log(err)
        setState('Failure')
      })
    } catch (err) {
      console.log(err)
      setMeeting(false)
      setState('Failure')
    }
  }, [setState])
  return {
    meeting,
    state,
    upload
  }
}