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
        if (this.cache.verifyPersistence('items')) {
            this.listRessources = this.dataToObject(this.cache.getPersistence('items'));
        } else {
            this.http.get<DataRessorces>(this.urlRessources).subscribe(data => {
                this.setRessources(data.itens);
                this.cache.setPersistence('items', this.dataToString(data.itens));
            });
        }
    }

    setRessources(ressources: object[]): void {
        this.listRessources = ressources;
    }

    getRessources(): object[] {
        return this.listRessources;
    }

    private dataToString(data: any[]): string{
        return JSON.stringify(data);
    }

    private dataToObject(data: string): object[] {
        return JSON.parse(data);
    }
}