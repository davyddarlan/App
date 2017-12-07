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
        var iv = '6xvzWpJpHhNN/hv3Q95PiA==';
        var enc_string = '4GwS7Zps3d0NifCWADQFY5OI+IMdj6M804POH5rWEYN76upnUO/QWhgz7naMue9NoQq8obuGgRrfp9Q2AbaJ/EKG7taw1eW1C3CABn2G1o/dtWKO8JcDx7xzoA4vmIK5yRDiwTEGULi5tC7Rnq4TbrNsPudKC3fPKaFKYgwJr//CuVgZRtMW6p80vu6QzaIqrDac9DL9AfG9hVIWW8o5DVBRVkNudeQTB72uzKKClTrF2MHG+uGHy+5zPAkVg28zTMJJCwO6IjXyYZr9TL4ClxYMF9t9XDtZMhodO9uI2/+sj9Cb6cq+IqvfHg0JpmOgPoLR6PplVly6PNP10It3Ly0mlaNwoHMlH0881fprWLnCo/+aV2Jui4jQmawh8VF35tdzVnsRNRfVf+MXqFaSdNL2jkD6C1sJypOV4MbMIJW9Y3IYGAjZE1uAjLJ3x5onb0YODmwfp46amQsSOCjwUWI7yW8Va1uYmmAZHxEszF9hyaI7IKZ3FuO1f4m7EP1Vg13i//StTAxQW5mr39oxow==';
        var bytes = crypto.asmcrypto.AES_CBC.decrypt(atob(enc_string), this.key, 0, atob(iv));
        var string = crypto.asmcrypto.bytes_to_string(bytes);
        var obj = JSON.parse(string.replace(/\}[^\w\d]+$/g, '}'));
        var signature = crypto.asmcrypto.HMAC_SHA256.hex(obj['UNASUS_DEVICE_ID'] + this.key, obj['UNASUS_SESSION']);
        var returnData = {
            UNASUS_USER_ID: obj['UNASUS_USER_ID'],
            UNASUS_DEVICE_ID: obj['UNASUS_DEVICE_ID'],
            UNASUS_SIGNATURE: signature,
            UNASUS_ACESSO_NOME: obj['UNASUS_ACESSO_NOME']
        };
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
        this.http.post(this.host + this.instance + 'api/' + this.name + location, Object.assign(body, data)).subscribe((data) => {
            this.actionApi.emit(JSON.stringify(data));
        });
    }
}