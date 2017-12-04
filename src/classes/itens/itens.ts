import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, EventEmitter } from '@angular/core';
import { Network } from '@ionic-native/network';

import { Cache } from '../../classes/cache/cache';
import { Item } from '../../classes/item/item';

interface DataItens {
    itens: object[],
    qt_itens: string
}

@Injectable()
export class Itens {
    private listItens: Item[];
    private request: EventEmitter<any> = new EventEmitter();

    constructor(
        private http: HttpClient,
        private cache: Cache,
        private network: Network
    ) {
        this.requestItens();
    }

    public on(): any {
        return this.request;
    }

    public getItens(): Item[] {
        return this.listItens;
    }

    private setItens(item: Item[]): void {
        this.listItens = item;
    }

    public requestItens() {
        let itemList = []; let item: Item;
        if (this.network.type != 'none') {
            this.http.get<DataItens>
            ('https://teste2.unasus.gov.br/MServer3/api/appsus/v1/acervo/itens').subscribe(data => {
                this.request.emit();
                for (let i of data.itens) {
                    let title = i['titulo']; let date = i['data_alteracao']; 
                    let id = i['codigo']; let file = i['arquivo'];
                    item = new Item(title, date, id, file);
                    this.cache.cacheRegister(id + '_item', JSON.stringify({
                        title: title,
                        date: date,
                        id: id,
                        file: file
                    }));
                    this.cache.cacheRegister('qtd_items', data.qt_itens);
                    itemList.push(item);
                }
                this.setItens(itemList);
            });
        } else {
            this.request.emit();
            if (this.cache.cacheVerify('qtd_items')) {
                let qtd_items = this.cache.cacheReturn('qtd_items');
                for (let i = 0; i <= qtd_items; i++) {
                    if (i == 0) continue;
                    let item = JSON.parse(this.cache.cacheReturn(i + '_item'));
                    item = new Item(item['title'], item['date'], item['id'], item['file']);
                    itemList.push(item);
                }
                this.setItens(itemList);
            } 
        }
    }
}