import {useState} from "react";
import './Graf2d.css';
const Graph2DUI = ({createObjectFunc, addFunction, deleteFunction, addWidth, addColor, addDerivative, addZero}) => {
    const [showPanel, setShowPanel] = useState(false);
    const showHidePanel = () => setShowPanel(!showPanel);

    const [inputList, setInputList] = useState([]);

    const [num, setNum] = useState(0);
    const showHideNum = () => setNum(num+1);

    const addFunctionHandler = () => {
        setInputList((oldArray) => [...oldArray, num]);
        showHideNum();
    };
    
    const keyUpFunctionHandler = (event, index) => {
        createObjectFunc(index);
        try {
            let f;
            eval(`f = function (x) {
                return ${event.target.value}
            }`);
            addFunction({f: f, num: index});
        } catch (e) {
            console.log(e);
        }
    }
    const keyUpWidthHandler = (event, index) => {
        addWidth({num: index, width: event.target.value});
    }
    const keyUpColorHandler = (event, index) => {
        addColor({num: index, color: event.target.value});
    }

    const deleteFunctionHandler = (index) => {
        const newInputList = inputList.filter((i) => {return i != index-1});
        setInputList(newInputList)
        deleteFunction(index);
    }


    return (
        <div className={'graph2DUi'}>
            <button className = 't4' onClick={showHidePanel}>{showPanel ? '<<' : '>>'}</button>
            {showPanel && <div>
                <button className = 't4' onClick={addFunctionHandler}>Добавить</button>
                {
                    inputList.map((index) => {
                        return (
                            <div key={index+1}>
                                <input
                                    className = 't4'
                                    placeholder='f(x)'
                                    onKeyUp={(event) => keyUpFunctionHandler(event,index+1)}
                                />
                                <input
                                    className = 't4'
                                    placeholder='width'
                                    onKeyUp={(event) => keyUpWidthHandler(event,index+1)}
                                />
                                <input
                                    className = 't4'
                                    placeholder='color'
                                    onKeyUp={(event) => keyUpColorHandler(event,index+1)}
                                />
                                <button className = 't4' onClick={() => deleteFunctionHandler(index+1)}>Удалить</button>
                            </div>
                        )
                    })
                }
            </div>}
        </div>
    )
}

export default Graph2DUI;