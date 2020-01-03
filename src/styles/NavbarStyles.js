import {fade} from "@material-ui/core";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {deepOrange, blue} from "@material-ui/core/colors";

const useStyles =makeStyles( theme=>({
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
        },
    },
    searchIcon: {
        width: theme.spacing(7),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 7),
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: 200,
        },
    },
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'flex',
        },
    },
    sectionMobile: {
        display: 'flex',
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    },
    iconn:{
        margin: theme.spacing(1),
        padding: "0.2em",
        borderRadius: "50%",
        fontSize: "3em",

        // backgroundColor: theme.palette.secondary.main,
        color: theme.palette.getContrastText(deepOrange[500]),
        backgroundColor: deepOrange[500],
    },
    motionMenu:{
        "& div div:nth-child(2)":{
            // position: "relative !important",
            display: "flex !important",
            marginLeft: "-15em",
            background: "rgba(33, 150, 243, 0.2) ",
            borderRadius: "0 0 20% 20%"
        },
        "& div div:nth-child(3)":{
            // position: "relative !important",
            display: "flex !important",
            marginLeft: "-15em",
            background: "rgba(33, 150, 243, 0.2) ",
            borderRadius: "20% 20% 0 0"
        },
    },
    avatar: {
        margin: theme.spacing(1),
        padding: "0.2em",
        borderRadius: "50%",
        fontSize: "3em",
        // backgroundColor: theme.palette.secondary.main,
        // color: theme.palette.getContrastText(deepOrange[500]),
        backgroundColor: blue[800],
    },
    avatar2: {
        margin: theme.spacing(1),
        padding: "0.2em",
        borderRadius: "50%",
        fontSize: "3em",
        // backgroundColor: theme.palette.secondary.main,
        // color: theme.palette.getContrastText(deepOrange[500]),
        backgroundColor: blue[900],
    },
    removeButtonBorder:{
        "&:focus": {
        outline: "none !important",
        outlineOffset: "none !important"
        }
    },
    removeLinkColor:{
        textDecoration: "none",
        color: "inherit !important" ,
    }
}));

export default useStyles;
