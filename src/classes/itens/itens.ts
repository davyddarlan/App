import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Cache } from '../../classes/cache/cache';
import { Extra } from '../../classes/extra/extra';
import { Transfer } from '../../classes/transfer/transfer';
import { Item } from '../../classes/item/item';
import * as Config from '../../classes/config/config';

interface DataItens {
    itens: object[]
}

@Injectable()
export class Itens {
    private listItens: Item[];

    constructor(
        private http: HttpClient,
        private cache: Cache,
        private extra: Extra,
        private transfer: Transfer
    ) {
        this.requestItens();
    }

    getItens(): Item[] {
        return this.listItens;
    }

    download(index: number): void {
        this.transfer.download(this.getItem(index));
    }

    cancel(index: number): void {
        this.transfer.cancel(this.getItem(index));
    }

    getItem(index: number): Item {
        return this.listItens[index]
    }

    private setItens(item: Item[]): void {
        this.listItens = item;
    }

    private requestItens() {
        let itemList = [];
        //cenário com conexão
        this.http.get<DataItens>(Config.URL_RESSOURCES).subscribe(data => {
            for (let i of data.itens) {
                let title = i['titulo'];
                let date = i['data_alteracao'];
                let id = this.extra.directoryName(i['arquivo']);
                let file = i['arquivo'];
                let item = new Item(title, date, id, file);
                itemList.push(item);
            }
            this.setItens(itemList);
            this.cache.cacheRegister(Config.DATABASE_RESSOURCES_CACHE_NAME, 
            this.extra.dataToString(this.getItens()));
        });
    }
}