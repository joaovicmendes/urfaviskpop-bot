import { IResponse } from "./i-request";
import { IRequestOptions } from "./i-request-options";

export interface IRequester {
    get(url: string, options?: IRequestOptions): Promise<IResponse>
}
