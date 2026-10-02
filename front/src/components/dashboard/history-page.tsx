import { useEffect, useState } from 'react'
import { CalendarDays, ChevronDown, ChevronLeft, ChevronRight, CircleCheck } from 'lucide-react'
import { fr } from 'react-day-picker/locale/fr'
import { pointagesApi, type Pointage } from '../../services/pointages'
import { Button } from '../ui/button'
import { Calendar } from '../ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { useOutletContext } from 'react-router-dom'
import type { DashboardOutletContext } from './dashboard-layout'
import { calculateWorkedMinutes, formatDuration, formatShortDate, formatTimeRange } from './pointage-utils'

export function HistoryPage() {
    useOutletContext<DashboardOutletContext>()
    const [history, setHistory] = useState<Pointage[]>([])
    const [month, setMonth] = useState(() => new Date(new Date().getFullYear(), new Date().getMonth(), 1))
    const [calendarOpen, setCalendarOpen] = useState(false)
    const [page, setPage] = useState(1)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        let active = true
        pointagesApi.history()
            .then((pointages) => {
                if (active) setHistory(pointages)
            })
            .catch((requestError: unknown) => {
                if (active) setError(requestError instanceof Error ? requestError.message : 'Lecture de l’historique impossible.')
            })
            .finally(() => {
                if (active) setLoading(false)
            })

        return () => {
            active = false
        }
    }, [])

    const monthKey = `${month.getFullYear()}-${String(month.getMonth() + 1).padStart(2, '0')}`
    const monthRows = history.filter((pointage) => pointage.date.startsWith(monthKey))
    const pageSize = 5
    const pageCount = Math.max(1, Math.ceil(monthRows.length / pageSize))
    const currentPage = Math.min(page, pageCount)
    const rows = monthRows.slice((currentPage - 1) * pageSize, currentPage * pageSize)
    const monthTitle = month.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })

    return (
        <>
            <header>
                <h1 className="text-2xl font-semibold text-slate-900 sm:text-3xl">Historique</h1>
                <p className="mt-2 text-sm text-slate-500 sm:text-base">Consultez vos pointages passés</p>
            </header>

            <div className="mt-7">
                <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
                    <PopoverTrigger
                        render={
                            <Button variant="outline" className="h-14 w-full max-w-sm justify-between border-sky-100 bg-white px-4 text-slate-800 hover:bg-sky-50" type="button" />
                        }
                    >
                        <span className="inline-flex items-center gap-3">
                            <CalendarDays className="size-5 text-sky-800" aria-hidden="true" />
                            <span className="font-medium capitalize">{monthTitle}</span>
                        </span>
                        <ChevronDown className="size-4 text-slate-500" aria-hidden="true" />
                    </PopoverTrigger>
                    <PopoverContent align="start" className="w-auto rounded-lg border border-slate-200 bg-white p-0 shadow-xl">
                        <Calendar
                            mode="single"
                            month={month}
                            onMonthChange={(value) => {
                                setMonth(new Date(value.getFullYear(), value.getMonth(), 1))
                                setPage(1)
                            }}
                            onSelect={(value) => {
                                if (!value) return
                                setMonth(new Date(value.getFullYear(), value.getMonth(), 1))
                                setPage(1)
                                setCalendarOpen(false)
                            }}
                            captionLayout="dropdown"
                            startMonth={new Date(2020, 0, 1)}
                            endMonth={new Date(new Date().getFullYear(), new Date().getMonth(), 1)}
                            disabled={{ after: new Date() }}
                            locale={fr}
                        />
                    </PopoverContent>
                </Popover>
            </div>

            <div className="mt-6">
                {loading ? (
                    <p className="py-10 text-center text-sm text-slate-500" role="status">Chargement de l’historique…</p>
                ) : error ? (
                    <p className="py-10 text-center text-sm text-red-600" role="alert">{error}</p>
                ) : monthRows.length === 0 ? (
                    <div className="rounded-lg border border-dashed border-slate-300 bg-white p-8 text-center">
                        <CalendarDays className="mx-auto size-8 text-slate-400" aria-hidden="true" />
                        <p className="mt-3 font-medium text-slate-800">Aucun pointage pour ce mois</p>
                        <p className="mt-1 text-sm text-slate-500">Les journées enregistrées apparaîtront ici.</p>
                    </div>
                ) : (
                    <Table>
                        <TableHeader>
                            <TableRow className="hover:bg-transparent">
                                <TableHead>Date</TableHead>
                                <TableHead>Matin</TableHead>
                                <TableHead>Après-midi</TableHead>
                                <TableHead>Total</TableHead>
                                <TableHead>Statut</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {rows.map((pointage) => {
                                const complete = Boolean(pointage.arrivee && pointage.pause && pointage.reprise && pointage.depart)
                                const total = pointage.depart ? formatDuration(calculateWorkedMinutes(pointage, false)) : '—'
                                return (
                                    <TableRow key={pointage.date}>
                                        <TableCell className="whitespace-nowrap font-medium text-slate-800">{formatShortDate(pointage.date)}</TableCell>
                                        <TableCell className="whitespace-nowrap">{formatTimeRange(pointage.arrivee, pointage.pause)}</TableCell>
                                        <TableCell className="whitespace-nowrap">{formatTimeRange(pointage.reprise, pointage.depart)}</TableCell>
                                        <TableCell className="whitespace-nowrap font-medium">{total}</TableCell>
                                        <TableCell>
                                            <span className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-medium ${complete ? 'bg-emerald-50 text-emerald-700' : 'bg-yellow-400 text-yellow-950'}`}>
                                                <CircleCheck className="size-3.5" aria-hidden="true" />
                                                {complete ? 'Complet' : 'Incomplet'}
                                            </span>
                                        </TableCell>
                                    </TableRow>
                                )
                            })}
                        </TableBody>
                    </Table>
                )}
            </div>

            {monthRows.length > pageSize && (
                <nav className="mt-5 flex items-center justify-center gap-2" aria-label="Pagination de l’historique">
                    <PaginationButton label="Page précédente" disabled={currentPage === 1} onClick={() => setPage((value) => Math.max(1, value - 1))}>
                        <ChevronLeft className="size-5" aria-hidden="true" />
                    </PaginationButton>
                    {Array.from({ length: pageCount }, (_, index) => index + 1).map((pageNumber) => (
                        <button key={pageNumber} className={`grid size-9 place-items-center rounded-md text-sm font-medium ${currentPage === pageNumber ? 'bg-sky-100 text-sky-800' : 'text-slate-600 hover:bg-white'}`} type="button" aria-current={currentPage === pageNumber ? 'page' : undefined} aria-label={`Page ${pageNumber}`} onClick={() => setPage(pageNumber)}>
                            {pageNumber}
                        </button>
                    ))}
                    <PaginationButton label="Page suivante" disabled={currentPage === pageCount} onClick={() => setPage((value) => Math.min(pageCount, value + 1))}>
                        <ChevronRight className="size-5" aria-hidden="true" />
                    </PaginationButton>
                </nav>
            )}
        </>
    )
}

function PaginationButton({ children, label, disabled, onClick }: { children: React.ReactNode; label: string; disabled: boolean; onClick: () => void }) {
    return (
        <button className="grid size-9 place-items-center rounded-md text-slate-600 hover:bg-white disabled:text-slate-300" type="button" aria-label={label} disabled={disabled} onClick={onClick}>
            {children}
        </button>
    )
}
