import { Injectable, EventEmitter } from '@angular/core';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { Device } from '@ionic-native/device';
import { Persistence } from '../../classes/persistence/persistence';

import { MServer } from '../../classes/mserver/mserver';
import * as crypto from '../../classes/asmcrypto/asmcrypto';

@Injectable()
export class Login {
    public isLogin: EventEmitter<boolean> = new EventEmitter();

    constructor(
        private mserver: MServer,
        private device: Device,
        private browser: InAppBrowser,
        private persistence: Persistence
    ) {}

    public login() {
        var config = 'clearcache=yes,clearsessioncache=yes,hardwareback=no,location=no,toolbar=yes,toolbarposition=top'; 
        var browser = this.browser.create(this.mserver.register(this.device.uuid), '_blank', config);
        browser.on('loadstop').subscribe(() => {
            browser.executeScript({
                code: this.getScript()
            }).then((data) => {
                var response = data[0];
                if (response['UNASUS_STATUS_COD'] !== undefined) {
                    if (response['UNASUS_STATUS_COD'] >= 0) {
                        this.executeStatus(response['UNASUS_STATUS_COD'], response['UNASUS_DADOS']);
                    } else {
                        this.executeStatus(response['UNASUS_STATUS_COD']);
                    }
                    browser.close();
                }
            }); 
        });
    }

    public isLoged(): boolean {
        return this.persistence.verifyPersistence('session');
    }

    private getScript(): string {
        return `
            (function() {
                var metas = document.getElementsByTagName("meta"), response = {};
                for (var i = 0; i < metas.length; i++){
                    var name = metas[i].getAttribute("name");
                    if (name){
                        response[name] = metas[i].getAttribute("content");
                    }
                }
                return response;
            })();
        `;
    }

    private executeStatus(status: number, cod: string = undefined) {
        if (status < 0) {
            this.isLogin.emit(false);
        } else {
            this.mserver.decryptResponse(cod);
            this.isLogin.emit(true);
        }
    }
}