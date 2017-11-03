import {  FileTransferObject } from '@ionic-native/file-transfer';
import { Persistence } from '../../classes/persistence/persistence';
import { Extra } from '../../classes/extra/extra';

export class Item {
    private title: string = null;
    private date: string = null;
    private fileTrasfer: FileTransferObject = null;
    private id: string = null;
    private file: string = null;

    constructor(title: string, date: string, id: string, file: string) {
        this.title = title;
        this.date = date;
        this.id = id;
        this.file = file;
    }

    getTitle(): string {
        return this.title;
    }

    getDate(): string {
        return this.date;
    }

    setFileTransfer(file: FileTransferObject): void {
        this.fileTrasfer = file;
    }

    getFileTransfer(): FileTransferObject {
        return this.fileTrasfer;
    }

    getFile(): string {
        return this.file;
    }

    getId(): string {
        return this.id;
    }

    setStatus(status: string): void {
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

    getStatus(): string {
        let persistence = new Persistence;
        if (persistence.verifyPersistence(this.getId())) {
            return JSON.parse(persistence.getPersistence(this.getId()))['status'];
        } else {
            return 'BAIXAR';
        }
    }
 }