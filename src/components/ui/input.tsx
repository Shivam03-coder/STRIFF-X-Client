import * as React from "react"

import { cn } from "@/lib/utils"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        placeholder="Search..."
        className={cn(
          "flex h-15 w-full rounded-md bg-secondary-100 px-11 py-3 text-lg shadow-sm transition-colors  file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground   disabled:cursor-not-allowed disabled:opacity-50 outline-none",
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
