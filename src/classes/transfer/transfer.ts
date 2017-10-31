import { Injectable } from '@angular/core';
import { Zip } from '@ionic-native/zip';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { AlertController } from 'ionic-angular';

import { Persistence } from '../../classes/persistence/persistence';
import { Extra } from '../../classes/extra/extra';

@Injectable()
export class Transfer {
    private fileTransfer: FileTransferObject;

    constructor(
        private transfer: FileTransfer, 
        private file: File,
        private alert: AlertController,
        private zip: Zip,
        private persistence: Persistence,
        private extra: Extra
    ){
        this.fileTransfer = this.transfer.create(); 
    }

    setTransfer(url: string): void {
        this.fileTransfer.download(url, this.file.dataDirectory + this.extra.directoryName(url) + '.zip')
        .then((entry) => {
            this.zip.unzip(this.file.dataDirectory + this.extra.directoryName(url) + '.zip', 
            this.file.dataDirectory + this.extra.directoryName(url))
            .then(result => {
                this.alertStatusTransfer('Recursos baixado', 'O recurso foi baixado e já pode ser acessado.');
            });
        }).catch((err) => {
            this.alertStatusTransfer('Erro!', 'Verifique se você está conectado a alguma rede.');
        });
    }

    private alertStatusTransfer(title: string, message: any = null) {
        this.alert.create({
            title: title,
            message: message
        }).present();
    }
}