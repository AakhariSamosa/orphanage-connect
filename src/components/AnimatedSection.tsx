import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { cn } from "@/lib/utils";

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  direction?: "up" | "left" | "right" | "scale";
  delay?: number;
}

export function AnimatedSection({
  children,
  className,
  direction = "up",
  delay = 0,
}: AnimatedSectionProps) {
  const { ref, isVisible } = useScrollAnimation();

  const hiddenClass = {
    up: "scroll-hidden",
    left: "scroll-hidden-left",
    right: "scroll-hidden-right",
    scale: "scroll-hidden-scale",
  }[direction];

  const visibleClass = {
    up: "scroll-visible",
    left: "scroll-visible-x",
    right: "scroll-visible-x",
    scale: "scroll-visible-scale",
  }[direction];

  return (
    <div
      ref={ref}
      className={cn(hiddenClass, isVisible && visibleClass, className)}
      style={{ transitionDelay: delay ? `${delay}ms` : undefined }}
    >
      {children}
    </div>
  );
}
