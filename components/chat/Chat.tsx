import ChatActions from "./ChatActions"
import ChatList from "./ChatList"
import ChatPromptForm from "./ChatPromptForm"

export default function Chat() {
  return (
    <div className="w-full h-[498px] relative bg-white">
      <ChatActions />
      <ChatList />
      <ChatPromptForm />
    </div>
  )
}
