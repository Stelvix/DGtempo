import dgsysLogo from '../assets/dgsys-logo.svg'

export function BrandPanel({ prominent = false }: { prominent?: boolean }) {
    return (
        <aside className="relative min-h-[190px] overflow-hidden bg-sky-200 md:min-h-[640px]">
            <img
                className="absolute inset-0 h-full w-full object-cover object-center"
                src="/images/dg-office.jpg"
                alt="Façade vitrée d'un immeuble de bureaux"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-sky-200/95 via-sky-200/75 to-sky-200/55 md:from-sky-200/90 md:via-sky-200/50 md:to-sky-950/10" />
            <div className="relative p-7 md:p-10 lg:p-14">
                <img
                    className={prominent ? 'h-20 w-56 object-contain object-left sm:h-24 sm:w-64' : 'h-16 w-44 object-contain object-left'}
                    src={dgsysLogo}
                    alt="DGsys"
                />
                <p className="mt-6 text-lg leading-relaxed text-sky-950 md:text-xl">
                    Votre temps,
                    <br />
                    notre performance
                </p>
            </div>
        </aside>
    )
}
