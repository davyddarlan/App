import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Network } from '@ionic-native/network';

import { Cache } from '../../classes/cache/cache';
import { Item } from '../../classes/item/item';
import * as Config from '../../classes/config/config';

interface DataItens {
    itens: object[],
    qt_itens: string
}

@Injectable()
export class Itens {
    private listItens: Item[];

    constructor(
        private http: HttpClient,
        private cache: Cache,
        private network: Network
    ) {
        this.requestItens();
    }

    getItens(): Item[] {
        return this.listItens;
    }

    private setItens(item: Item[]): void {
        this.listItens = item;
    }

    private requestItens() {
        let itemList = []; let item: Item;
        //cenário com conexão à internet
        if (this.network.type != 'none') {
            this.http.get<DataItens>(Config.URL_RESSOURCES).subscribe(data => {
                for (let i of data.itens) {
                    let title = i['titulo']; let date = i['data_alteracao']; 
                    let id = i['codigo']; let file = i['arquivo'];
                    item = new Item(title, date, id, file);
                    /*
                        Cada iteração é enviada para o objeto item e apenas
                        as partes essencias serão persistidas. 
                    */
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
            //cenário offline
            alert('offline');
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