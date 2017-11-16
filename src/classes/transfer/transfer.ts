import { Injectable, NgZone } from '@angular/core';
import { Zip } from '@ionic-native/zip';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { ToastController } from 'ionic-angular';

import { Persistence } from '../../classes/persistence/persistence';
import { Extra } from '../../classes/extra/extra';
import { Item } from '../../classes/item/item';

@Injectable()
export class Transfer {
    private fileTransfer: FileTransferObject;

    constructor(
        private transfer: FileTransfer, 
        private file: File,
        private toastCtrl: ToastController,
        private zip: Zip,
        private persistence: Persistence,
        private zone: NgZone
    ){}

    download(item: Item): void {
        item.setStatus('BAIXANDO');
        item.setFileTransfer(this.transfer.create());
        item.getFileTransfer().download(item.getFile(), this.file.externalApplicationStorageDirectory + item.getId() + '.zip')
        .then((entry) => {
            this.zip.unzip(this.file.externalApplicationStorageDirectory + item.getId() + '.zip', 
            this.file.externalApplicationStorageDirectory + item.getId())
            .then(result => {
                if (result == 0) {
                    item.setStatus('ABRIR');
                    this.file.removeFile(this.file.externalApplicationStorageDirectory, item.getId() + '.zip');
                    this.alertStatusTransfer('Você já pode acessar o recurso educacional.');
                } else {
                    item.setStatus('BAIXAR');
                    this.alertStatusTransfer('Tente novamente, se o problema persistir entre em contato.');
                }
            });
        }).catch((err) => {
            if (err.code != 4) {
                this.alertStatusTransfer('Veja se você está conectado a internet.');
            }
            item.setStatus('BAIXAR');
        });
        this.progressTransfer(item);
    }

    cancel(item: Item): void {
        item.getFileTransfer().abort();
        item.setStatus('CANCELADO');
    }

    remove(item: Item): void {
        this.file.removeRecursively(this.file.externalApplicationStorageDirectory, item.getId()).then(() => {
            item.setStatus('BAIXAR');
            this.alertStatusTransfer('O recurso foi removido.');
        }).catch(data => {
            this.alertStatusTransfer(data.message);
        });
    }

    private progressTransfer(item: Item): void {
        item.getFileTransfer().onProgress((progressEvent) => {
            this.zone.run(() => {
                if (progressEvent.lengthComputable) {
                    item.setProgress(Math.floor((progressEvent.loaded / progressEvent.total) * 100));
                }
            });
        });
    }

    private alertStatusTransfer(message: any = null) {
        this.toastCtrl.create({
            message: message,
            duration: 3500,
            position: 'bottom',
            showCloseButton: true,
            closeButtonText: 'ok'
        }).present();
    }
}