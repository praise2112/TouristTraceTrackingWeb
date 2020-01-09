import { makeStyles } from '@material-ui/core/styles'
import {deepOrange, green, pink} from "@material-ui/core/colors";
import React from "react";
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
    }

});

export default styles;
