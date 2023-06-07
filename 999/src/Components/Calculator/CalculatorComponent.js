import React from 'react';
import Calculator from '../../Modules/Calculator/Calculator';
import './CalculatorComponent.css';


class CalculatorComponent extends React.Component{

        constructor(props) {
            super(props);
            this.calculator = new Calculator();
        }
    
        operation(operand) {
            
            const A = document.getElementById('a');
            const B = document.getElementById('b');
            const C = document.getElementById('result');
    
            let a = this.calculator.toValue(A.value);
            let b = this.calculator.toValue(B.value);
            
            if (a && b) {
                let c;
                if (operand === 'zero' || operand === 'one') {
                    c = this.calculator[operand](null, a);
                } else {
                    c = this.calculator[operand](a, b);
                }
                C.value = c.toString();
            }
        }
    
    render(){
        return(
            <div className='Calculator'>
                <div>
                    <div>
                        <textarea placeholder="0" id="a" className="numbers"></textarea>
                        <textarea placeholder="0" id="b" className="numbers"></textarea>
                    </div>

                    <div>
                        <textarea placeholder="result" id="result" className="numbers" ></textarea>
                    </div>
                </div>
                <div>
                    <button className="operands btn operation" onClick={() => this.operation('add')}> Add </button>
                    <button className="operands btn operation" onClick={() => this.operation('sub')}> Sub </button>
                    <button className="operands btn operation" onClick={() => this.operation('mult')}> Mult </button>
                </div>
                <div>
                    <button className="operands btn operation" onClick={() => this.operation('div')}> Div </button>
                    <button className="operands btn operation" onClick={() => this.operation('prod')}> Prod </button>
                    <button className="operands btn operation" onClick={() => this.operation('pow')}> Pow </button>
                    </div>
                <div>
                    <button className="operands btn operation" onClick={() => this.operation('one')}> One </button>
                    <button className="operands btn operation" onClick={() => this.operation('zero')}> Zero </button>
                </div>
            </div>
        )
    }
}
export default CalculatorComponent;