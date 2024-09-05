import * as React from 'react'

import { cn } from '@/lib/utils'

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean
}

export interface InputWithIconProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  icon: {
    render: React.ReactNode
    position: 'left' | 'right'
  }
  error?: boolean
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, error, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          'flex h-10 w-full rounded-md border border-input bg-card px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
          error && 'border-destructive',
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = 'Input'

const InputWithIcon = React.forwardRef<HTMLInputElement, InputWithIconProps>(
  ({ className, icon, type, error, ...props }, ref) => {
    return (
      <div
        className={cn(
          'relative flex h-10 w-full rounded-md border border-input bg-background text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
          error && 'border-destructive',
          className
        )}
      >
        <input
          type={type}
          ref={ref}
          {...props}
          className={cn(
            'w-full h-full px-3 py-2',
            icon.position === 'left' && 'ml-5'
          )}
        />
        {icon.render}
      </div>
    )
  }
)
InputWithIcon.displayName = 'InputWithIcon'

const InputError = ({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) => {
  return (
    <p className={cn('text-sm mb-2 text-red-500', className)} {...props}>
      {children}
    </p>
  )
}

export { Input, InputError, InputWithIcon }
