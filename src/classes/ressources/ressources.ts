import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Cache } from '../../classes/cache/cache';
import { Transfer } from '../../classes/transfer/transfer';
import { Extra } from '../../classes/extra/extra';

interface DataRessorces {
    itens: object[]
}

@Injectable()
export class Ressources {
    private listRessources: object[];
    private urlRessources: string = 'https://teste2.unasus.gov.br/MServer3/api/appsus/v1/acervo/itens';

    constructor(
        private http: HttpClient, 
        private cache: Cache,
        private transfer: Transfer,
        private extra: Extra
    ){
        if (this.cache.cacheVerify('items')) {
            this.requestHttp();
            this.listRessources = this.extra.dataToObject(this.cache.cacheReturn('items'));
        } else {
            this.requestHttp();
        }  
    }

    setRessources(ressources: object[]): void {
        this.listRessources = ressources;
    }

    getRessources(): object[] {
        return this.listRessources;
    }

    downloadRessource(url: string) {
        this.transfer.setTransfer(url);
    }

    requestHttp(refresher: any = null): void {
        this.http.get<DataRessorces>(this.urlRessources, {
            //headers: new HttpHeaders().set('Cache-Control', 'no-cache, no-store, must-revalidate')
        }).subscribe(data => {
            this.cache.cacheRegister('items', this.extra.dataToString(data.itens));
            this.setRessources(this.extra.dataToObject(this.cache.cacheReturn('items')));

            if (refresher != null) {
                refresher.complete();
            }
        });
    }
}