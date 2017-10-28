import { Injectable } from '@angular/core';
import { Persistence } from '../../classes/persistence/persistence';
import * as hash from '../../classes/hash/md5';

@Injectable()
export class Cache {
    constructor(
        private persistence: Persistence
    ) {}

    cacheVerify(repositoy: string): boolean {
        if (this.persistence.verifyPersistence(repositoy)) {
            return true;
        } else {
            return false;
        }
    }

    cacheRegister(repositoy: string, data: string): void {
        if (this.cacheVerify(repositoy)) {
            let currentRepositoryData = hash.md5(this.cacheReturn(repositoy));
            let newRepositoryData = hash.md5(data);
            if (currentRepositoryData != newRepositoryData) {
                this.persistence.setPersistence(repositoy, data);
                alert('diferentes');
            } else {
                alert('iguais');
            }
        } else {
            this.persistence.setPersistence(repositoy, data);
        }
    }

    cacheReturn(repositoy: string): any {
        return this.persistence.getPersistence(repositoy);
    }

    cacheClear(repositoy: string): boolean {
        if (this.persistence.removePersistence(repositoy)) {
            return true;
        } else {
            return false;
        }
    }
  }