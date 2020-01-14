import { makeStyles } from '@material-ui/core/styles'
import {deepOrange, green, pink} from "@material-ui/core/colors";
import React from "react";
import bg2 from "./bg2.svg";
const styles =  theme =>  ({
   mapStyle:{
       height: "89.5vh",
       width: "100%",
       padding: "0"
   },
  isSelectorOpenStyle:{
      position : "relative",
      zIndex: -1
  },
    showCard:{
       display: "none"
    },
    mark:{
        position: "absolute",
        top: "50%",
        left: "-100%",
        maxWidth: "50px",
        maxHeight: "60px",
    },
    cardContainer:{
        // height: "100vh",
        // width: "200vh",
        background: `url(${bg2}) no-repeat center center fixed`,
        WebkitBackgroundSize: "cover",
        MozBackgroundSize: "cover",
        OBackgroundSize: "cover",
        backgroundSize: "cover !important",
    }

});

export default styles;
