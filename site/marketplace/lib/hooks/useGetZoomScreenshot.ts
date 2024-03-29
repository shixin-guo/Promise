import { createZoomConfig } from '@lib/zoom';
import { useCallback } from 'react';
import zoomSDK from '@zoom/appssdk'

export interface IScreenshot {
  fileData?: string
}

export function useGetZoomScreenshot() {
  const getScreentshot = useCallback(async (size: number) => {
    try {
      await createZoomConfig()
      const resp = await zoomSDK.callZoomApi('getScreenshot', size)
      console.log(resp)
      return resp
    } catch (err) {
      console.log(err)
    }
  }, [])
  return getScreentshot
}