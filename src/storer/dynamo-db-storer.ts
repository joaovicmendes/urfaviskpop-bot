import AWS from "aws-sdk";
import { IStorer } from ".";
import { IStorerConfig } from "./interface/i-storer-config";

export class DynamoDbStorer implements IStorer {

    private TABLE_NAME = "urfaviskpop";
    private dynamoClient: AWS.DynamoDB.DocumentClient;

    constructor(config: IStorerConfig) {
        AWS.config.update(config);
        this.dynamoClient = new AWS.DynamoDB.DocumentClient();
    }
    
    public async store(song: string): Promise<any> {
        const params = {
            TableName: this.TABLE_NAME,
            Item: { "song": song }
        };
        return this.dynamoClient.put(params)
        .promise()
        .then(data => {
            console.info(`[DynamoDb][store] Succesfully put data on DynamoDb, '${song}'`);
            return data;
        })
        .catch(error => {
            console.error(`[DynamoDb][store] Failed to put data on DynamoDb at ${JSON.stringify(params)}`);
            Promise.reject(error);
        });
    }

    public async query(song: string): Promise<string> {
        const params = {
            TableName: this.TABLE_NAME,
            Key: { "song": song }
        };
        return this.dynamoClient.get(params)
        .promise()
        .then(data => {
            console.info(`[DynamoDb][query] Succesfully retrieved data from DynamoDb, ${JSON.stringify(data.Item)}`);
            if (data.Item) {
                return data.Item.song;
            }
        })
        .catch(error => {
            console.error(`[DynamoDb][query] Failed to request data from DynamoDb at ${JSON.stringify(params)}`);
            Promise.reject(error);
        });
    }

    public async storeLastPage(page: number): Promise<any> {
        const params = {
            TableName: this.TABLE_NAME,
            Item: { "song": "last-queried-page", "page": page }
        };
        return this.dynamoClient.put(params)
        .promise()
        .then(data => {
            console.info(`[DynamoDb][store] Succesfully saved page on DynamoDb, '${page}'`);
            return data;
        })
        .catch(error => {
            console.error(`[DynamoDb][store] Failed to put data on DynamoDb at ${JSON.stringify(params)}`);
            Promise.reject(error);
        });
    }

    public async queryLastPage(): Promise<number> {
        const params = {
            TableName: this.TABLE_NAME,
            Key: { "song": "last-queried-page" }
        };
        return this.dynamoClient.get(params)
        .promise()
        .then(data => {
            console.info(`[DynamoDb][query] Succesfully retrieved page from DynamoDb, ${JSON.stringify(data.Item)}`);
            if (data.Item) {
                return data.Item.page;
            }
        })
        .catch(error => {
            console.error(`[DynamoDb][query] Failed to retrieved last page from DynamoDb at ${JSON.stringify(params)}`);
            Promise.reject(error);
        });
    }
    
}
