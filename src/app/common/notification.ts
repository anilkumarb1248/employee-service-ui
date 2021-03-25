
export class Notification {

    constructor(
        public message: string,
        public type: NotifyType,
        public confirmDialog?: boolean,
        public customCallBack?: () => any
    ) { }

}

export enum NotifyType {
    SUCCESS= 'Success',
    INFO = 'Info',
    ERROR = 'Error',
    WARNING = 'Warning'
}
