import { LoginForm } from '@/components/login-form'

function App() {
    return (
        <main className="min-h-svh bg-sky-50 font-sans text-slate-900 antialiased md:grid md:place-items-center md:p-6">
            <section
                className="grid min-h-svh w-full max-w-6xl overflow-hidden bg-white md:min-h-[calc(100svh-3rem)] md:max-h-[860px] md:grid-cols-[41%_59%] md:rounded-xl md:border md:border-sky-100 md:shadow-xl"
                aria-label="Connexion à DGSYS"
            >
                <aside className="relative min-h-[190px] overflow-hidden bg-sky-200 md:min-h-[640px]">
                    <img
                        className="absolute inset-0 h-full w-full object-cover object-center"
                        src="/images/dg-office.jpg"
                        alt="Façade vitrée d'un immeuble de bureaux"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-sky-200/90 via-sky-200/50 to-sky-950/10" />
                    <div className="relative p-7 md:p-10 lg:p-14">
                        <div className="flex items-center gap-3 text-sky-900">
                            <span className="grid size-12 place-items-center rounded-r-full rounded-l-sm bg-sky-900 text-3xl font-bold text-white">
                                D
                            </span>
                            <span className="text-2xl font-bold">DGSYS</span>
                        </div>
                        <p className="mt-6 text-lg leading-relaxed text-sky-950 md:text-xl">
                            Votre temps,
                            <br />
                            notre performance
                        </p>
                    </div>
                </aside>

                <section className="flex items-center justify-center px-6 py-10 sm:px-10 md:px-12 lg:px-20" aria-labelledby="login-title">
                    <LoginForm />
                </section>
            </section>
        </main>
    )
}

export default App
