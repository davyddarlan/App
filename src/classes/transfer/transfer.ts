import { Injectable } from '@angular/core';
import { Zip } from '@ionic-native/zip';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { AlertController } from 'ionic-angular';

import { Persistence } from '../../classes/persistence/persistence';
import { Extra } from '../../classes/extra/extra';
import { Item } from '../../classes/item/item';

@Injectable()
export class Transfer {
    private fileTransfer: FileTransferObject;

    constructor(
        private transfer: FileTransfer, 
        private file: File,
        private alert: AlertController,
        private zip: Zip,
        private persistence: Persistence
    ){}

    download(item: Item): void {
        item.setStatus('BAIXANDO');
        item.setFileTransfer(this.transfer.create());
        item.getFileTransfer().download(item.getFile(), this.file.externalApplicationStorageDirectory + item.getId() + '.zip')
        .then((entry) => {
            this.zip.unzip(this.file.externalApplicationStorageDirectory + item.getId() + '.zip', 
            this.file.externalApplicationStorageDirectory + 'ppu/ ' + item.getId())
            .then(result => {
                if (result == 0) {
                    item.setStatus('ABRIR');
                    this.file.removeFile(this.file.externalApplicationStorageDirectory, item.getId() + '.zip');
                    this.alertStatusTransfer('Tudo certo!', 'Você já pode acessar o recurso educacional.');
                } else {
                    item.setStatus('BAIXAR');
                    this.alertStatusTransfer('Algo errado!', 'Tente novamente, se o problema persistir entre em contato.');
                }
            });
        }).catch((err) => {
            if (err.code != 4) {
                this.alertStatusTransfer('Ops!', 'Veja se você está conectado a internet.');
            }
            item.setStatus('BAIXAR');
        });
    }

    cancel(item: Item): void {
        item.getFileTransfer().abort();
        item.setStatus('CANCELADO');
    }

    private alertStatusTransfer(title: string, message: any = null) {
        this.alert.create({
            title: title,
            message: message
        }).present();
    }
}