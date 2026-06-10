import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

// Atlas pill/tag treatment (atlas.css:82,109,163–165): rounded-full, display font, semibold.
const badgeVariants = cva(
  "inline-flex items-center rounded-full border border-transparent px-[11px] py-[5px] font-disp text-[13px] font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-green focus:ring-offset-2",
  {
    variants: {
      variant: {
        // emerald pill (.viz-h .pill): green-soft bg, green-d text — used for "Most Popular"
        default: "bg-green-soft text-green-d",
        // ink tag (.panel.amz .tag)
        secondary: "bg-ink text-white",
        // clay tag (.panel.ets .tag)
        destructive: "bg-clay-soft text-clay",
        // outline pill on the line border
        outline: "border-line bg-transparent text-ink",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
