import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Cache } from '../../classes/cache/cache';

interface DataRessorces {
    itens: object[]
}

@Injectable()
export class Ressources {
    private listRessources: object[];
    private urlRessources: string = 'http://192.168.15.8:8080/itens.json';

    constructor(private http: HttpClient, private cache: Cache) {
        if (this.cache.cacheVerify('items')) {
            this.requestHttp();
            this.listRessources = this.dataToObject(this.cache.cacheReturn('items'));
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

    private dataToString(data: any[]): string {
        return JSON.stringify(data);
    }

    private dataToObject(data: string): object[] {
        return JSON.parse(data);
    }

    requestHttp(refresher: any = null): void {
        this.http.get<DataRessorces>(this.urlRessources, {
            headers: new HttpHeaders().set('Cache-Control', 'no-cache, no-store, must-revalidate')
        }).subscribe(data => {
            this.cache.cacheRegister('items', this.dataToString(data.itens));
            this.setRessources(this.dataToObject(this.cache.cacheReturn('items')));

            if (refresher != null) {
                refresher.complete();
            }
        });
    }
}