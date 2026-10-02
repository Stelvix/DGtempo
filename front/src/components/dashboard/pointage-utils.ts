import type { Pointage } from '../../services/pointages'

export function calculateWorkedMinutes(pointage: Pointage | null, includeOngoing = true) {
    if (!pointage?.arrivee) return 0

    const now = Date.now()
    const start = new Date(pointage.arrivee).getTime()
    const end = pointage.depart ? new Date(pointage.depart).getTime() : includeOngoing ? now : start
    let minutes = (end - start) / 60_000

    if (pointage.pause) {
        const pauseEnd = pointage.reprise
            ? new Date(pointage.reprise).getTime()
            : pointage.depart
                ? new Date(pointage.depart).getTime()
                : includeOngoing ? now : start
        minutes -= (pauseEnd - new Date(pointage.pause).getTime()) / 60_000
    }

    return Math.max(0, Math.floor(minutes))
}

export function formatDuration(minutes: number) {
    const hours = Math.floor(minutes / 60)
    const remainingMinutes = minutes % 60
    return `${hours} h ${String(remainingMinutes).padStart(2, '0')}`
}

export function formatPointageTime(value: string | null) {
    if (!value) return '—'
    return new Date(value).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
}

export function formatShortDate(value: string) {
    const date = new Date(`${value}T00:00:00`)
    const weekday = date.toLocaleDateString('fr-FR', { weekday: 'short' }).replace('.', '')
    const dayMonth = date.toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit' })
    return `${weekday[0].toLocaleUpperCase('fr-FR')}${weekday.slice(1)} ${dayMonth}`
}

export function formatTimeRange(start: string | null, end: string | null) {
    if (!start) return '—'
    return `${formatPointageTime(start)} – ${end ? formatPointageTime(end) : '…'}`
}

export function getNextAction(pointage: Pointage | null) {
    if (!pointage?.arrivee) return { action: 'arrivee' as const, title: 'Prise de poste', button: 'Pointer mon arrivée' }
    if (!pointage.pause) return { action: 'pause' as const, title: 'Pause déjeuner', button: 'Marquer la pause' }
    if (!pointage.reprise) return { action: 'reprise' as const, title: 'Reprise du travail', button: 'Marquer ma reprise' }
    if (!pointage.depart) return { action: 'depart' as const, title: 'Fin de journée', button: 'Pointer mon départ' }
    return null
}
