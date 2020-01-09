import {useState} from 'react';

function useToggleState(initialVal = true) {
    // call useState, "reserve piece of state"
    const [state, setState] = useState(initialVal);
    console.log(`init state ${state}`);
    const toggle = ()=>{
        console.log(`state before toggle is : ${state}`);
        setState(!state);
        console.log(`toggling`);
        // console.log(!state);
        console.log(`state after toggle is: ${state}`);
    };
    // return piece of state and a function to toggle it
    return [state, toggle];
}

export default useToggleState;

