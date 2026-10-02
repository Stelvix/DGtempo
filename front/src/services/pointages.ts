import { apiGet, apiPostEmpty } from '../lib/api'

export type PointageAction = 'arrivee' | 'pause' | 'reprise' | 'depart'

export type Pointage = {
    date: string
    arrivee: string | null
    pause: string | null
    reprise: string | null
    depart: string | null
}

export const pointagesApi = {
    today: () => apiGet<Pointage>('/api/pointages/du-jour'),
    history: () => apiGet<Pointage[]>('/api/pointages/historique'),
    record: (action: PointageAction) => apiPostEmpty<void>(`/api/pointages/${action}`),
}