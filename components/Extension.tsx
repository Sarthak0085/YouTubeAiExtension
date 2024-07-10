import { useExtension } from "contexts/extension-context"
import { useEffect } from "react"
import { getVideoData } from "utils/helpers"

import ExtensionActions from "./ExtensionActions"
import ExtensionPanels from "./ExtensionPanels"
import { Collapsible, CollapsibleContent } from "./ui/collapsible"

export default function Extension() {
  const {
    extensionContainer,
    extensionData,
    extensionLoading,
    extensionIsOpen,
    extensionPanel,
    extensionTheme,
    extensionVideoId,
    setExtensionContainer,
    setExtensionData,
    setExtensionIsOpen,
    setExtensionPanel,
    setExtensionLoading,
    setExtensionTheme,
    setExtensionVideoId,
    resetExtension
  } = useExtension()

  useEffect(() => {
    const getVideoId = () => {
      return new URLSearchParams(window.location.search).get("v")
    }

    const fetchVideoData = async () => {
      const id = getVideoId()

      if (id && id !== extensionVideoId) {
        setExtensionVideoId(id)
        setExtensionLoading(true)
        const data = await getVideoData(id)
        setExtensionData(data)
        setExtensionLoading(false)
      }

      console.log(id, extensionVideoId, extensionData)
    }

    fetchVideoData()

    const intervalId = setInterval(fetchVideoData, 2000)

    return () => clearInterval(intervalId)
  }, [extensionVideoId])

  useEffect(() => {
    const getCssVariable = (name: string) => {
      const rootStyle = getComputedStyle(document.documentElement)
      return rootStyle.getPropertyValue(name).trim()
    }
    const backgroundColor = getCssVariable("--yt-spec-base-background")
    console.log(backgroundColor)
    if (backgroundColor === "#fff") {
      setExtensionTheme("light")
    } else {
      setExtensionTheme("dark")
    }
  }, [extensionTheme])
  return (
    <main
      ref={setExtensionContainer}
      className={`antialiased w-full mb-3 z-10 ${extensionTheme}`}>
      <div className="w-full">
        <Collapsible
          open={extensionIsOpen}
          onOpenChange={setExtensionIsOpen}
          className="space-y-3">
          <ExtensionActions />
          <CollapsibleContent className="w-full h-fit max-h-[500px] border border-zinc-200 dark:border-zinc-800 overflow-auto rounded-md">
            <ExtensionPanels />
          </CollapsibleContent>
        </Collapsible>
      </div>
    </main>
  )
}
