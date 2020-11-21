export interface ILoanSearchFilter {
    title: string;
    user: string;
    bookStatuses: Array<IBookStatusSearch>;
}

export interface IBookStatusSearch {
    id: number;
    name: string;
    selected: boolean;
}
