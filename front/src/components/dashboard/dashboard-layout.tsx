import { useEffect, useState } from 'react'
import { House, Clock3, History, LogOut, UserRound } from 'lucide-react'
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom'
import { authApi } from '../../services/auth'
import type { User } from '../../types/user'
import { Button } from '../ui/button'
import dgsysLogo from '../../assets/dgsys-logo.svg'

export type DashboardOutletContext = {
    user: User
}

const navigation = [
    { to: '/home', label: 'Accueil', icon: House },
    { to: '/pointage', label: 'Pointage', icon: Clock3 },
    { to: '/historique', label: 'Historique', icon: History },
    { to: '/profil', label: 'Mon profil', icon: UserRound },
]

export function DashboardLayout() {
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(true)
    const [loggingOut, setLoggingOut] = useState(false)
    const [message, setMessage] = useState('')
    const navigate = useNavigate()

    useEffect(() => {
        let active = true

        authApi.currentUser()
            .then((currentUser) => {
                if (active) setUser(currentUser)
            })
            .catch(() => {
                if (active) navigate('/login', { replace: true })
            })
            .finally(() => {
                if (active) setLoading(false)
            })

        return () => {
            active = false
        }
    }, [navigate])

    async function handleLogout() {
        setLoggingOut(true)
        setMessage('')
        try {
            await authApi.logout()
            navigate('/login', { replace: true })
        } catch (error) {
            setMessage(error instanceof Error ? error.message : 'Déconnexion impossible.')
        } finally {
            setLoggingOut(false)
        }
    }

    if (loading) {
        return <main className="grid min-h-svh place-items-center bg-slate-50 text-sm text-slate-500">Chargement de votre espace…</main>
    }

    if (!user) return null

    return (
        <main className="min-h-svh bg-slate-50 font-sans text-slate-900 md:flex">
            <aside className="hidden w-64 shrink-0 flex-col border-r border-slate-200 bg-white md:flex">
                <Brand />
                <DashboardNavigation />
                <div className="mt-auto border-t border-slate-100 p-4">
                    <UserSummary user={user} />
                    <LogoutButton loading={loggingOut} onClick={handleLogout} />
                </div>
            </aside>

            <div className="flex min-h-svh min-w-0 flex-1 flex-col">
                <header className="flex items-center justify-between border-b border-slate-200 bg-white px-5 py-4 md:px-8">
                    <div className="md:hidden"><Brand compact /></div>
                    <p className="hidden text-sm text-slate-500 md:block">Espace collaborateur</p>
                    <div className="flex items-center gap-3">
                        <Link className="hidden items-center gap-2 text-sm text-slate-600 hover:text-sky-800 sm:flex" to="/profil">
                            <span className="grid size-9 place-items-center rounded-full bg-sky-600 text-sm font-semibold text-white">
                                {user.username.slice(0, 2).toUpperCase()}
                            </span>
                            {user.username}
                        </Link>
                        <button className="grid size-9 place-items-center rounded-md text-slate-500 hover:bg-slate-100 md:hidden" type="button" onClick={handleLogout} aria-label="Se déconnecter">
                            <LogOut className="size-5" aria-hidden="true" />
                        </button>
                    </div>
                </header>

                <div className="border-b border-slate-200 bg-white px-2 py-2 md:hidden">
                    <DashboardNavigation mobile />
                </div>

                <section className="flex-1 px-5 py-7 sm:px-8 md:px-10 md:py-9">
                    <div className="mx-auto w-full max-w-5xl">
                        {message && <p className="mb-5 text-sm text-red-600" role="alert">{message}</p>}
                        <Outlet context={{ user } satisfies DashboardOutletContext} />
                    </div>
                </section>
            </div>
        </main>
    )
}

function Brand({ compact = false }: { compact?: boolean }) {
    return (
        <Link className={`flex items-center gap-3 ${compact ? '' : 'border-b border-slate-100 px-6 py-5'}`} to="/home" aria-label="DGSYS, accueil">
            <img className={compact ? 'h-10 w-28 object-contain object-left' : 'h-12 w-36 object-contain object-left'} src={dgsysLogo} alt="DGsys" />
        </Link>
    )
}

function DashboardNavigation({ mobile = false }: { mobile?: boolean }) {
    return (
        <nav className={mobile ? 'grid grid-cols-4 gap-1' : 'space-y-1 px-3 py-5'} aria-label="Navigation principale">
            {navigation.map(({ to, label, icon: Icon }) => (
                <NavLink
                    key={to}
                    to={to}
                    end={to === '/home'}
                    className={({ isActive }) => mobile
                        ? `flex flex-col items-center gap-1 rounded-md px-1 py-2 text-[11px] font-medium ${isActive ? 'bg-sky-50 text-sky-800' : 'text-slate-500 hover:bg-slate-50'}`
                        : `flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium ${isActive ? 'bg-sky-50 text-sky-800' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}`}
                >
                    <Icon className="size-5" aria-hidden="true" />
                    <span>{label}</span>
                </NavLink>
            ))}
        </nav>
    )
}

function UserSummary({ user }: { user: User }) {
    return (
        <div className="mb-3 flex items-center gap-3 rounded-md bg-slate-50 p-3">
            <span className="grid size-9 shrink-0 place-items-center rounded-full bg-white text-slate-600">
                <UserRound className="size-4" aria-hidden="true" />
            </span>
            <div className="min-w-0">
                <p className="truncate text-sm font-medium text-slate-900">{user.username}</p>
                <p className="truncate text-xs text-slate-500">{user.email}</p>
            </div>
        </div>
    )
}

function LogoutButton({ loading, onClick }: { loading: boolean; onClick: () => void }) {
    return (
        <Button className="justify-start  bg-red-500 text-white shadow-none hover:bg-red-600 hover:text-white" type="button" disabled={loading} onClick={onClick}>
            <LogOut className="size-4" aria-hidden="true" />
            {loading ? 'Déconnexion…' : 'Se déconnecter'}
        </Button>
    )
}
