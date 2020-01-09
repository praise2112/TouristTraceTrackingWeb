import { makeStyles } from '@material-ui/core/styles'
import {deepOrange, green, pink} from "@material-ui/core/colors";
import bg from './bg.svg'
import React from "react";
const styles =  theme =>  ({
    container:{
        height: "100vh",
        color: "white",
        background: `url(${bg}) no-repeat center center fixed`,
        WebkitBackgroundSize: "cover",
        MozBackgroundSize: "cover",
        OBackgroundSize: "cover",
        backgroundSize: "cover !important"
    },
    mapStyle:{
        marginTop: "1.5em",
        height: "90%",
        width: "60%",
        padding: "0",
        position: "absolute",
    },
    historyStyle:{
        marginTop: "3em",
        height: "100%",
        width: "38%"
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
    selected:{
        color: "gray"
    },
    yourHistory:{
        fontSize: "3em",
        textAlign: "center",
        color: "gray",
        fontWeight: "bold"
    },


});

export default styles;
