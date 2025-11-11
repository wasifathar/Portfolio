import * as React from "react"
import { motion, useMotionValue, useSpring, HTMLMotionProps, useTransform } from "framer-motion"
import { createContext, useContext, useEffect, useRef } from "react"

export type CursorFollowSide = "top" | "bottom" | "left" | "right"
export type CursorFollowAlign = "start" | "center" | "end"
export type SpringOptions = {
  stiffness?: number
  damping?: number
  bounce?: number
}

interface CursorContextValue {
  global: boolean
  cursorX: ReturnType<typeof useMotionValue<number>>
  cursorY: ReturnType<typeof useMotionValue<number>>
  localX?: ReturnType<typeof useMotionValue<number>>
  localY?: ReturnType<typeof useMotionValue<number>>
}

const CursorContext = createContext<CursorContextValue | null>(null)

function useCursorContext() {
  const context = useContext(CursorContext)
  if (!context) {
    throw new Error("Cursor components must be used within CursorProvider")
  }
  return context
}

export interface CursorProviderProps {
  children?: React.ReactNode
  global?: boolean
}

export function CursorProvider({ children, global = false }: CursorProviderProps) {
  const cursorX = useMotionValue(typeof window !== 'undefined' ? window.innerWidth / 2 : 0)
  const cursorY = useMotionValue(typeof window !== 'undefined' ? window.innerHeight / 2 : 0)

  useEffect(() => {
    const updateCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
    }

    window.addEventListener("mousemove", updateCursor)
    return () => window.removeEventListener("mousemove", updateCursor)
  }, [cursorX, cursorY])

  return (
    <CursorContext.Provider value={{ global, cursorX, cursorY }}>
      {children}
    </CursorContext.Provider>
  )
}

export interface CursorContainerProps extends HTMLMotionProps<"div"> {
  children?: React.ReactNode
}

export function CursorContainer({ children, className, ...props }: CursorContainerProps) {
  const { global, cursorX, cursorY } = useCursorContext()
  const containerRef = useRef<HTMLDivElement>(null)
  const localX = useMotionValue(-1000)
  const localY = useMotionValue(-1000)

  useEffect(() => {
    if (global) return

    const container = containerRef.current
    if (!container) return

    const updateLocalCursor = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect()
      localX.set(e.clientX - rect.left)
      localY.set(e.clientY - rect.top)
    }

    const handleMouseLeave = () => {
      localX.set(-1000)
      localY.set(-1000)
    }

    container.addEventListener("mousemove", updateLocalCursor)
    container.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      container.removeEventListener("mousemove", updateLocalCursor)
      container.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [global, localX, localY])

  // If global, just pass through the context without wrapping
  if (global) {
    return (
      <motion.div
        className={className}
        style={{
          ...props.style,
        }}
        {...props}
      >
        {children}
      </motion.div>
    )
  }

  return (
    <CursorContext.Provider value={{ global, cursorX: localX, cursorY: localY, localX, localY }}>
      <motion.div
        ref={containerRef}
        className={className}
        style={{
          position: "relative",
          cursor: "default",
          ...props.style,
        }}
        {...props}
      >
        {children}
      </motion.div>
    </CursorContext.Provider>
  )
}

export interface CursorProps extends HTMLMotionProps<"div"> {
  asChild?: boolean
}

export function Cursor({ asChild = false, style, children, ...props }: CursorProps) {
  const { cursorX, cursorY, global } = useCursorContext()
  const springX = useSpring(cursorX, { stiffness: 500, damping: 50 })
  const springY = useSpring(cursorY, { stiffness: 500, damping: 50 })

  const x = useTransform(springX, (value) => `${value}px`)
  const y = useTransform(springY, (value) => `${value}px`)

  const cursorStyle: React.CSSProperties = {
    position: global ? "fixed" : "absolute",
    left: x,
    top: y,
    pointerEvents: "none",
    zIndex: 99999,
    transform: "translate(-50%, -50%)",
    willChange: "transform",
    ...style,
  }

  if (asChild && React.isValidElement(children)) {
    return (
      <motion.div
        style={cursorStyle}
        {...props}
      >
        {children}
      </motion.div>
    )
  }

  return (
    <motion.div
      style={cursorStyle}
      {...props}
    >
      {children}
    </motion.div>
  )
}

export interface CursorFollowProps extends Omit<HTMLMotionProps<"div">, "children"> {
  asChild?: boolean
  children?: React.ReactNode
  side?: CursorFollowSide
  sideOffset?: number
  align?: CursorFollowAlign
  alignOffset?: number
  transition?: SpringOptions
}

export function CursorFollow({
  asChild = false,
  children,
  side = "bottom",
  sideOffset = 15,
  align = "end",
  alignOffset = 5,
  transition = { stiffness: 500, damping: 50, bounce: 0 },
  style,
  ...props
}: CursorFollowProps) {
  const { cursorX, cursorY, global } = useCursorContext()
  const springX = useSpring(cursorX, transition)
  const springY = useSpring(cursorY, transition)
  const followRef = useRef<HTMLDivElement>(null)

  const followX = useMotionValue(0)
  const followY = useMotionValue(0)

  useEffect(() => {
    const updatePosition = () => {
      if (!followRef.current) return

      const rect = followRef.current.getBoundingClientRect()
      let x = springX.get()
      let y = springY.get()

      // Calculate position based on side
      switch (side) {
        case "top":
          y = y - rect.height - sideOffset
          break
        case "bottom":
          y = y + sideOffset
          break
        case "left":
          x = x - rect.width - sideOffset
          break
        case "right":
          x = x + sideOffset
          break
      }

      // Calculate position based on align
      switch (align) {
        case "start":
          if (side === "top" || side === "bottom") {
            x = x - alignOffset
          } else {
            y = y - alignOffset
          }
          break
        case "center":
          if (side === "top" || side === "bottom") {
            x = x - rect.width / 2
          } else {
            y = y - rect.height / 2
          }
          break
        case "end":
          if (side === "top" || side === "bottom") {
            x = x - rect.width + alignOffset
          } else {
            y = y - rect.height + alignOffset
          }
          break
      }

      followX.set(x)
      followY.set(y)
    }

    const unsubscribeX = springX.on("change", updatePosition)
    const unsubscribeY = springY.on("change", updatePosition)

    return () => {
      unsubscribeX()
      unsubscribeY()
    }
  }, [springX, springY, side, sideOffset, align, alignOffset, followX, followY])

  const x = useTransform(followX, (value) => `${value}px`)
  const y = useTransform(followY, (value) => `${value}px`)

  const followStyle: React.CSSProperties = {
    position: global ? "fixed" : "absolute",
    left: x,
    top: y,
    pointerEvents: "none",
    zIndex: 9998,
    ...style,
  }

  if (asChild) {
    return (
      <motion.div
        ref={followRef}
        style={followStyle}
        {...props}
      >
        {children}
      </motion.div>
    )
  }

  return (
    <motion.div
      ref={followRef}
      style={followStyle}
      {...props}
    >
      {children}
    </motion.div>
  )
}
