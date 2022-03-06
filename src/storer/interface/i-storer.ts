export interface IStorer {
    store(data: string): Promise<any>;
    storeLastPage(page: number): Promise<any>;
    query(data: string): Promise<string>;
    queryLastPage(): Promise<number>;
}
