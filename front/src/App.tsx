import { LoginForm } from './components/login-form'
import { BrandPanel } from './components/brand-panel'
import { UserCreatePage } from './components/user-create-page'
import { DashboardLayout } from './components/dashboard/dashboard-layout'
import { HomeDashboardPage } from './components/dashboard/home-dashboard-page'
import { PointagePage } from './components/dashboard/pointage-page'
import { HistoryPage } from './components/dashboard/history-page'
import { ProfilePage } from './components/dashboard/profile-page'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

function LoginPage() {
    return (
        <main className="min-h-svh bg-sky-50 font-sans text-slate-900 antialiased md:grid md:place-items-center md:p-6">
            <section
                className="grid min-h-svh w-full max-w-6xl overflow-hidden bg-white md:min-h-[calc(100svh-3rem)] md:max-h-[860px] md:grid-cols-[41%_59%] md:rounded-xl md:border md:border-sky-100 md:shadow-xl"
                aria-label="Connexion à DGSYS"
            >
                <BrandPanel prominent />

                <section className="flex items-center justify-center px-6 py-10 sm:px-10 md:px-12 lg:px-20" aria-labelledby="login-title">
                    <LoginForm />
                </section>
            </section>
        </main>
    )
}

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navigate to="/login" replace />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<UserCreatePage />} />
                <Route element={<DashboardLayout />}>
                    <Route path="/home" element={<HomeDashboardPage />} />
                    <Route path="/pointage" element={<PointagePage />} />
                    <Route path="/historique" element={<HistoryPage />} />
                    <Route path="/profil" element={<ProfilePage />} />
                </Route>
                <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App
