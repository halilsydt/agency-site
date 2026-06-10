import * as React from "react"

import { cn } from "@/lib/utils"

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<"textarea">
>(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        // Atlas .field textarea (atlas.css:324–326,76): same field styling + min-h + vertical resize.
        "flex min-h-[120px] w-full resize-y rounded-[12px] border border-line bg-bg px-[15px] py-[13px] font-sans text-[15px] text-ink transition-all duration-150 placeholder:text-soft focus-visible:border-green focus-visible:bg-surface focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-green/10 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      ref={ref}
      {...props}
    />
  )
})
Textarea.displayName = "Textarea"

export { Textarea }
