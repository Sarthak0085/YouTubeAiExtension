import { ChatProvider } from "../contexts/chat-context"
import { ExtensionProvider } from "../contexts/extension-context"
import { SummaryProvider } from "../contexts/summary-context"
import { TranscriptProvider } from "../contexts/transcript-context"

export default function Provider({ children }) {
  return (
    <ExtensionProvider>
      <ChatProvider>
        <SummaryProvider>
          <TranscriptProvider>{children}</TranscriptProvider>
        </SummaryProvider>
      </ChatProvider>
    </ExtensionProvider>
  )
}
