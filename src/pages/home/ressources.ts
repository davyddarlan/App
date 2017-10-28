import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Cache } from '../../classes/cache/cache';

interface DataRessorces {
    itens: object[]
}

@Injectable()
export class Ressources {
    private listRessources: object[];
    private urlRessources: string = 'https://teste2.unasus.gov.br/MServer3/api/appsus/v1/acervo/itens';

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

    private requestHttp(): void {
        this.http.get<DataRessorces>(this.urlRessources).subscribe(data => {
            this.cache.cacheRegister('items', this.dataToString(data.itens));
            this.setRessources(this.dataToObject(this.cache.cacheReturn('items')));
        });
    }
}