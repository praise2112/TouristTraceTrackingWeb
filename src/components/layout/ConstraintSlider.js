import React from 'react';
import { Icon, Slider } from 'antd';

const ConstraintSlider = (({ iconType, value, onChange, text }) => {
    return (

            <div style={{ margin:0, width: "30vw", textAlign: "center", alignItems:"center", marginRight: "4vw"}}>

                <Slider style={{margin:0,marginTop:"0.5em", width: "30vw"}} value={value} min={0} max={60} onChange={onChange} />

                <span >
                    <Icon style={{margin:0, verticalAlign:"0.1em"}} type={iconType} />&nbsp;&nbsp;
                    {text}</span>

            </div>
    );
});

export default ConstraintSlider;
