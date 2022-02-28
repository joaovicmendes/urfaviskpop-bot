export interface IPublisher {
    publish(msg: string): Promise<void>
}
