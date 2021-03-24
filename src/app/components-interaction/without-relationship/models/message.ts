export class Message {
    // type:MessageType;
    type:string;
    message:string;
    time:Date;
}

export enum MessageType{
    IN,
    OUT
}
