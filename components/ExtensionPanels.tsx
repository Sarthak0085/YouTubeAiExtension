import { useExtension } from "../contexts/extension-context"
import Chat from "./chat/Chat"
import Summary from "./summary/Summary"
import Transcript from "./transcript/Transcript"

export default function ExtensionPanels() {
  const { extensionPanel } = useExtension()

  return (
    <div>
      {extensionPanel === "Summary" && <Summary />}
      {extensionPanel === "Transcript" && <Transcript />}
      {extensionPanel === "Chat" && <Chat />}
    </div>
  )
}
