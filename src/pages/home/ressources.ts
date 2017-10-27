import { HttpClient } from '@angular/common/http';

import { NetworkRessources } from './network-ressources'; 

export class Ressources {
    private listRessources: object[];
    private networkRessources: NetworkRessources;

    constructor(private http: HttpClient) {
        this.networkRessources = new NetworkRessources(this.http);
        this.listRessources = this.networkRessources.getRessources();
    }

    getRessources(): object[] {
        return this.listRessources;
    }
}