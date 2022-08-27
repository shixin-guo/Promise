import { Button } from "@components/ui";
import { useZoomVirtualBackground } from "@lib/hooks/useZoomVirtualBackground";
import s from './VirtualBackground.module.css';
import cn from 'clsx'

interface Props {
  url: string;
  className?: string;
}

export function ZoomVirtualBackgroundBtn({url, className}: Props) {
  const { state, upload, meeting } = useZoomVirtualBackground()
  if (!meeting) return null
  let w = 'Add';
  if (state === 'Failure') {
    w = 'Failure'
  } else if (state === 'Pendding') {
    w = 'Loading...'
  } else if (state === 'Success') {
    w = 'Added'
  }
  return (
    <Button
      disabled={state === 'Failure'}
      loading={state === 'Pendding'}
      onClick={() => upload(url)}
      className={cn(s.zoomVirtualBg, className || 'right-0')}
    >
      {w}
    </Button>
  )
}