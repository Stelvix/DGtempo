import { Button as ButtonPrimitive } from '@base-ui/react/button'
import type { ComponentProps } from 'react'

type ButtonProps = ComponentProps<typeof ButtonPrimitive>

function Button({ className = '', ...props }: ButtonProps) {
    return (
        <ButtonPrimitive
            className={`inline-flex min-h-14 w-full items-center justify-center gap-3 rounded-lg bg-sky-600 px-5 font-semibold text-white transition-colors hover:bg-sky-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
            {...props}
        />
    )
}

export { Button }
