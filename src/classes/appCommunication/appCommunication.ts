import { MServer, URLS } from '../../classes/mserver/mserver';
import { Injectable } from '@angular/core';

@Injectable()
export class AppCommunication {
    constructor(
        private mserver: MServer
    ){}

    public setState(log: object[]) {
        let obj = { listalog: log };
        this.mserver.setActionAPI(URLS.SEND_LOGS, obj);
    }
}