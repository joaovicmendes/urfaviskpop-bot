import axios from "axios";
import { IRequester, IRequestOptions, IResponse } from ".";

export class AxiosRequester implements IRequester {

    public async get(url: string, options?: IRequestOptions): Promise<IResponse> {
        return await axios.get(url, options);
    }

}
