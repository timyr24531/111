import React from 'react';
import './HeaderComponent.css';
class HeaderComponent extends React.Component{
    constructor(props){
        super(props);
        this.showComponent = props.showComponent;
    }
    click(name){
        this.showComponent(name);
    }
    render(){
        return(
            <div className='Header'>
                <button className='header' onClick={() => this.click('Graph3D')}>Графика 3д </button>
                <button className='header' onClick={() => this.click('Graph2D')}> Графика 2д </button>
                <button className='header' onClick={() => this.click('CalculatorComponent')}>Калькулятор </button>
            </div>
        )
    }
}
export default HeaderComponent;