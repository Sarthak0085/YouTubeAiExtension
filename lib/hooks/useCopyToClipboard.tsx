import { useState } from "react"

interface CopyToClipBoardProps {
  timeout?: number
}

export function useCopyToClipBoard({ timeout = 2000 }: CopyToClipBoardProps) {
  const [isCopied, setIsCopied] = useState<boolean>(false)

  const copyToClipboard = (value: string) => {
    if (typeof window === "undefined" || !navigator.clipboard?.writeText) return
    if (!value) return

    navigator.clipboard.writeText(value).then(() => {
      setIsCopied(true)

      setTimeout(() => {
        setIsCopied(false)
      }, timeout)
    })
  }

  return { isCopied, copyToClipboard }
}
