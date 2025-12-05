import { cn } from "@/lib/utils";

/**
 * Available container size variants.
 */
type ContainerSize = "sm" | "md" | "lg" | "xl" | "full";

/**
 * Props for the Container component.
 */
export interface ContainerProps {
  /** Container content */
  children: React.ReactNode;
  /** Additional CSS classes */
  className?: string;
  /** Max-width size variant */
  size?: ContainerSize;
}

/**
 * Size variant classes mapping.
 */
const sizeClasses: Record<ContainerSize, string> = {
  sm: "max-w-3xl",
  md: "max-w-5xl",
  lg: "max-w-6xl",
  xl: "max-w-7xl",
  full: "max-w-full",
};

/**
 * Page container component with responsive max-width and padding.
 * Centers content and provides consistent horizontal spacing across breakpoints.
 *
 * @param props - Container props
 * @param props.children - Content to display inside the container
 * @param props.className - Additional CSS classes to apply
 * @param props.size - Max-width variant (sm, md, lg, xl, full). Defaults to "xl"
 *
 * @example
 * ```tsx
 * <Container>
 *   <h1>Page Title</h1>
 *   <p>Page content goes here</p>
 * </Container>
 *
 * <Container size="md" className="py-8">
 *   <article>Narrower content</article>
 * </Container>
 * ```
 */
export function Container({
  children,
  className,
  size = "xl",
}: ContainerProps): React.ReactElement {
  return (
    <div
      className={cn(
        "mx-auto w-full px-4 sm:px-6 lg:px-8",
        sizeClasses[size],
        className
      )}
    >
      {children}
    </div>
  );
}
