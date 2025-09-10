'use client'

import { useState } from 'react'
import { ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

// Define the cn function locally since the import is failing
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

interface ToggleProps {
  enabled: boolean
  onChange: (enabled: boolean) => void
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  label?: string
  className?: string
  automation_id?: string
}

export default function Toggle({
  enabled,
  onChange,
  size = 'md',
  disabled = false,
  label,
  className,
  automation_id
}: ToggleProps) {
  const [isEnabled, setIsEnabled] = useState(enabled)

  const handleToggle = () => {
    if (disabled) return
    const newState = !isEnabled
    setIsEnabled(newState)
    onChange(newState)
  }

  const sizes = {
    sm: 'w-9 h-5',
    md: 'w-11 h-6',
    lg: 'w-14 h-7',
  }

  const thumbSizes = {
    sm: 'h-4 w-4',
    md: 'h-5 w-5',
    lg: 'h-6 w-6',
  }

  const translates = {
    sm: 'translate-x-4',
    md: 'translate-x-5',
    lg: 'translate-x-7',
  }

  return (
    <div className={cn("flex items-center", className)}>
      {label && (
        <span className="mr-3 text-sm font-medium text-gray-900">{label}</span>
      )}
      <button
        type="button"
        data-automation-id={automation_id}
        className={cn(
          'relative inline-flex flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-offset-2',
          isEnabled ? 'bg-primary-600' : 'bg-gray-200',
          disabled && 'opacity-50 cursor-not-allowed',
          sizes[size]
        )}
        role="switch"
        aria-checked={isEnabled}
        onClick={handleToggle}
        disabled={disabled}
      >
        <span
          className={cn(
            'pointer-events-none inline-block rounded-full bg-white shadow transform ring-0 transition duration-200 ease-in-out',
            isEnabled ? translates[size] : 'translate-x-0',
            thumbSizes[size]
          )}
        />
      </button>
    </div>
  )
}
