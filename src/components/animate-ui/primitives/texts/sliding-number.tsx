import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

export interface SlidingNumberProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: number | string
  duration?: number
  direction?: "up" | "down"
  className?: string
}

const SlidingNumber = React.forwardRef<HTMLDivElement, SlidingNumberProps>(
  ({ value = 0, duration = 0.3, direction = "up", className, ...props }, ref) => {
    const [displayValue, setDisplayValue] = React.useState(value)
    const [key, setKey] = React.useState(0)

    React.useEffect(() => {
      if (value !== displayValue) {
        setKey((prev) => prev + 1)
        setDisplayValue(value)
      }
    }, [value, displayValue])

    const variants = {
      enter: {
        y: direction === "up" ? 20 : -20,
        opacity: 0,
      },
      center: {
        y: 0,
        opacity: 1,
      },
      exit: {
        y: direction === "up" ? -20 : 20,
        opacity: 0,
      },
    }

    return (
      <div
        ref={ref}
        className={cn("relative inline-block overflow-hidden", className)}
        {...props}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={key}
            initial="enter"
            animate="center"
            exit="exit"
            variants={variants}
            transition={{
              duration,
              ease: [0.4, 0, 0.2, 1],
            }}
            className="inline-block"
          >
            {displayValue}
          </motion.span>
        </AnimatePresence>
      </div>
    )
  }
)

SlidingNumber.displayName = "SlidingNumber"

export { SlidingNumber }

