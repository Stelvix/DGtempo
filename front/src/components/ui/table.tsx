import type { ComponentProps } from 'react'

function Table({ className = '', ...props }: ComponentProps<'table'>) {
    return (
        <div className="w-full overflow-x-auto rounded-lg border border-sky-100 bg-white">
            <table className={`w-full caption-bottom text-sm ${className}`} {...props} />
        </div>
    )
}

function TableHeader({ className = '', ...props }: ComponentProps<'thead'>) {
    return <thead className={`bg-sky-50/70 [&_tr]:border-b [&_tr]:border-sky-100 ${className}`} {...props} />
}

function TableBody({ className = '', ...props }: ComponentProps<'tbody'>) {
    return <tbody className={`[&_tr:last-child]:border-0 ${className}`} {...props} />
}

function TableRow({ className = '', ...props }: ComponentProps<'tr'>) {
    return <tr className={`border-b border-slate-100 transition-colors hover:bg-slate-50/70 ${className}`} {...props} />
}

function TableHead({ className = '', ...props }: ComponentProps<'th'>) {
    return <th className={`h-12 px-4 text-left align-middle font-medium text-slate-600 ${className}`} {...props} />
}

function TableCell({ className = '', ...props }: ComponentProps<'td'>) {
    return <td className={`px-4 py-4 align-middle text-slate-700 ${className}`} {...props} />
}

export { Table, TableHeader, TableBody, TableRow, TableHead, TableCell }