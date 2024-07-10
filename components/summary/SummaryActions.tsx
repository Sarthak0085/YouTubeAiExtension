import { CheckIcon, ClipboardCopyIcon, ReloadIcon } from "@radix-ui/react-icons"

import { useSummary } from "../../contexts/summary-context"
import { models, prompts } from "../../lib/constants"
import { useCopyToClipBoard } from "../../lib/hooks/useCopyToClipboard"
import type { Model, Prompt } from "../../lib/types"
import { Button } from "../ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "../ui/select"
import { TooltipWrapper } from "../ui/tooltip-wrapper"

export default function SummaryActions() {
  const {
    summaryContent,
    summaryIsGenerating,
    summaryModel,
    summaryPrompt,
    setSummaryModel,
    setSummaryPrompt,
    generateSummary
  } = useSummary()

  const { isCopied, copyToClipboard } = useCopyToClipBoard({
    timeout: 2000
  })

  function copySummaryContent() {
    if (isCopied || !summaryContent || summaryIsGenerating) return
    copyToClipboard(summaryContent)
  }

  return (
    <div className="flex flex-row w-full justify-between items-center sticky top-0 z-10 bg-white pt-3.5 pb-2 px-3">
      <Select
        value={summaryModel.value}
        onValueChange={(value) =>
          setSummaryModel(models.find((model) => model.value === value))
        }>
        <SelectTrigger className="w-fit space-x-3">
          <SelectValue placeholder="Model" />
        </SelectTrigger>
        <SelectContent>
          {models.map((model: Model) => (
            <SelectItem key={model.value} value={model.value}>
              <div className="flex flex-row items-center">
                <div className="mr-2">{model.icon}</div>
                {model.label}
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <div className="flex flex-row space-x-2">
        <TooltipWrapper text={"Regenerate Summary"}>
          <Button
            variant="outline"
            size="icon"
            onClick={generateSummary}
            disabled={summaryIsGenerating}>
            <ReloadIcon className="w-4 h-4 opacity-70" />
          </Button>
        </TooltipWrapper>

        <TooltipWrapper text={"Copy Summary"}>
          <Button
            variant="outline"
            size="icon"
            onClick={copySummaryContent}
            disabled={summaryIsGenerating}>
            {isCopied ? (
              <CheckIcon className="w-4 h-4 opacity-70" />
            ) : (
              <ClipboardCopyIcon className="w-4 h-4 opacity-70" />
            )}
          </Button>
        </TooltipWrapper>
      </div>

      <Select
        value={summaryPrompt.value}
        onValueChange={(value) =>
          setSummaryPrompt(prompts.find((prompt) => prompt.value === value))
        }>
        <SelectTrigger className="w-fit space-x-3">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {prompts.map((prompt: Prompt) => (
            <SelectItem key={prompt.value} value={prompt.value}>
              {prompt.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
