import {Actions} from './calc'
const DigitComponent = ({digit,dispatch}) => {
    return ( 
        <button onClick={()=>dispatch({type:Actions.ADD_DIGIT,payload:{digit}})}>{digit}</button>
    );
}
 
export default DigitComponent;