import React from 'react';
import './App.css';
import CalculatorComponent from './Components/Calculator/CalculatorComponent';
//import Graph3DComponent from './Components/Graph3D/Graph3DComponent';
import HeaderComponent from './Components/Header/HeaderComponent'
//import Graph2DComponent from './Components/Graph2D/Graph2DComponent';
import Graph2D from './Components/Graph2D/Graph2D';
import Graph3D from './Components/Graph3D/Graph3D';
class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      showComponent: null
    };
  }
  showComponent(name){
    this.setState({showComponent: name});
  }
  render(){
    return(
      <div className="App">
          <HeaderComponent showComponent={name=>this.showComponent(name)}></HeaderComponent>
          {
            this.state.showComponent === 'CalculatorComponent' ?
              <CalculatorComponent></CalculatorComponent>: 
              this.state.showComponent === 'Graph3D'?
                <Graph3D></Graph3D>:
                <Graph2D></Graph2D>
          }
      </div>
    );
  }
}

export default App;
