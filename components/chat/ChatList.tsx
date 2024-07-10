import { useEffect, useRef } from "react"

import { useChat } from "../../contexts/chat-context"
import type { Message } from "../../lib/constants"
import { cn } from "../../lib/utils"
import ChatItem from "./ChatItem"

interface ChatListProps {
  className?: string
}

export default function ChatList({ className }: ChatListProps) {
  const { chatMessages, chatPrompt } = useChat()

  const scrollContainerRef = useRef(null)

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current
    if (scrollContainer) {
      scrollContainer.scrollTop = scrollContainer.scrollHeight
    }
  }, [chatMessages])

  return (
    <div className={cn("pt-16", className)}>
      <div
        ref={scrollContainerRef}
        className="h-[375px] overflow-y-scroll no-scrollbar">
        {chatMessages.map((message: Message, index: number) => (
          <ChatItem key={index} message={message} />
        ))}
      </div>
    </div>
  )
}
