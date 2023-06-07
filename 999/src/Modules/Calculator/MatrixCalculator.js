import Matrix from "./types/Matrix";
import RealCalculator from "./RealCalculator";
import React from 'react';
class MatrixCalculator extends React.Component{
    add(a, b) {
        const calc = this.get(a.values[0][0]);
        return new Matrix(a.values.map((arr, i) => arr.map((elem, j) => calc.add(elem, b.values[i][j]))));
    }

    sub(a, b) {
        const calc = this.get(a.values[0][0]);
        return new Matrix(a.values.map((arr, i) => arr.map((elem, j) => calc.sub(elem, b.values[i][j]))));
    }

    mult(a, b) {
        const calc = this.get(a.values[0][0]);
        const c = this.zero(a.values.length, a.values[0][0]);
        for (let i = 0; i < c.values.length; i++) {
            for (let j = 0; j < c.values[i].length; j++) {
                let S = calc.zero(a.values.length, a.values[0][0]);
                for (let k = 0; k < a.values.length; k++) {
                    S = calc.add(
                        S, 
                        calc.mult(
                            a.values[i][k], 
                            b.values[k][j])
                    );
                }
                c.values[i][j] = S;
            }
        }
        return c;
    }

    prod(a, p) {
        const calc = this.get(a.values[0][0]);
        return new Matrix(a.values.map((arr, i) => arr.map(elem => calc.mult(elem, p))));
    }

    zero(length, elem) {
        const calc = this.get(elem);
        const values = [];
        for (let i = 0; i < length; i++) {
            values.push([]);
            for (let j = 0; j < length; j++) {
                values[i][j] = this.type(calc, elem, 'zero');
            }
        }
        return new Matrix(values);
    }

    one(length, elem) {
        const calc = this.get(elem);
        const values = [];
        for (let i = 0; i < length; i++) {
            values.push([]);
            for (let j = 0; j < length; j++) {
                values[i][j] = this.type(calc, elem, (i === j) ? 'one' : 'zero');
            }
        }
        return new Matrix(values);
    }

    pow(a, n) {
        let c = this.one(a.values.length, a.values[0][0]);
        for (let i = 0; i < n; i++) {
            c = this.mult(a, c);
        }
        return c;
    }

    div() {
        return null;
    }
}
export default MatrixCalculator;