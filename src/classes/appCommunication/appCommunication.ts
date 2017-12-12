import { Communication } from '../../interfaces/communication';
import { MServer } from '../../classes/mserver/mserver';
import { Injectable } from '@angular/core';

@Injectable()
export class AppCommunication implements Communication {
    constructor(
        private mserver: MServer
    ){}

    public registerCommunication(): void {}
    
    public saveCommunicationData(data: string): void {}
}