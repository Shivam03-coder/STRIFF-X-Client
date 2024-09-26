import * as React from "react";

import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        placeholder="Search..."
        className={cn(
          "h-15 file:bg-transparent file:text-foreground placeholder:text-muted-foreground flex w-full rounded-md bg-secondary-100 px-11 py-3 text-lg shadow-sm outline-none transition-colors file:text-sm file:font-medium disabled:cursor-not-allowed disabled:opacity-50 dark:bg-tertiary-300 placeholder:dark:text-primary-500",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

export { Input };
