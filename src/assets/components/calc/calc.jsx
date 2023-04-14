import './calc.scss';
import {useReducer} from 'react';
import DigitComponent from './DigitComponent'
import OperationComponent from './OperationComponent';

export const Actions = {
ADD_DIGIT:'add-digit',
ADD_OPERATION:'add-operation',
EVALUATE:'evaluate',
DELET_DIGIT:'delet-digit',
CLEAR:'clear',
}
function reducer(state,{type,payload}){
    switch(type){
        case Actions.ADD_DIGIT :
            if(state.overwrite){
                return{
                    ...state,
                    currentOperand:payload.digit,
                    overwrite:false,
                }
            }
            return{
                ...state,
                currentOperand:`${state.currentOperand || ''}${payload.digit}`,
            }
            
        case Actions.ADD_OPERATION :
            if(state.currentOperand == null && state.prevOperand == null){
                return state
            }
            if(state.currentOperand == null){
                return{
                    ...state,
                    operation:payload.operation,
                }
            }
            if(state.prevOperand == null){
                return {
                    ...state,
                operation:payload.operation,
                prevOperand:state.currentOperand,
                currentOperand:null,
                }
            }
            
            return{
                ...state,
                prevOperand:evaluate(state),
                operation:payload.operation,
                currentOperand:null,
            }
        case Actions.EVALUATE:
            if(state.currentOperand == null || state.prevOperand == null || state.operation == null){
                return state
            }
            return{
                ...state,
                prevOperand:null,
                overwrite:true,
                operation:null,
                currentOperand:evaluate(state)
            }
        case Actions.CLEAR:
            return{
                ...state,
                operation:null,
                prevOperand:null,
                currentOperand:null,
            }
        case Actions.DELET_DIGIT:
            if(state.currentOperand == null) return state
            return{
                ...state,
                currentOperand:state.currentOperand.slice(0,-1)
            }
            
    }
}
function evaluate({prevOperand,currentOperand,operation}){
    const prev = parseFloat(prevOperand)
    const curr = parseFloat(currentOperand)
    if(isNaN(prev) || isNaN(curr) ) return ''
    let computation = ''
    switch(operation){
        case '+':
            computation = prev + curr;
            break;
        case '÷':
            computation = prev / curr;
            break;
        case '-':
            computation = prev - curr;
            break;
        case '×':
            computation = prev * curr;
            break;
        case '%':
        computation = prev % curr;
        break;
    }
    return computation.toString();
}

const number_format = new Intl.NumberFormat("en-us")
function formatOperand(operand){
    if(operand == null ) return 
    const [integer,dicemal] = operand.split('.')
    if(dicemal == null)
        return number_format.format(integer)
    return `${number_format.format(integer)}.${dicemal}`
}


const Calculater = () => {

    const [{prevOperand,currentOperand,operation},dispatch] = useReducer(reducer,{});


    return ( 
        <div className="calc-grid">
            <div className="output">
                <div className="prev-operand">{formatOperand(prevOperand)}{operation}</div>
                <div className="current-operand">{formatOperand(currentOperand)}</div>
            </div>
            <button onClick={()=>dispatch({type:Actions.CLEAR})}>AC</button>
            <OperationComponent  dispatch={dispatch} operation='÷'/>
            <OperationComponent  dispatch={dispatch} operation='×'/>
            <button className='purple' onClick={()=>dispatch({type:Actions.DELET_DIGIT})}>⌂</button>
            <DigitComponent dispatch={dispatch}  digit='7'/>
            <DigitComponent dispatch={dispatch}  digit='8'/>
            <DigitComponent dispatch={dispatch}  digit='9'/>
            <OperationComponent className="purple"  dispatch={dispatch} operation='-'/>
            <DigitComponent dispatch={dispatch}  digit='6'/>
            <DigitComponent dispatch={dispatch}  digit='5'/>
            <DigitComponent dispatch={dispatch}  digit='4'/>
            <OperationComponent className="purple"  dispatch={dispatch} operation='+'/>
            <DigitComponent dispatch={dispatch}  digit='3'/>
            <DigitComponent dispatch={dispatch}  digit='2'/>
            <DigitComponent dispatch={dispatch}  digit='1'/>
            <button className='purple span-two' onClick={()=>dispatch({type:Actions.EVALUATE})}>=</button>
            <DigitComponent dispatch={dispatch}  digit='.'/>
            <DigitComponent dispatch={dispatch}  digit='0'/>
            <OperationComponent  dispatch={dispatch} operation='%'/>
        </div>
     );
}
 
export default Calculater;