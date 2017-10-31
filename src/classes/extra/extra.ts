import { Injectable } from '@angular/core';

@Injectable()
export class Extra {
    dataToString(data: any[]): string {
        return JSON.stringify(data);
    }

    dataToObject(data: string): object[] {
        return JSON.parse(data);
    }

    directoryName(url: string): string {
        let pack: any = url.split('/');
        pack = pack[pack.length - 1];
        pack = pack.split('.');
        pack = pack[0];
        return pack;
    }
}