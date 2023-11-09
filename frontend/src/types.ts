export type Transaction = {
    id: string;
    patchesFrom: Patch[]; // An array of ObjectIds from the frontend
    patchTo: Patch; // ObjectId from the frontend
    from: User; // ObjectId from the frontend
    to: User; // ObjectId from the frontend
    createDate: Date;
    lastUpdateDate: Date;
    status: TransactionStatus;
  }
  
  export enum TransactionStatus {
    Pending = 'Pending',
    Accepted = 'Accepted',
    Rejected = 'Rejected',
    Cancelled = 'Cancelled',
  }  

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