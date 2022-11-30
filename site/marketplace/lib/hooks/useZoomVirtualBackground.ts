import { createZoomConfig } from '@lib/zoom';
import { useState, useCallback, useEffect } from 'react';
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
    const [w,h] = [img.width,img.height]
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
      zoomSDK.setVirtualBackground(params).then(resp => {
        console.log(resp)
        setState(resp.message)
      }).catch((err) => {
        console.log(err)
        setState('Failure')
      })
    } catch (err) {
      console.log(err)
      setState('Failure')
    }
  }, [setState])
  const handler = useCallback(async () => {
    const resp = await createZoomConfig()
    console.log(resp?.runningContext )
    if (resp?.runningContext === 'inMeeting') {
      setMeeting(true)
    } else {
      setMeeting(false)
    }
  }, [])
  // use
  useEffect(() => {
    handler()
  }, [handler])
  return {
    meeting,
    state,
    upload
  }
}