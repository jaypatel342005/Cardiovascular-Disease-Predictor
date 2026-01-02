'use client'

import { MinusIcon, PlusIcon } from 'lucide-react'
import { Button, Group, Input, NumberField } from 'react-aria-components'
import { forwardRef } from 'react'

interface NumberInputProps {
  value: number
  onChange: (value: number) => void
  minValue?: number
  maxValue?: number
  step?: number
  disabled?: boolean
  className?: string
}

export const NumberInput = forwardRef<HTMLDivElement, NumberInputProps>(
  ({ value, onChange, minValue = 0, maxValue, step = 1, disabled = false, className }, ref) => {
    return (
      <NumberField 
        value={value} 
        onChange={onChange}
        minValue={minValue}
        maxValue={maxValue}
        step={step}
        isDisabled={disabled}
        className={className}
      >
        <Group className='relative inline-flex h-10 w-full min-w-0 items-center overflow-hidden rounded-md border border-input bg-background/50 text-sm transition-[color,box-shadow] outline-none data-[focus-within]:border-ring data-[focus-within]:ring-[3px] data-[focus-within]:ring-ring/50 data-[disabled]:pointer-events-none data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50'>
          <Button
            slot='decrement'
            className='ml-2 flex aspect-square h-5 items-center justify-center rounded-sm border border-input bg-background text-muted-foreground text-sm transition-colors hover:bg-accent hover:text-foreground disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50'
          >
            <MinusIcon className='size-3' />
            <span className='sr-only'>Decrement</span>
          </Button>
          <Input className='w-full grow px-3 py-2 text-center tabular-nums outline-none bg-transparent border-none selection:bg-primary selection:text-primary-foreground' />
          <Button
            slot='increment'
            className='mr-2 flex aspect-square h-5 items-center justify-center rounded-sm border border-input bg-background text-muted-foreground text-sm transition-colors hover:bg-accent hover:text-foreground disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50'
          >
            <PlusIcon className='size-3' />
            <span className='sr-only'>Increment</span>
          </Button>
        </Group>
      </NumberField>
    )
  }
)

NumberInput.displayName = 'NumberInput'
