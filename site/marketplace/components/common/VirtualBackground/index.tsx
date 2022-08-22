import { Button } from "@components/ui";
import { useZoomVirtualBackground } from "@lib/hooks/useZoomVirtualBackground";

interface Props {
  url: string;
}

export function ZoomVirtualBackgroundBtn({url}: Props) {
  const { state, upload, meeting } = useZoomVirtualBackground()
  console.log('meeting', meeting)
  if (!meeting) return null
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