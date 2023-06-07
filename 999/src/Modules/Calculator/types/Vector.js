import { array } from 'prop-types';
import React from 'react';
export default class Vector {
    constructor(values = []) {
        this.values = [];
        values.forEach(el => this.values.push(el));
    }

    toString() {
        console.log(values);
        console.log(this.values.map(el => el.toString()).join(' ') + 
        ')');
        return '(' + 
            this.values.map(el => el.toString()).join(' ') + 
            ')';
    }
}
