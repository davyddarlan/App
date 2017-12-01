import { Injectable } from '@angular/core';

@Injectable()
export class Persistence {
    public setPersistence(name: string, element: any): void {
        localStorage.setItem(name, element);
    }

    public getPersistence(name: string): any {
        return localStorage.getItem(name);
    }

    public verifyPersistence(name: string): boolean {
        let nameOfElement = this.getPersistence(name);
        if (nameOfElement) {
            return true;
        } else {
            return false;
        }
    }

    public removePersistence(name: string):boolean {
        if (localStorage.removeItem(name)) {
            return true;
        } else {
            return false;
        }
    }
}