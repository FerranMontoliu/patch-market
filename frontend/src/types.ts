export type Patch = {
    id: string;
    owner: User;
    title: string;
    university: University;
    description?: string;
    image: string;
    categories: Array<Category>;
    isTradeable: boolean;
}

export type User = {
    id: string;
    name: string;
    surname: string;
    telegramUser: string;
    email: string;
}

export type Category = {
    id: string;
    name: string;
}

export type University = {
    id: string;
    name: string;
}