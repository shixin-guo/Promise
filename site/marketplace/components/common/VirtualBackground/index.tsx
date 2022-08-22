import { Button } from "@components/ui";
import { useZoomMeetingContext } from "@lib/hooks/useZoomMeetingContext";
import { useZoomVirtualBackground } from "@lib/hooks/useZoomVirtualBackground";

interface Props {
  url: string;
}

export function ZoomVirtualBackgroundBtn({url}: Props) {
  const meeting = useZoomMeetingContext()
  const { state, upload } = useZoomVirtualBackground()
  if (!meeting) return
  return (
    <Button
      disabled={state === 'Failure'}
      loading={state === 'Pendding'}
      onClick={() => upload(url)}
    >
      Set to virtual-background
    </Button>
  )
}