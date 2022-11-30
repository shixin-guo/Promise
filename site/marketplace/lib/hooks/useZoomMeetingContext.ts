import { createZoomConfig } from '@lib/zoom';
import { useState, useEffect, useCallback } from 'react';
import zoomSDK from '@zoom/appssdk'

export function useZoomMeetingContext(deps?: any[]) {
  const [ meeting, setMeeting ] = useState(false)

  const handler = useCallback(async () => {
    await createZoomConfig()
    try {
      const resp = await zoomSDK.getRunningContext()
      if (resp.context === 'inMeeting') {
        setMeeting(true)
      } else {
        setMeeting(false)
      }
    } catch (err) {
      console.log(err)
      setMeeting(false)
    }
  }, [])

  useEffect(() => {
    handler()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...(deps || [])])
  return meeting
}