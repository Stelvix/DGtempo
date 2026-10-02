import { useState } from 'react'
import { ArrowRight, Eye, EyeOff, LockKeyhole, Mail } from 'lucide-react'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { authApi } from '../services/auth'
import type { LoginRequest } from '../types/user'
import { Button } from './ui/button'

export function LoginForm() {
    const [passwordVisible, setPasswordVisible] = useState(false)
    const [message, setMessage] = useState('')
    const navigate = useNavigate()
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<LoginRequest>()

    const onSubmit: SubmitHandler<LoginRequest> = async (credentials) => {
        setMessage('')
        try {
            await authApi.login(credentials)
            navigate('/home', { replace: true })
        } catch (error) {
            setMessage(error instanceof Error ? error.message : 'Connexion impossible.')
        }
    }

    return (
        <div className="w-full max-w-md">
            <header>
                <h1 id="login-title" className="text-3xl font-semibold text-sky-950">
                    Connexion
                </h1>
                <p className="mt-2 text-sm text-slate-500 sm:text-base">
                    Accédez à votre espace de pointage
                </p>
            </header>

            <form className="mt-9 space-y-5" onSubmit={handleSubmit(onSubmit)} noValidate>
                <div className={`flex min-h-18 items-center gap-4 rounded-lg border px-4 py-3 transition focus-within:ring-2 focus-within:ring-sky-100 ${errors.email ? 'border-red-500' : 'border-slate-200 focus-within:border-sky-500'}`}>
                    <Mail className="size-6 shrink-0 text-sky-900" aria-hidden="true" />
                    <div className="min-w-0 flex-1">
                        <label className="block text-sm text-slate-500" htmlFor="email">
                            Adresse e-mail
                        </label>
                        <input
                            autoComplete="username"
                            className="mt-1 w-full border-0 bg-transparent p-0 text-sm text-slate-900 outline-none placeholder:text-slate-400"
                            id="email"
                            placeholder="exemple@dgsys.fr"
                            type="email"
                            aria-describedby={errors.email ? 'email-error' : undefined}
                            aria-invalid={Boolean(errors.email)}
                            {...register('email', {
                                required: 'L’adresse e-mail est obligatoire.',
                                pattern: {
                                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                    message: 'Saisissez une adresse e-mail valide.',
                                },
                            })}
                        />
                    </div>
                </div>
                {errors.email && (
                    <p className="-mt-3 text-sm text-red-600" id="email-error" role="alert">
                        {errors.email.message}
                    </p>
                )}

                <div className={`flex min-h-18 items-center gap-4 rounded-lg border px-4 py-3 transition focus-within:ring-2 focus-within:ring-sky-100 ${errors.password ? 'border-red-500' : 'border-slate-200 focus-within:border-sky-500'}`}>
                    <LockKeyhole className="size-6 shrink-0 text-sky-900" aria-hidden="true" />
                    <div className="min-w-0 flex-1">
                        <label className="block text-sm text-slate-500" htmlFor="password">
                            Mot de passe
                        </label>
                        <input
                            autoComplete="current-password"
                            className="mt-1 w-full border-0 bg-transparent p-0 text-sm text-slate-900 outline-none placeholder:text-slate-400"
                            id="password"
                            placeholder="••••••••"
                            type={passwordVisible ? 'text' : 'password'}
                            aria-describedby={errors.password ? 'password-error' : undefined}
                            aria-invalid={Boolean(errors.password)}
                            {...register('password', {
                                required: 'Le mot de passe est obligatoire.',
                            })}
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
                {errors.password && (
                    <p className="-mt-3 text-sm text-red-600" id="password-error" role="alert">
                        {errors.password.message}
                    </p>
                )}

                <Button className="mt-2 bg-sky-600 text-white hover:bg-sky-700" type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Connexion…' : 'Se connecter'}
                    <ArrowRight className="size-5" aria-hidden="true" />
                </Button>

                {message && <p className="text-sm text-amber-700" role="status">{message}</p>}
            </form>

            <p className="mt-7 text-sm leading-relaxed text-slate-500">
                Vous n’avez pas de compte ?{' '}
                <Link className="font-medium text-sky-700 hover:text-sky-900" to="/signup">
                    Créer un compte
                </Link>
            </p>
        </div>
    )
}