import { createZoomConfig } from '@lib/zoom';
import { useState, useCallback } from 'react';
import zoomSDK from '@zoom/appssdk';

type PromiseType<T> = T extends Promise<infer P> ? P : never

export type ZoomVirtualBackgroundResult = PromiseType<ReturnType<typeof zoomSDK.setVirtualBackground>>['message'] | 'Pendding' | 'Null'

export function useZoomVirtualBackground() {
  const [ state, setState ] = useState<ZoomVirtualBackgroundResult>('Null')
  
  const upload = useCallback(async (data: ImageData | string) => {
    const string = typeof data === 'string'
    const params = string ? {
      fileUrl: data
    } : {
      imageData: data
    }
    try {
      await createZoomConfig()
      zoomSDK.setVirtualBackground(params).then(resp => {
        setState(resp.message)
      }).catch(() => setState('Failure'))
    } catch (err) {
      setState('Failure')
    }
  }, [setState])
  return {
    state,
    upload
  }
}