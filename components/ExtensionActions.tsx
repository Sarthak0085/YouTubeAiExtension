import { CollapsibleTrigger } from "@radix-ui/react-collapsible"
import {
  ActivityLogIcon,
  CardStackPlusIcon,
  CaretSortIcon,
  ChatBubbleIcon,
  CheckIcon,
  Link2Icon,
  Pencil2Icon
} from "@radix-ui/react-icons"

import { useExtension } from "../contexts/extension-context"
import { useCopyToClipBoard } from "../lib/hooks/useCopyToClipboard"
import { Button } from "./ui/button"
import { TooltipWrapper } from "./ui/tooltip-wrapper"

export default function ExtensionActions() {
  const { setExtensionPanel, extensionIsOpen, setExtensionIsOpen } =
    useExtension()

  const { isCopied, copyToClipboard } = useCopyToClipBoard({ timeout: 2000 })
  function copyVideoURL() {
    if (isCopied) return
    copyToClipboard(window.location.href)
  }
  return (
    <div className="flex items-center justify-between border-zinc-200 rounded-md p-2.5 px-3 dark:bg-[#0f0f0f] dark:text-white dark:border-zinc-800">
      <CardStackPlusIcon className="h-6 w-6 opacity-50 ml-2" />
      <div className="flex items-center justify-between space-x-2">
        <div className="flex -space-x-px">
          <Button
            variant="outline"
            className="rounded-r-none focus:z-10 bg-transparent space-x-2 items-center"
            onClick={() => {
              setExtensionPanel("summary")
              if (!extensionIsOpen) setExtensionIsOpen(true)
            }}>
            <Pencil2Icon className="w-4 h-4 opacity-70" />
            <span className="opacity-90">Summary</span>
          </Button>
          <Button
            variant="outline"
            className="rounded-r-none focus:z-10 bg-transparent space-x-2 items-center"
            onClick={() => {
              setExtensionPanel("transcript")
              if (!extensionIsOpen) setExtensionIsOpen(true)
            }}>
            <ActivityLogIcon className="w-4 h-4 opacity-70" />
            <span className="opacity-90">Transcript</span>
          </Button>
          <Button
            variant="outline"
            className="rounded-l-none focus:z-10 bg-transparent space-x-2 items-center"
            onClick={() => {
              setExtensionPanel("chat")
              if (!extensionIsOpen) setExtensionIsOpen(true)
            }}>
            <ChatBubbleIcon className="w-4 h-4 opacity-70" />
            <span className="opacity-90">Chat</span>
          </Button>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <TooltipWrapper text={"Copy Video URL"}>
          <Button variant="outline" size="icon" onClick={() => copyVideoURL()}>
            {isCopied ? (
              <CheckIcon className="h-4.5 w-4.5 opacity-70" />
            ) : (
              <Link2Icon className="h-4.5 w-4.5 opacity-70" />
            )}
          </Button>
        </TooltipWrapper>

        <CollapsibleTrigger asChild>
          <Button variant="outline" size="icon">
            <CaretSortIcon className="h-4.5 w-4.5 opacity-70" />
          </Button>
        </CollapsibleTrigger>
      </div>
    </div>
  )
}
