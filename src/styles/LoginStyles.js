import { makeStyles } from '@material-ui/core/styles'
import {deepOrange, green, pink} from "@material-ui/core/colors";
import React from "react";
import bg2 from "./bg2.svg";
const styles =  theme =>  ({
    container:{
        height: "100vh",
        background: `url(${bg2}) no-repeat center center fixed`,
        WebkitBackgroundSize: "cover",
        MozBackgroundSize: "cover",
        OBackgroundSize: "cover",
        backgroundSize: "cover !important",
    },
    paper: {
        paddingTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        // backgroundColor: theme.palette.secondary.main,
        color: theme.palette.getContrastText(deepOrange[500]),
        backgroundColor: deepOrange[500],
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    orange: {
        color: theme.palette.getContrastText(deepOrange[500]),
        backgroundColor: deepOrange[500],
    },
    root: {
        display: 'flex',
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    pink: {
        color: theme.palette.getContrastText(pink[500]),
        backgroundColor: pink[500],
    },
    green: {
        color: '#fff',
        backgroundColor: green[500],
    },
    halfWidth_x:{
        width: '45%', // Fix IE 11 issue.
        // marginRight: '5%'
    },
    halfWidth_x2:{
        width: '45%', // Fix IE 11 issue.
        marginLeft: '10%'
    },
    selected:{
        color: "gray"
    },
    hist:{
        fontSize: "1.5em",
        textAlign: "center",
        marginTop: "0.5em",
        marginBottom: "0.5em",
        padding: "0.2em",
        "&:hover":{
            color: "gray",
            borderRadius:"10%",
            background: "rgba(16, 16, 16, 0.5)"
        }
    },
});

export default styles;
