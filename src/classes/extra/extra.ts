import { Injectable } from '@angular/core';

@Injectable()
export class Extra {
    stringify(obj, prop) {
        var placeholder = '____PLACEHOLDER____';
        var fns = [];
        var json = JSON.stringify(obj, function(key, value) {
            if (typeof value === 'function') {
            fns.push(value);
            return placeholder;
            }
            return value;
        }, 2);
        json = json.replace(new RegExp('"' + placeholder + '"', 'g'), function(_) {
            return fns.shift();
        });
        return 'this["' + prop + '"] = ' + json + ';';
    }
}