import { useEffect, useState, type ComponentType, type SVGProps } from 'react'
import { ArrowRight, CalendarDays, CircleCheck, Clock3, Coffee, FileCheck2, LogIn, Play } from 'lucide-react'
import { pointagesApi, type Pointage, type PointageAction } from '../../services/pointages'
import { Button } from '../ui/button'
import { useOutletContext } from 'react-router-dom'
import type { DashboardOutletContext } from './dashboard-layout'
import { calculateWorkedMinutes, formatDuration, formatPointageTime, getNextAction } from './pointage-utils'

const events: { field: keyof Pick<Pointage, 'arrivee' | 'pause' | 'reprise' | 'depart'>; label: string; icon: ComponentType<SVGProps<SVGSVGElement>> }[] = [
    { field: 'arrivee', label: 'Arrivée', icon: LogIn },
    { field: 'pause', label: 'Pause', icon: Coffee },
    { field: 'reprise', label: 'Reprise', icon: Play },
    { field: 'depart', label: 'Départ', icon: FileCheck2 },
]

export function PointagePage() {
    const { user } = useOutletContext<DashboardOutletContext>()
    const [pointage, setPointage] = useState<Pointage | null>(null)
    const [loading, setLoading] = useState(true)
    const [working, setWorking] = useState(false)
    const [message, setMessage] = useState('')

    async function loadPointage() {
        setLoading(true)
        try {
            setPointage(await pointagesApi.today())
            setMessage('')
        } catch (error) {
            setMessage(error instanceof Error ? error.message : 'Lecture du pointage impossible.')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        void loadPointage()
    }, [])

    async function handleAction(action: PointageAction) {
        setWorking(true)
        setMessage('')
        try {
            await pointagesApi.record(action)
            setPointage(await pointagesApi.today())
            setMessage('Pointage enregistré.')
        } catch (error) {
            setMessage(error instanceof Error ? error.message : 'Pointage impossible.')
        } finally {
            setWorking(false)
        }
    }

    const minutesWorked = calculateWorkedMinutes(pointage)
    const progress = Math.min(100, Math.round((minutesWorked / 420) * 100))
    const nextAction = getNextAction(pointage)
    const NextActionIcon = nextAction?.action === 'pause' ? Coffee : nextAction?.action === 'reprise' ? Play : nextAction?.action === 'depart' ? FileCheck2 : LogIn

    return (
        <>
            <div className="flex flex-wrap items-start justify-between gap-4">
                <header>
                    <h1 className="text-2xl font-semibold text-slate-900 sm:text-3xl">Bonjour, {user.username}</h1>
                    <p className="mt-2 text-sm text-slate-500 sm:text-base">Voici votre situation du jour</p>
                </header>
                <p className="inline-flex items-center gap-2 text-sm text-slate-500">
                    <CalendarDays className="size-4" aria-hidden="true" />
                    {new Date().toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
                </p>
            </div>

            <div className="mt-7 grid gap-4 lg:grid-cols-[1.8fr_1fr]">
                <section className="rounded-lg border border-sky-100 bg-gradient-to-br from-sky-100 to-blue-50 p-5 sm:p-7" aria-label="Temps travaillé">
                    <div className="flex items-start gap-5">
                        <span className="grid size-14 shrink-0 place-items-center rounded-full bg-sky-600 text-white shadow-sm">
                            <Clock3 className="size-7" aria-hidden="true" />
                        </span>
                        <div className="min-w-0 flex-1">
                            <p className="text-sm font-medium text-slate-700">Temps travaillé aujourd’hui</p>
                            <p className="mt-1 text-4xl font-semibold tracking-tight text-sky-950">
                                {loading ? '—' : formatDuration(minutesWorked)}
                            </p>
                            <p className="mt-1 text-sm text-slate-500">Sur 7 h prévues</p>
                            <div className="mt-4 h-2.5 overflow-hidden rounded-full bg-white/80" role="progressbar" aria-label="Progression de la journée" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100}>
                                <div className="h-full rounded-full bg-sky-500 transition-all" style={{ width: `${progress}%` }} />
                            </div>
                        </div>
                    </div>
                </section>

                <section className="flex flex-col rounded-lg border border-slate-200 bg-white p-5 sm:p-6" aria-label="Prochaine action">
                    <div className="flex items-center gap-3 text-sky-700">
                        <NextActionIcon className="size-5" aria-hidden="true" />
                        <p className="text-sm text-slate-500">Prochaine action</p>
                    </div>
                    <p className="mt-4 text-xl font-semibold text-slate-900">
                        {loading ? 'Chargement…' : nextAction?.title ?? 'Journée terminée'}
                    </p>
                    {nextAction && (
                        <Button className="mt-auto p-3 bg-sky-600 text-white hover:bg-sky-700 h-auto" type="button" disabled={working || loading} onClick={() => void handleAction(nextAction.action)}>
                            {working ? 'Enregistrement…' : nextAction.button}
                            <ArrowRight className="size-5" aria-hidden="true" />
                        </Button>
                    )}
                    {message && <p className={`mt-3 text-sm ${message === 'Pointage enregistré.' ? 'text-emerald-700' : 'text-red-600'}`} role="status">{message}</p>}
                </section>
            </div>

            <section className="mt-8" aria-labelledby="today-events-title">
                <h2 id="today-events-title" className="text-lg font-semibold text-slate-900">Mes pointages du jour</h2>
                <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                    {events.map(({ field, label, icon: Icon }) => {
                        const time = pointage?.[field] ?? null
                        return (
                            <article key={field} className="rounded-lg border border-slate-200 bg-white p-4">
                                <div className="flex items-center gap-3">
                                    <span className={`grid size-10 place-items-center rounded-full ${time ? 'bg-emerald-50 text-emerald-600' : 'bg-sky-50 text-sky-700'}`}>
                                        <Icon className="size-5" aria-hidden="true" />
                                    </span>
                                    <h3 className="text-sm font-medium text-slate-700">{label}</h3>
                                </div>
                                <p className="mt-4 text-2xl font-semibold text-slate-900">{formatPointageTime(time)}</p>
                                <p className={`mt-3 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${time ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-500'}`}>
                                    {time ? <CircleCheck className="size-3.5" aria-hidden="true" /> : <Clock3 className="size-3.5" aria-hidden="true" />}
                                    {time ? 'Enregistrée' : 'À pointer'}
                                </p>
                            </article>
                        )
                    })}
                </div>
            </section>
        </>
    )
}