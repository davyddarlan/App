import { Injectable, NgZone, EventEmitter } from '@angular/core';
import { Zip } from '@ionic-native/zip';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { ToastController } from 'ionic-angular';

import { Persistence } from '../../classes/persistence/persistence';
import { Item } from '../../classes/item/item';

@Injectable()
export class Transfer {
    private fileTransfer: FileTransferObject;
    private downloadState: EventEmitter<any> = new EventEmitter();

    constructor(
        private transfer: FileTransfer, 
        private file: File,
        private toastCtrl: ToastController,
        private zip: Zip,
        private persistence: Persistence,
        private zone: NgZone
    ){}

    public on(): any {
        return this.downloadState;
    }

    public download(item: Item): void {
        item.setStatus('BAIXANDO');
        item.setFileTransfer(this.transfer.create());
        item.getFileTransfer().download(item.getFile(), this.file.externalApplicationStorageDirectory + item.getId() + '.zip')
        .then((entry) => {
            this.downloadState.emit();
            this.zip.unzip(this.file.externalApplicationStorageDirectory + item.getId() + '.zip', 
            this.file.externalApplicationStorageDirectory + item.getId())
            .then(result => {
                if (result == 0) {
                    item.setStatus('ABRIR');
                    this.file.removeFile(this.file.externalApplicationStorageDirectory, item.getId() + '.zip');
                    this.file.removeFile(this.file.externalApplicationStorageDirectory + item.getId(), 'se_unasus_pack.js');
                    this.file.copyFile(this.file.applicationDirectory + 'www/assets', 'se_unasus_pack.js', 
                    this.file.externalApplicationStorageDirectory + item.getId(), 'se_unasus_pack.js');
                    this.alertStatusTransfer('Você já pode acessar o recurso educacional.');
                } else {
                    item.setStatus('BAIXAR');
                    this.alertStatusTransfer('Tente novamente, se o problema persistir entre em contato.');
                }
            });
        }).catch((err) => {
            this.downloadState.emit();
            if (err.code != 4) {
                this.alertStatusTransfer('Veja se você está conectado a internet.');
            }
            item.setStatus('BAIXAR');
        });
        this.progressTransfer(item);
    }

    public cancel(item: Item): void {
        item.setStatus('BAIXAR');
        item.getFileTransfer().abort();
    }

    public remove(item: Item): void {
        this.file.removeRecursively(this.file.externalApplicationStorageDirectory, item.getId() + '').then(() => {
            item.setStatus('BAIXAR');
            this.alertStatusTransfer('O recurso foi removido.');
        }).catch(data => {
            this.alertStatusTransfer('O recurso não pôde ser removido! Tente novamente.');
        });
    }

    private progressTransfer(item: Item): void {
        item.setProgress(0);
        item.getFileTransfer().onProgress((progressEvent) => {
            this.zone.run(() => {
                if (progressEvent.lengthComputable) {
                    item.setProgress(Math.floor((progressEvent.loaded / progressEvent.total) * 100));
                }
            });
        });
    }

    private alertStatusTransfer(message: any = null): void {
        this.toastCtrl.create({
            message: message,
            duration: 3500,
            position: 'bottom',
            showCloseButton: true,
            closeButtonText: 'ok'
        }).present();
    }
}