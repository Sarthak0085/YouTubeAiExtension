import React from "react"

import { useExtension } from "../../contexts/extension-context"
import { useTranscript } from "../../contexts/transcript-context"
import TranscriptList from "./TranscriptList"
import TranscriptSkeleton from "./TranscriptSkeleton"

interface TranscriptContentProps {
  ref: React.RefObject<HTMLDivElement>
}

const TranscriptContent = React.forwardRef<
  HTMLDivElement,
  TranscriptContentProps
>((props, ref) => {
  const { transcriptJson, transcriptSearch } = useTranscript()
  const { extensionLoading, extensionData } = useExtension()

  if (extensionLoading || !extensionData) {
    return (
      <div className="flex justify-center items-center w-full p-3 bg-white">
        <TranscriptSkeleton />
      </div>
    )
  }

  return (
    <div ref={ref}>
      <TranscriptList
        transcript={transcriptJson}
        searchInput={transcriptSearch}
      />
    </div>
  )
})

export default TranscriptContent
