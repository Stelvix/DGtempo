import { useState } from 'react'
import { ArrowLeft, ArrowRight, Eye, EyeOff, LockKeyhole, Mail, UserRound } from 'lucide-react'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { usersApi } from '../services/users'
import type { CreateUserRequest } from '../types/user'
import { BrandPanel } from './brand-panel'
import { Button } from './ui/button'

export function UserCreatePage() {
    const [passwordVisible, setPasswordVisible] = useState(false)
    const [message, setMessage] = useState('')
    const [created, setCreated] = useState(false)
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<CreateUserRequest>()

    const onSubmit: SubmitHandler<CreateUserRequest> = async (values) => {
        setMessage('')
        setCreated(false)

        try {
            await usersApi.create(values)
            setMessage('Compte créé. Vous pouvez maintenant vous connecter.')
            setCreated(true)
            reset()
        } catch (error) {
            setMessage(error instanceof Error ? error.message : 'Impossible de joindre le serveur.')
        }
    }

    return (
        <main className="min-h-svh bg-sky-50 font-sans text-slate-900 antialiased md:grid md:place-items-center md:p-6">
            <section className="grid min-h-svh w-full max-w-6xl overflow-hidden bg-white md:min-h-[calc(100svh-3rem)] md:max-h-[860px] md:grid-cols-[41%_59%] md:rounded-xl md:border md:border-sky-100 md:shadow-xl">
                <BrandPanel prominent />
                <section className="flex items-center justify-center px-6 py-10 sm:px-10 md:px-12 lg:px-20" aria-labelledby="create-user-title">
                    <div className="w-full max-w-md">
                        <Link className="mb-7 inline-flex items-center gap-2 text-sm text-slate-500 transition hover:text-sky-800" to="/login">
                            <ArrowLeft className="size-4" aria-hidden="true" />
                            Retour à la connexion
                        </Link>
                        <header>
                            <h1 id="create-user-title" className="text-3xl font-semibold text-sky-950">
                                Nouvel utilisateur
                            </h1>
                            <p className="mt-2 text-sm text-slate-500 sm:text-base">
                                Renseignez les informations du compte.
                            </p>
                        </header>

                        <form className="mt-7 space-y-4" onSubmit={handleSubmit(onSubmit)} noValidate>
                            <div>
                                <div className={`flex min-h-16 items-center gap-4 rounded-lg border px-4 py-3 transition focus-within:ring-2 focus-within:ring-sky-100 ${errors.username ? 'border-red-500' : 'border-slate-200 focus-within:border-sky-500'}`}>
                                    <UserRound className="size-5 shrink-0 text-sky-900" aria-hidden="true" />
                                    <div className="min-w-0 flex-1">
                                        <label className="block text-sm text-slate-500" htmlFor="username">Nom d’utilisateur</label>
                                        <input
                                            {...register('username', { required: 'Le nom d’utilisateur est obligatoire.' })}
                                            autoComplete="username"
                                            className="mt-1 w-full bg-transparent p-0 text-sm outline-none placeholder:text-slate-400"
                                            id="username"
                                            placeholder="ex. jdupont"
                                        />
                                    </div>
                                </div>
                                {errors.username && <p className="mt-1 text-sm text-red-600" role="alert">{errors.username.message}</p>}
                            </div>

                            <div>
                                <div className={`flex min-h-16 items-center gap-4 rounded-lg border px-4 py-3 transition focus-within:ring-2 focus-within:ring-sky-100 ${errors.email ? 'border-red-500' : 'border-slate-200 focus-within:border-sky-500'}`}>
                                    <Mail className="size-5 shrink-0 text-sky-900" aria-hidden="true" />
                                    <div className="min-w-0 flex-1">
                                        <label className="block text-sm text-slate-500" htmlFor="email">Adresse e-mail</label>
                                        <input
                                            {...register('email', {
                                                required: 'L’adresse e-mail est obligatoire.',
                                                pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Saisissez une adresse e-mail valide.' },
                                            })}
                                            autoComplete="email"
                                            className="mt-1 w-full bg-transparent p-0 text-sm outline-none placeholder:text-slate-400"
                                            id="email"
                                            placeholder="exemple@dgsys.fr"
                                            type="email"
                                        />
                                    </div>
                                </div>
                                {errors.email && <p className="mt-1 text-sm text-red-600" role="alert">{errors.email.message}</p>}
                            </div>

                            <div>
                                <div className={`flex min-h-16 items-center gap-4 rounded-lg border px-4 py-3 transition focus-within:ring-2 focus-within:ring-sky-100 ${errors.password ? 'border-red-500' : 'border-slate-200 focus-within:border-sky-500'}`}>
                                    <LockKeyhole className="size-5 shrink-0 text-sky-900" aria-hidden="true" />
                                    <div className="min-w-0 flex-1">
                                        <label className="block text-sm text-slate-500" htmlFor="password">Mot de passe</label>
                                        <input
                                            {...register('password', {
                                                required: 'Le mot de passe est obligatoire.',
                                                minLength: { value: 8, message: 'Le mot de passe doit contenir au moins 8 caractères.' },
                                            })}
                                            autoComplete="new-password"
                                            className="mt-1 w-full bg-transparent p-0 text-sm outline-none placeholder:text-slate-400"
                                            id="password"
                                            placeholder="8 caractères minimum"
                                            type={passwordVisible ? 'text' : 'password'}
                                        />
                                    </div>
                                    <button
                                        className="grid size-9 shrink-0 place-items-center rounded-md text-slate-500 transition hover:bg-sky-50 hover:text-sky-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600"
                                        type="button"
                                        onClick={() => setPasswordVisible((visible) => !visible)}
                                        aria-label={passwordVisible ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
                                        aria-pressed={passwordVisible}
                                    >
                                        {passwordVisible ? <EyeOff className="size-5" aria-hidden="true" /> : <Eye className="size-5" aria-hidden="true" />}
                                    </button>
                                </div>
                                {errors.password && <p className="mt-1 text-sm text-red-600" role="alert">{errors.password.message}</p>}
                            </div>

                            <Button className="mt-2 bg-sky-600 text-white hover:bg-sky-700" type="submit" disabled={isSubmitting}>
                                Créer l’utilisateur
                                <ArrowRight className="size-5" aria-hidden="true" />
                            </Button>
                            {message && (
                                <p className={`text-sm ${created ? 'text-emerald-700' : 'text-red-600'}`} role="status">
                                    {message}
                                    {created && <Link className="ml-1 font-medium underline" to="/login">Se connecter</Link>}
                                </p>
                            )}
                        </form>
                    </div>
                </section>
            </section>
        </main>
    )
}
