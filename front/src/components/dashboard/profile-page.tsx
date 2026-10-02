import { useOutletContext } from 'react-router-dom'
import type { DashboardOutletContext } from './dashboard-layout'

export function ProfilePage() {
    const { user } = useOutletContext<DashboardOutletContext>()

    return (
        <>
            <header>
                <h1 className="text-2xl font-semibold text-slate-900 sm:text-3xl">Mon profil</h1>
                <p className="mt-2 text-sm text-slate-500 sm:text-base">Informations de votre compte.</p>
            </header>
            <dl className="mt-7 divide-y divide-slate-100 rounded-lg border border-slate-200 bg-white px-5">
                <ProfileRow label="Nom d’utilisateur" value={user.username} />
                <ProfileRow label="Adresse e-mail" value={user.email} />
                <ProfileRow label="Rôle" value={user.role} />
            </dl>
        </>
    )
}

function ProfileRow({ label, value }: { label: string; value: string }) {
    return (
        <div className="flex flex-col gap-1 py-4 sm:flex-row sm:items-center sm:justify-between">
            <dt className="text-sm text-slate-500">{label}</dt>
            <dd className="text-sm font-medium text-slate-900">{value}</dd>
        </div>
    )
}