import {Actions} from './calc.jsx'
const OperationComponent = ({dispatch,operation,className}) => {
    return ( 
        <button className={className} onClick={()=>dispatch({type:Actions.ADD_OPERATION,payload:{operation}})}>{operation}</button>
     );
}
 
export default OperationComponent;