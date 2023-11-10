export type User = {
    token?: string;
    id: string
    name: string
    surname: string
    telegramUser: string
    email: string
}

export type Category = {
    id: string
    name: string
}

export type University = {
    id: string
    name: string
}

export type Patch = {
    id: string
    owner: User
    title: string
    university: University
    description?: string
    image: string
    categories: Array<Category>
    isTradeable: boolean
}

type TransactionStatus  =
    | 'pending'
    | 'accepted'
    | 'rejected'
    | 'cancelled'

export type Transaction = {
    id: string
    patchesFrom: Array<Patch>
    patchTo: Patch
    from: User
    to: User
    createDate: Date
    lastUpdateDate: Date
    status: TransactionStatus
}