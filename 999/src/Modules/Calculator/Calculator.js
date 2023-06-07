import Complex from "./types/Complex";
import Vector from "./types/Vector";
import Matrix from "./types/Matrix";
import RealCalculator from "./RealCalculator";
import ComplexCalculator from "./ComplexCalculator";
import VectorCalculator from "./VectorCalculator";
import MatrixCalculator from "./MatrixCalculator";
import Member from "./polynomial/types/Member";
import Polynomial from "./polynomial/types/Polynomial";
import React from 'react';
//import PolynomialCalculator from "./polynomial/PolynomialCalculator";
class Calculator extends React.Component{
    constructor(props) {
        super(props);
        this.RealCalculator = new RealCalculator();
      }
     
    toValue(str) {
        if (str.includes('*x^')) { return this.toPolynomial(str); }
        if (str.includes('\n')) { return this.toMatrix(str); }
        if (str.includes('(')) { return this.toVector(str); }
        if (str.includes('i')) {  return this.toComplex(str); }
        return str - 0;
    }

    toPolynomial(str) {
        if (str instanceof Array) {
            return new Polynomial(str)
        }
        if (typeof str == 'string' && str) {
            const members = [];
            const arrStr = str.replace(/\s+/g, '').replace(/-/g, ' -').split(/[+ ]/g);
            for (let i = 0; i < arrStr.length; i++) {
                members.push(this.toMember(arrStr[i]));
            }
            return new Polynomial(members);
        }
    }

    toMember(str) {
        if (typeof str == 'number') {
            return new Member(str);
        }
        if (typeof str == 'string' && str) {
            const arrStr = str.split('*x^');
            return new Member(this.toValue(arrStr[0]), arrStr[1] - 0);
        }
    }

    toComplex(str) {
        
        if (typeof str == 'number') {
            return new Complex(str);
            
        }
        if (str && typeof str == 'string') {
            
            const arrStr = str.split('i*');
        
            if (arrStr.length == 2) {
                if (arrStr[0].includes('+')) {
                    const arrRe = arrStr[0].split('+');
                    
                    return new Complex(arrRe[0] - 0, arrStr[1] - 0);
                    
                }
                if (arrStr[0].includes('-')) {
                    const arrRe = arrStr[0].split('-');
                    console.log((arrRe[0] - 0, arrStr[1] - 0));
                    return new Complex(arrRe[0] - 0, -arrStr[1] - 0);
                }
                return null;
            }
            if (arrStr.length == 1) {
                if (isNaN(arrStr - 0)) { return null }
                return new Complex(arrStr[0] - 0)
            }
        }
        
        return null;
    }

    toVector(str) {
        /*if (str instanceof Array) {
            return new Vector(str);
        }
        if (str && typeof str == 'string') {
            const arr = str.replace('(', '').replace(')', '').split(',').map(el => this.toValue(el));
            console.log(arr,this.toValue(el));
            return new Vector(arr);
        }*/
        //return null
        if (str[0] === '(') {
            const arr = str.slice(1, -1).split(',');
            return new Vector(arr.map(elem => this.toString(elem)));
        }
    }

    toMatrix(str) {
        if (str instanceof Array) {
            return new Matrix(str);
        }
        if (str && typeof str === 'string') {
            const arr = str.split('\n');
            const values = [];
            for (let i = 0; i < arr.length; i++) {
                values.push(arr[i].split(', ').map(el => this.toValue(el)));
            }
            if (values[0] instanceof Array) {
                return new Matrix(values);
            }
        }
        return null;
    }


    member(value, power) {
        return new Member(value, power)
    }
    polynomial(members) {
        return new Polynomial(members);
    }
    complex(re, im) {
        return new Complex(re, im);
    }
    vector(values) {
        return new Vector(values);
    }
    matrix(values) {
        return new Matrix(values);
    }

    add(a, b) {
        return this.get(a).add(a,b);
    }

    sub(a, b) {
        return this.get(a).sub(a, b);
    }

    mult(a, b) {
        return this.get(a).mult(a, b);
    }

    div(a, b) {
        return this.get(a).div(a, b)
    }

    zero(type, elem) {
        type = type ? type : elem ? elem.constructor.name : null;
        switch (type) {
            case 'Complex':
                return (new ComplexCalculator).zero();
            case 'Vector':
                return (new VectorCalculator).zero(elem.values.length, elem.values[0]);
            case 'Matrix':
                return (new MatrixCalculator).zero(elem.values.length, elem.values[0][0]);
        }
        return 0; 
    }

    one(type, elem) {
        type = type ? type : elem ? elem.constructor.name : null;
        switch (type) {
            case 'Complex':
                return (new ComplexCalculator).one();
            case 'Vector':
                return (new VectorCalculator).one(elem.values.length, elem.values[0]);
            case 'Matrix':
                return (new MatrixCalculator).one(elem.values.length, elem.values[0][0]);
        }
        return 1;
    }

    prod(a, p) {
        if (typeof p == 'number') {
            return this.get(a).prod(a, p);
        }
        return null;
    }

    pow(a, n) {
        if (typeof n == 'number') {
            return this.get(a).pow(a, n);
        }
    }
    
    get(a) {
        return (a instanceof Matrix) ? new MatrixCalculator :
            (a instanceof Vector) ? new VectorCalculator :
            (a instanceof Complex) ? new ComplexCalculator :
            (a instanceof Polynomial) ? new PolynomialCalculator :
            new RealCalculator;
    }
    type(calc, elem, method) {
        if (elem instanceof Matrix) {
            return calc[method](elem.values.length, elem.values[0][0]);
        } else if (elem instanceof Vector) {
            return calc[method](elem.values.length, elem.values[0]);
        } else return calc[method]();
    }
}
export default Calculator;