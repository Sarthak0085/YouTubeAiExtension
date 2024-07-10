import { PaperPlaneIcon } from "@radix-ui/react-icons"
import { useEffect, useRef } from "react"
import Textarea from "react-textarea-autosize"

import { usePort } from "@plasmohq/messaging/hook"

import { useChat } from "../../contexts/chat-context"
import { useExtension } from "../../contexts/extension-context"
import { useEnterSubmit } from "../../lib/hooks/useEnterSubmit"
import { cn } from "../../lib/utils"
import { Button } from "../ui/button"
import { TooltipWrapper } from "../ui/tooltip-wrapper"

interface ChatPromptFormProps {
  className?: string
}

export default function ChatPromptForm({ className }: ChatPromptFormProps) {
  const port = usePort("chat" as never)

  const inputRef = useRef<HTMLTextAreaElement>(null)

  const { extensionData } = useExtension()

  const {
    chatModel,
    chatPrompt,
    chatMessages,
    setChatPrompt,
    setChatIsError,
    setChatIsGenerating,
    setChatMessages
  } = useChat()

  const { formRef, onKeyDown, onKeyUp } = useEnterSubmit()

  async function generateChat(model: string, messages: any) {
    setChatIsGenerating(true)
    setChatIsError(false)

    port.send({
      model: model,
      messages: messages,
      context: extensionData
    })
  }

  async function onSubmitHandler(e: any) {
    e.preventDefault()

    if (window.innerWidth < 600) {
      e.target["message"]?.blur()
    }

    const value = chatPrompt.trim()
    setChatPrompt("")
    if (!value) return

    const initialMessages = [...chatMessages]

    setChatMessages([
      ...initialMessages,
      {
        role: "user",
        content: value
      }
    ])

    await generateChat(chatModel.content, [
      ...initialMessages,
      {
        role: "user",
        content: value
      }
    ])
  }

  useEffect(() => {
    if (port.data?.message !== undefined && port.data.isEnd === false) {
      if (chatMessages[chatMessages.length - 1].role === "user") {
        setChatMessages([
          ...chatMessages,
          {
            role: "assistant",
            content: ""
          }
        ])
      } else {
        const newMessages = [...chatMessages]
        newMessages[newMessages.length - 1].content = port.data.message
        setChatMessages(newMessages)
      }
    } else {
      setChatIsGenerating(false)
    }

    setChatIsError(false)
  }, [port.data?.message])

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [])

  return (
    <form
      ref={formRef}
      onSubmit={onSubmitHandler}
      className={cn("absolute bottom-0 z-10 p-4 w-full bg-white", className)}>
      <div className="relative flex max-h-60 w-full grow flex-col overflow-hidden rounded-md  border border-zinc-200">
        <Textarea
          ref={inputRef}
          tabIndex={0}
          onKeyUp={onKeyUp}
          onKeyDown={onKeyDown}
          placeholder="Ask a question reagrding video."
          className="min-h-[50px] w-full resize-none bg-transparent px-6 py-6 focus-within:outline-none text-[12px]"
          autoComplete="off"
          spellCheck="false"
          autoCorrect="off"
          autoFocus
          name="message"
          rows={1}
          value={chatPrompt}
          onChange={(e) => setChatPrompt(e.target.value)}
        />

        <div className="absolute right-0 top-[10px] pr-3">
          <TooltipWrapper text="Send message">
            <Button
              type="submit"
              size="icon"
              variant="outline"
              disabled={chatPrompt === ""}
              className="size-[32px]">
              <PaperPlaneIcon className="h-4.5 w-4.5" />
            </Button>
          </TooltipWrapper>
        </div>
      </div>
    </form>
  )
}
