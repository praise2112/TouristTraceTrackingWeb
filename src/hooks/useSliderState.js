import {useState} from 'react';

export default initialVal => {
    const [value, setValue] = useState(initialVal);
    const handleChange = (value)=>{
        setValue(value);
    };
    const reset = ()=>{
        setValue(0);
    };
    return [value, handleChange, reset];
}

