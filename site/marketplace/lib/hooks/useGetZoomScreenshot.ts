import { useCallback } from 'react';
import zoomSDK from '@zoom/appssdk'

export interface IScreenshot {
  fileData?: string
}

export function useGetZoomScreenshot() {
  const getScreentshot = useCallback((size: number) => {
    try {
      console.log((zoomSDK as any).getScreenshot)
    } catch (err) {

    }
  }, [])
  return getScreentshot
}