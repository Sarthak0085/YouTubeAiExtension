import {
  CheckIcon,
  ClipboardCopyIcon,
  Crosshair1Icon,
  MagnifyingGlassIcon
} from "@radix-ui/react-icons"
import { Button } from "components/ui/button"
import { TooltipWrapper } from "components/ui/tooltip-wrapper"
import { useCopyToClipBoard } from "lib/hooks/useCopyToClipboard"

import { useExtension } from "../../contexts/extension-context"
import { useTranscript } from "../../contexts/transcript-context"
import { cleanTextTranscript } from "../../utils/helpers"
import { Input } from "../ui/input"

interface TranscriptActionsProps {
  jumpCurrentTime: () => void
}

export default function TranscriptActions({
  jumpCurrentTime
}: TranscriptActionsProps) {
  const { transcriptSearch, setTranscriptSearch, transcriptJson } =
    useTranscript()

  const { extensionData, extensionLoading } = useExtension()

  const { isCopied, copyToClipboard } = useCopyToClipBoard({ timeout: 2000 })

  function CopyTranscript() {
    if (isCopied || !extensionData.transcript) return
    const processed = cleanTextTranscript(extensionData.transcript)
    copyToClipboard(processed)
  }

  return (
    <div className="flex flex-row w-full  justify-between items-center sticky top-0 z-10 bg-white pt-3.5 pb-3 px-3 space-x-4 dark:bg-[#0f0f0f]">
      <div className="relative w-full">
        <MagnifyingGlassIcon />
        <Input
          type="text"
          placeholder="Search Transcript"
          className="pl-8"
          onChange={(e) => {
            e.preventDefault()
            setTranscriptSearch(e.currentTarget.value)
          }}
          disabled={extensionLoading || transcriptJson.length === 0}
        />
      </div>

      <div className="flex flex-row space-x-2">
        <TooltipWrapper text={"Jump to Current Time"}>
          <Button
            variant="outline"
            size="icon"
            onClick={jumpCurrentTime}
            disabled={extensionLoading || transcriptJson.length === 0}>
            <Crosshair1Icon className="h-4 w-4 opacity-70" />
          </Button>
        </TooltipWrapper>

        <TooltipWrapper text={"Copy Transcript"}>
          <Button
            variant="outline"
            size="icon"
            onClick={CopyTranscript}
            disabled={extensionLoading || transcriptJson.length === 0}>
            {isCopied ? (
              <CheckIcon className="h-4.5 w-4.5 opacity-70" />
            ) : (
              <ClipboardCopyIcon className="h-4.5 w-4.5 opacity-70" />
            )}
          </Button>
        </TooltipWrapper>
      </div>
    </div>
  )
}
