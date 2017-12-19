import { Injectable, EventEmitter } from '@angular/core';
import { Persistence } from '../../classes/persistence/persistence';
import * as sha512 from '../../classes/sha512/sha512';
import * as crypto from '../../classes/asmcrypto/asmcrypto';
import { HttpClient, HttpHeaders } from '@angular/common/http';

export const URLS = {
    TIME_SERVER: 'info/TESTE3JSON/0.0.1',
    PROFILE_USER: 'v1/usuario/perfil',
    DEVICE_REGISTER: 'v1/usuario/dispositivos',
    SEND_LOGS: 'v1/usuario/logs',
    ITENS_RESSOURCE: 'v1/acervo/itens'
};

@Injectable()
export class MServer {
    private host: string = 'https://teste2.unasus.gov.br/';
    private instance: string = 'MServer3/';
    private name: string = 'appsus/';
    private key: string = '67e10d8622f694a453ce3420d7ae6674';
    private actionApi: EventEmitter<any> = new EventEmitter();

    constructor(
        private persistence: Persistence,
        private http: HttpClient
    ) {}

    public register(key: string): string {
        return this.host + this.instance + 'mobile/' + this.name + this.generetaHash(key);
    }

    private generetaHash(key: string): string {
        return sha512.sha512(key).toString('hex');
    }

    public decryptResponse(hash: string): void {
        var response = hash.split('.'), iv = response[0], enc_string = response[1];
        var bytes = crypto.asmcrypto.AES_CBC.decrypt(atob(enc_string), this.key, 0, atob(iv));
        var string = crypto.asmcrypto.bytes_to_string(bytes);
        var obj = JSON.parse(string.replace(/\}[^\w\d]+$/g, '}'));
        var signature = crypto.asmcrypto.HMAC_SHA256.hex(obj['UNASUS_ACESSO_UID'] + 
        this.key, obj['UNASUS_SESSION']);
        var returnData = {
            UNASUS_USER_ID: obj['UNASUS_USER_ID'],
            UNASUS_DEVICE_ID: obj['UNASUS_DEVICE_ID'],
            UNASUS_SIGNATURE: signature,
            UNASUS_ACESSO_NOME: obj['UNASUS_ACESSO_NOME']
        };
        alert(JSON.stringify(returnData));
        this.persistence.setPersistence('session', JSON.stringify(returnData));
    }

    public on(): any {
        return this.actionApi;
    }

    public setActionAPI(location: string, data: object = {}): void {
        let sesssion = JSON.parse(this.persistence.getPersistence('session'));
        let body = { 
            UNASUS_USER_ID: sesssion['UNASUS_USER_ID'], 
            UNASUS_DEVICE_ID: sesssion['UNASUS_DEVICE_ID'], 
            UNASUS_SIGNATURE: sesssion['UNASUS_SIGNATURE']
        }
        this.http.post(this.host + this.instance + 'api/' + this.name + location, 
        Object.assign(body, data)).subscribe((data) => {
            this.actionApi.emit(JSON.stringify(data));
        });
    }
}