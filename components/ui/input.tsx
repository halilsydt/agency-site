import * as React from "react"

import { cn } from "@/lib/utils"

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          // Atlas .field input (atlas.css:324–326): warm paper bg, line border, 12px radius,
          // focus → green border + surface bg + soft emerald glow ring.
          "flex w-full rounded-[12px] border border-line bg-bg px-[15px] py-[13px] font-sans text-[15px] text-ink transition-all duration-150 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-ink placeholder:text-soft focus-visible:border-green focus-visible:bg-surface focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-green/10 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
