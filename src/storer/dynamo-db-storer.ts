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
    
    public async store(song: string): Promise<void> {
        const params = {
            TableName: this.TABLE_NAME,
            Item: { "song": song }
        };
        this.dynamoClient.put(params)
        .promise()
        .then(data => {
            console.info(`Succesfully put data on DynamoDb, ${data}`);
            return data;
        })
        .catch(error => {
            console.error(`Failed to put data on DynamoDb at ${params}`);
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
            console.info(`Succesfully retrieved data from DynamoDb, ${data}`);
            if (data.Item) {
                return data.Item.song;
            }
        })
        .catch(error => {
            console.error(`Failed to request data from DynamoDb at ${params}`);
            Promise.reject(error);
        });
    }
    
}
