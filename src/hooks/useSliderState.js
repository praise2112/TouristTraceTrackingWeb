import {useState} from 'react';

export default (initialVal, onSelectOption) => {
    const [value, setValue] = useState(initialVal);
    const handleChange = (value)=>{
        setValue(value);
        onSelectOption(null, null, value, null)
    };
    const reset = ()=>{
        setValue(0);
    };
    return [value, handleChange, reset];
}

