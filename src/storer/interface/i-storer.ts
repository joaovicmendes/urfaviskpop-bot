export interface IStorer {
    store(data: string): Promise<any>;
    query(data: string): Promise<string>;
}
