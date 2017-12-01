import { FileTransferObject } from '@ionic-native/file-transfer';
import { Persistence } from '../../classes/persistence/persistence';

export class Item {
    private title: string = null;
    private date: string = null;
    private fileTrasfer: FileTransferObject = null;
    private id: string = null;
    private file: string = null;
    private progress: number = 0;

    constructor(title: string, date: string, id: string, file: string) {
        this.title = title;
        this.date = date;
        this.id = id;
        this.file = file;
    }

    public getTitle(): string {
        return this.title;
    }

    public getDate(): string {
        return this.date;
    }

    public setFileTransfer(file: FileTransferObject): void {
        this.fileTrasfer = file;
    }

    public getFileTransfer(): FileTransferObject {
        return this.fileTrasfer;
    }

    public getFile(): string {
        return this.file;
    }

    public getId(): string {
        return this.id;
    }

    public setProgress(time: number) {
        this.progress = time;
    }

    public getProgress(): number {
        return this.progress;
    }

    public setStatus(status: string): void {
        let persistence = new Persistence;
        if(persistence.verifyPersistence(status)) {
            let obj = JSON.parse(persistence.getPersistence(this.getId()));
            obj['status'] = 'BAIXAR';
            persistence.setPersistence(this.getId(), JSON.stringify(obj));
        } else {
            let obj = { status: status };
            persistence.setPersistence(this.getId(), JSON.stringify(obj));
        }
    }

    public getStatus(): string {
        let persistence = new Persistence;
        if (persistence.verifyPersistence(this.getId())) {
            return JSON.parse(persistence.getPersistence(this.getId()))['status'];
        } else {
            return 'BAIXAR';
        }
    }
 }