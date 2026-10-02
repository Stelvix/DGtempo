import { ArrowRight, Clock3, History, UserRound } from 'lucide-react'
import { Link, useOutletContext } from 'react-router-dom'
import type { DashboardOutletContext } from './dashboard-layout'

export function HomeDashboardPage() {
    const { user } = useOutletContext<DashboardOutletContext>()

    return (
        <>
            <header>
                <h1 className="text-2xl font-semibold text-slate-900 sm:text-3xl">Bonjour, {user.username}</h1>
                <p className="mt-2 text-sm text-slate-500 sm:text-base">Bienvenue dans votre espace de pointage.</p>
            </header>
            <div className="mt-7 grid gap-4 sm:grid-cols-2">
                <Link className="group rounded-lg border border-sky-100 bg-white p-5 transition hover:border-sky-300 hover:bg-sky-50/50" to="/pointage">
                    <span className="grid size-10 place-items-center rounded-lg bg-sky-50 text-sky-700">
                        <Clock3 className="size-5" aria-hidden="true" />
                    </span>
                    <h2 className="mt-4 font-semibold text-sky-950">Mon pointage</h2>
                    <p className="mt-1 text-sm text-slate-500">Consulter la journée et enregistrer une action.</p>
                    <span className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-sky-700">
                        Accéder au pointage <ArrowRight className="size-4 transition group-hover:translate-x-1" aria-hidden="true" />
                    </span>
                </Link>
                <Link className="group rounded-lg border border-slate-200 bg-white p-5 transition hover:border-sky-200 hover:bg-slate-50" to="/historique">
                    <span className="grid size-10 place-items-center rounded-lg bg-slate-50 text-slate-600">
                        <History className="size-5" aria-hidden="true" />
                    </span>
                    <h2 className="mt-4 font-semibold text-slate-900">Historique</h2>
                    <p className="mt-1 text-sm text-slate-500">Retrouver les heures de vos journées précédentes.</p>
                    <span className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-sky-700">
                        Voir l’historique <ArrowRight className="size-4 transition group-hover:translate-x-1" aria-hidden="true" />
                    </span>
                </Link>
                <div className="rounded-lg border border-slate-200 bg-white p-5 sm:col-span-2">
                    <div className="flex items-center gap-3">
                        <span className="grid size-10 place-items-center rounded-lg bg-slate-50 text-slate-600">
                            <UserRound className="size-5" aria-hidden="true" />
                        </span>
                        <div>
                            <h2 className="font-semibold text-slate-900">Mon compte</h2>
                            <p className="text-sm text-slate-500">{user.email}</p>
                        </div>
                        <Link className="ml-auto inline-flex items-center gap-2 text-sm font-medium text-sky-700 hover:text-sky-900" to="/profil">
                            Mon profil <ArrowRight className="size-4" aria-hidden="true" />
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}