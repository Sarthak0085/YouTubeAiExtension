import type { Message } from "../../lib/constants"
import Markdown from "../Markdown"
import { IconOpenAI, IconUser, Spinner } from "../ui/icons"

interface ChatItemProps {
  message: Message
}

export default function ChatItem({ message }: ChatItemProps) {
  return (
    <div className="group relative flex items-start px-8 py-5">
      <div
        className="
      flex h-10 w-10 shrink-0 select-none items-center justify-center rounded-md border border-zinc-200  -mt-1">
        {message.role === "user" ? <IconUser /> : <IconOpenAI />}
      </div>
      <div className="ml-4 flex-1 space-y-2 overflow-hidden px-1">
        {message.role === "assistant" && !message.content ? (
          <span>
            <Spinner />
          </span>
        ) : (
          <Markdown markdown={message.content} />
        )}
      </div>
    </div>
  )
}
