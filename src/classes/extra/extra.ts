import { Injectable } from '@angular/core';

@Injectable()
export class Extra {
    stringify(obj: object): string {
	    return JSON.stringify(obj,function(key, value){
		    return (typeof value === 'function' ) ? value.toString() : value;
		});
	}

    parse(str: string): object {
	    return JSON.parse(str,function(key, value){
		    if(typeof value != 'string') return value;
			return ( value.substring(0,8) == 'function') ? eval('('+value+')') : value;
		});
	}
}