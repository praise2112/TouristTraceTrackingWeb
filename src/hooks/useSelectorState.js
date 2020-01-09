import {useState} from 'react';
import {SET_CURRENT_USER} from "../actions/types";
import isEmpty from "../validation/is-empty";
import React from "react";
import IconButton from "../components/layout/Navbar";
import Tooltip from "@material-ui/core/Tooltip";
import Avatar from "@material-ui/core/Avatar";
import classes from "../styles/NavbarStyles";
import RestaurantIcon from '@material-ui/icons/Restaurant';
import HotelIcon from '@material-ui/icons/Hotel';
import LocalCafeIcon from '@material-ui/icons/LocalCafe';
import Icon from "@material-ui/core/Icon";

export default (initialVal) => {

    const [value, setValue] = useState(initialVal);

    const handleChange = (Icon)=>{
        setValue(Icon);
    };
    const reset = ()=>{
        setValue(0);
    };
    let selectValue = value;
    let handleChangeSelector = handleChange;
    let resetSelector = reset;
    return [selectValue,  handleChangeSelector, resetSelector];
}

