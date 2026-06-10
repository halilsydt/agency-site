"use client"

import * as React from "react"
import * as AccordionPrimitive from "@radix-ui/react-accordion"
import { ChevronDown } from "lucide-react"

import { cn } from "@/lib/utils"

const Accordion = AccordionPrimitive.Root

const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  // Atlas details.q (atlas.css:306–315): card container, open → green border + soft shadow.
  <AccordionPrimitive.Item
    ref={ref}
    className={cn(
      "rounded-[16px] border border-line bg-surface px-[26px] py-[22px] transition-all duration-200 data-[state=open]:border-green data-[state=open]:shadow-sh-sm",
      className
    )}
    {...props}
  />
))
AccordionItem.displayName = "AccordionItem"

const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  // Atlas details.q summary: display font, 18px, space-between, no hover underline.
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        "flex flex-1 items-center justify-between gap-[18px] text-left font-disp text-lg font-semibold text-ink transition-all rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green focus-visible:ring-offset-2 [&[data-state=open]>span>svg]:rotate-180",
        className
      )}
      {...props}
    >
      {children}
      {/* Atlas .pl affordance: emerald-soft circle holding the rotating chevron */}
      <span className="flex h-[26px] w-[26px] flex-none items-center justify-center rounded-full bg-green-soft">
        <ChevronDown className="h-4 w-4 shrink-0 text-green-d transition-transform duration-200" />
      </span>
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
))
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName

const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  // Atlas details.q p: soft text, 15px, comfortable top margin.
  <AccordionPrimitive.Content
    ref={ref}
    className="overflow-hidden text-[15px] text-soft data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
    {...props}
  >
    <div className={cn("max-w-[60em] pt-[14px]", className)}>{children}</div>
  </AccordionPrimitive.Content>
))
AccordionContent.displayName = AccordionPrimitive.Content.displayName

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
