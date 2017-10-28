import { Injectable } from '@angular/core';

@Injectable()
export class Persistence {
    setPersistence(name: string, element: any): void {
        localStorage.setItem(name, element);
    }

    getPersistence(name: string): any {
        return localStorage.getItem(name);
    }

    verifyPersistence(name: string): boolean {
        let nameOfElement = this.getPersistence(name);
        if (nameOfElement) {
            return true;
        } else {
            return false;
        }
    }

    removePersistence(name: string):boolean {
        if (localStorage.removeItem(name)) {
            return true;
        } else {
            return false;
        }
    }
}