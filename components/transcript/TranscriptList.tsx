import { memo, useMemo } from "react"

import TranscriptItem from "./TranscriptItem"

type Transcript = {
  text: string
  startTime: number
  endTime: number
}

interface TranscriptListsProps {
  transcript: Transcript[]
  searchInput: string
}

function TranscriptLists({ transcript, searchInput }: TranscriptListsProps) {
  const filteredTranscripts = useMemo(() => {
    return searchInput
      ? transcript.filter((item) =>
          item.text.toLowerCase().includes(searchInput.toLowerCase())
        )
      : transcript
  }, [transcript, searchInput])

  if (filteredTranscripts.length === 0) {
    return (
      <div className="flex justify-center items-center w-full h-32">
        <span>No results found.</span>
      </div>
    )
  }

  return (
    <div>
      {filteredTranscripts.map((transcript: Transcript) => (
        <TranscriptItem
          key={transcript.startTime}
          item={transcript}
          searchInput={searchInput}
        />
      ))}
    </div>
  )
}

export default memo(TranscriptLists, (prevProps, nextProps) => {
  return (
    prevProps.transcript === nextProps.transcript &&
    prevProps.searchInput === nextProps.searchInput
  )
})
