export interface IStorer {
    store(data: string): Promise<void>;
    query(data: string): Promise<string>;
}
