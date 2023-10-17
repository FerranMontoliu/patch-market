export type Patch = {
    id: string;
    owner: User;
    title: string;
    description: string;
    image: string;
    categories: Array<string>;
    isTradeable: boolean;
}

export type User = {
    id: string;
    name: string;
    surname: string;
    telegramUser: string;
    mail: string;
}