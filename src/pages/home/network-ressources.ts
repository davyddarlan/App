import { HttpClient } from '@angular/common/http';

import { RessourcesInterface } from './ressources-interface';

interface DataRessorces {
    itens: object[]
}

export class NetworkRessources implements RessourcesInterface {
    private listRessources: object[] = [];
    private urlRessources: string = 'https://teste2.unasus.gov.br/MServer3/api/appsus/v1/acervo/itens';

    constructor(private http: HttpClient) {
        this.http.get<DataRessorces>(this.urlRessources).subscribe(data => {
            for (let iten of data.itens) {
                this.setRessources(iten);
            }
        });
    }

    setRessources(ressources: object): void {
        this.listRessources.push(ressources);
    }

    getRessources(): object[] {
        return this.listRessources;
    }
}