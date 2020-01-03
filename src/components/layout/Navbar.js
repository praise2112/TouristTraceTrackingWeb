import React, {Component} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import RestaurantIcon from '@material-ui/icons/Restaurant';
import HotelIcon from '@material-ui/icons/Hotel';
import LocalCafeIcon from '@material-ui/icons/LocalCafe';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import LocalGasStationIcon from '@material-ui/icons/LocalGasStation';
import LocalParkingIcon from '@material-ui/icons/LocalParking';
import LocalGroceryStoreIcon from '@material-ui/icons/LocalGroceryStore';
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
import MuseumIcon from '@material-ui/icons/Museum';
import MoreIcon from '@material-ui/icons/MoreVert';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import HistoryIcon from '@material-ui/icons/History';
import SpaIcon from '@material-ui/icons/Spa'
import Tooltip from '@material-ui/core/Tooltip';
import MotionMenu from 'react-motion-menu'

import { loadCSS } from 'fg-loadcss';
import Icon from '@material-ui/core/Icon';
import '../../styles/hovicon.css'
import ConstraintSlider from "./ConstraintSlider";
import useStyles from "../../styles/NavbarStyles";


import useSliderState from "../../hooks/useSliderState";
import Avatar from "@material-ui/core/Avatar";
import useSelectorState from "../../hooks/useSelectorState";
import {Link, NavLink} from "react-router-dom";





 function Navbar(props) {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
     React.useEffect(() => {
         loadCSS(
             'https://use.fontawesome.com/releases/v5.1.0/css/all.css',
             document.querySelector('#font-awesome-css'),
         );
     }, []);

    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const handleProfileMenuOpen = event => {
        setAnchorEl(event.currentTarget);
    };



    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };

    const handleMobileMenuOpen = event => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    const menuId = 'primary-search-account-menu';
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            id={menuId}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
            <MenuItem onClick={handleMenuClose}>My account</MenuItem>
        </Menu>
    );

    const mobileMenuId = 'primary-search-account-menu-mobile';
    let renderMobileMenu;
     if(props.isLoggedIn){
         renderMobileMenu = (
             <Menu
                 anchorEl={mobileMoreAnchorEl}
                 anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                 id={mobileMenuId}
                 keepMounted
                 transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                 open={isMobileMenuOpen}
                 onClose={handleMobileMenuClose}
             >
                 <MenuItem>
                     <IconButton aria-label="Log out" color="inherit">

                         <Icon className={"fas fa-sign-out-alt"}  style={{ fontSize: 18, paddingTop:"0.05em"}}/>
                     </IconButton>
                     <Link to={"#"} onClick={props.logOutUser}>
                         <p style={{marginTop: "1.25em"}}>Log Out</p>
                     </Link>

                 </MenuItem>
                 <MenuItem>
                     <IconButton
                         edge="end"
                         aria-label="Profile"
                         color="inherit"
                     >
                         <AccountCircle />
                     </IconButton>
                     <Link to={"/profile"} onClick={e => e.stopPropagation()}>
                        <p style={{marginTop: "1.25em", paddingLeft:"0.5em"}}>Profile</p>
                     </Link>
                 </MenuItem>
                 <MenuItem onClick={handleProfileMenuOpen}>
                     <IconButton
                         edge="end"
                         aria-label="History"
                         color="inherit"
                     >
                         <HistoryIcon />
                     </IconButton>
                     <Link to={"/history/1"} onClick={e => e.stopPropagation()}>
                        <p style={{marginTop: "1.25em", paddingLeft:"0.5em"}}>  History</p>
                     </Link>
                 </MenuItem>
             </Menu>
         );
    }else{
         renderMobileMenu = (
             <Menu
                 anchorEl={mobileMoreAnchorEl}
                 anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                 id={mobileMenuId}
                 keepMounted
                 transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                 open={isMobileMenuOpen}
                 onClose={handleMobileMenuClose}
             >
                 <MenuItem>
                     <IconButton aria-label="login" color="inherit">

                         <LockOpenIcon/>
                     </IconButton>
                     <Link to={"/login"} onClick={e => e.stopPropagation()}>
                       <p style={{marginTop: "1.25em", paddingLeft:"0.5em"}}>Log In</p>
                     </Link>
                 </MenuItem>
                 <MenuItem>
                     <IconButton aria-label="sign up" color="inherit">

                         <Icon className={"fas fa-user-plus"}  style={{ fontSize: 18, width: "1.5em", paddingTop:"0.05em"}}/>
                     </IconButton>
                     <Link to={"/register"} onClick={e => e.stopPropagation()}>
                         <p style={{marginTop: "1.25em"}}>Sign Up</p>
                     </Link>
                 </MenuItem>

             </Menu>
         );
     }

    const authLinks = (
        <div className={classes.sectionDesktop}>
            <Tooltip title={"Log Out"}>
                <IconButton aria-label="Log out" color="inherit">
                    <Link to={"#"} onClick={props.logOutUser}>
                        <Icon className={"fas fa-sign-out-alt"}  style={{ fontSize: 18, paddingTop:"0.09em"}}/>
                    </Link>
                </IconButton>
            </Tooltip>
            <Tooltip title={"Profile"}>

                <IconButton
                    edge="end"
                    aria-label="Profile"
                    color="inherit"
                >
                    <Link to={"/profile"} onClick={e => e.stopPropagation()}>
                         <AccountCircle style={{paddingBottom: "0.08em"}}/>
                    </Link>
                </IconButton>
            </Tooltip>
            <Tooltip title={"History"}>

                <IconButton
                    edge="end"
                    aria-label="History"
                    color="inherit"
                >
                    <Link to={"/history/1"} onClick={e => e.stopPropagation()} >
                           <HistoryIcon style={{paddingBottom: "0.08em"}}/>
                    </Link>
                </IconButton>
            </Tooltip>
        </div>
    );
    const guestLinks =(
        <div className={classes.sectionDesktop}>
            <Tooltip title={"Login"}>
                <IconButton aria-label="login" color="inherit">
                    <Link to={"/login"} onClick={e => e.stopPropagation()}>
                        <LockOpenIcon style={{paddingBottom: "0.08em"}}/>
                    </Link>
                </IconButton>
            </Tooltip>
            <Tooltip title={"Sign Up"}>
                <IconButton aria-label="sign up" color="inherit">
                    <Link to={"/register"} onClick={e => e.stopPropagation()}>
                        <Icon className={"fas fa-user-plus"}  style={{ fontSize: 18, width: "1.5em", paddingTop:"0.08em"}}/>
                    </Link>
                </IconButton>
            </Tooltip>

        </div>
    );
    const menuRef = React.useRef(null);
     const [value, handleChange, reset] = useSliderState(0);
    const recommendIcon =  (
        <Tooltip title={"Recommendations"} >
            <IconButton aria-label="recommendations" color="inherit" className={classes.removeButtonBorder}>
                <i className={"hovicon effect-8 mini"  }   >
                    <Icon className={"far fa-lightbulb " }  style={{ fontSize: "1em", width: "1.5em", paddingTop:"0.05em"}} onClick={()=>menuRef.current.click()}/>
                </i>

            </IconButton>
     </Tooltip>
    );
     const [selectValue, handleChangeSelector, resetSelector, selectName] = useSelectorState(recommendIcon, "recommend");

     const restaurantIcon =  (
        <Tooltip title={"Restaurants"} >
            <IconButton aria-label="Restaurants" color="inherit" style={{padding: 0, paddingBottom:"2.6em"}} className={classes.removeButtonBorder + " hovicon effect-8 mini"}>
                <Avatar className={classes.avatar2 } ><RestaurantIcon onClick={()=>menuRef.current.click()} /></Avatar>
            </IconButton>
        </Tooltip>
    );
    const hotelIcon =  (
        <Tooltip title={"Hotels" } >
            <IconButton aria-label="Hotels" color="inherit" style={{padding: 0, paddingBottom:"2.6em"}} className={classes.removeButtonBorder  + " hovicon effect-8 mini"}>
                <Avatar className={classes.avatar2}><HotelIcon  onClick={()=>menuRef.current.click()} /></Avatar>
            </IconButton>
        </Tooltip>
    );
    const cafeIcon =  (
        <Tooltip title={"Cafe"} >
            <IconButton aria-label="Cafe" color="inherit" style={{padding: 0, paddingBottom:"2.6em"}}  className={classes.removeButtonBorder  + " hovicon effect-8 mini"}>
                <Avatar className={classes.avatar2}><LocalCafeIcon onClick={()=>menuRef.current.click()}/></Avatar>
            </IconButton>
        </Tooltip>
    );
    const museumIcon =  (
        <Tooltip title={"Museum"} >
            <IconButton aria-label="Museum" color="inherit" style={{padding: 0, paddingBottom:"2.6em"}} className={classes.removeButtonBorder  + " hovicon effect-8 mini"}>
                <Avatar className={classes.avatar2}><MuseumIcon onClick={()=>menuRef.current.click()}/></Avatar>
            </IconButton>
        </Tooltip>
    );
    const gymIcon =  (
        <Tooltip title={"Gym"} >
            <IconButton aria-label="Gym" color="inherit" style={{padding: 0, paddingBottom:"2.6em"}} className={classes.removeButtonBorder+ " hovicon effect-8 mini"}>
                <Avatar  className={classes.avatar2}><Icon className={"fas fa-dumbbell "}  style={{color: "white" }}  onClick={()=>menuRef.current.click()}/></Avatar>
            </IconButton>
        </Tooltip>
    );
    const zooIcon =  (
        <Tooltip title={"Zoo"} >
            <IconButton aria-label="Zoo" color="inherit" style={{padding: 0, paddingBottom:"2.6em"}} className={classes.removeButtonBorder+ " hovicon effect-8 mini"}>
                <Avatar className={classes.avatar2}><Icon className={"fas fa-paw"}  style={{color: "white"}} onClick={()=>menuRef.current.click()}/></Avatar>
            </IconButton>
        </Tooltip>
    );
    const spaIcon =  (
        <Tooltip title={"Spa"} >
            <IconButton aria-label="Spa" color="inherit" style={{padding: 0, paddingBottom:"2.6em"}} className={classes.removeButtonBorder+ " hovicon effect-8 mini"}>
                <Avatar className={classes.avatar2}><SpaIcon onClick={()=>menuRef.current.click()}/></Avatar>
            </IconButton>
        </Tooltip>
    );
    const bankIcon =  (
        <Tooltip title={"Banks"} >
            <IconButton aria-label="Banks" color="inherit" style={{padding: 0, paddingBottom:"2.6em"}} className={classes.removeButtonBorder+ " hovicon effect-8 mini"}>
                <Avatar className={classes.avatar2}><AccountBalanceIcon onClick={()=>menuRef.current.click()} /></Avatar>
            </IconButton>
        </Tooltip>
    ); const gasIcon =  (
         <Tooltip title={"Gas Stations"} >
             <IconButton aria-label="Gas Stations" color="inherit" style={{padding: 0, paddingBottom:"2.6em"}} className={classes.removeButtonBorder+ " hovicon effect-8 mini"}>
                 <Avatar className={classes.avatar2}><LocalGasStationIcon onClick={()=>menuRef.current.click()} /></Avatar>
             </IconButton>
         </Tooltip>
    ); const parkIcon =  (
         <Tooltip title={" Parking Lots"} >
             <IconButton aria-label="Parking Lots" color="inherit" style={{padding: 0}} className={classes.removeButtonBorder+ " hovicon effect-8 mini"}>
                 <Avatar className={classes.avatar2}><LocalParkingIcon onClick={()=>menuRef.current.click()}/></Avatar>
             </IconButton>
         </Tooltip>
    );
    const groceryIcon =  (
    <Tooltip title={" Groceries"} >
        <IconButton aria-label=" Groceries" color="inherit" style={{padding: 0, paddingBottom:"2.6em"}} className={classes.removeButtonBorder+ " hovicon effect-8 mini"}>
            <Avatar className={classes.avatar2}><LocalGroceryStoreIcon onClick={()=>menuRef.current.click()}/></Avatar>
        </IconButton>
    </Tooltip>
    );
    const postIcon =  (
    <Tooltip title={" Post Offices"} >
        <IconButton aria-label="recommendations" color="inherit" style={{padding: 0, paddingBottom:"2.6em"}} className={classes.removeButtonBorder+ " hovicon effect-8 mini"}>
            <Avatar className={classes.avatar2}><LocalHospitalIcon onClick={()=>menuRef.current.click()}/></Avatar>
        </IconButton>
    </Tooltip>
    );




     const motionMenu = (
        <MotionMenu
            x={-25}
            y={-15}
            type="vertical"
            margin={80}
            className={classes.motionMenu}

        >
            {/*invisible toggler*/}
            <div style={{display: "none"}}>
                <Icon ref={menuRef}  className={"fa fa-bars"} style={{color: "black"}} />
            </div>

            {/*items*/}
            <div >
                <Tooltip title={"Restaurants"} >
                    <IconButton aria-label="Restaurants" color="inherit" onClick={(e)=>handleChangeSelector(restaurantIcon, "restaurant")} className={classes.removeButtonBorder}>
                <Avatar className={classes.avatar}><RestaurantIcon onClick={()=>menuRef.current.click()} /></Avatar>
                    </IconButton>
                </Tooltip>
                <Tooltip title={"Hotels" } >
                    <IconButton aria-label="Hotels" color="inherit" onClick={(e)=>handleChangeSelector(hotelIcon, "lodging")} className={classes.removeButtonBorder}>
                <Avatar className={classes.avatar}><HotelIcon onClick={()=>menuRef.current.click()}/></Avatar>
                    </IconButton>
                </Tooltip>
                <Tooltip title={"Cafe"} >
                    <IconButton aria-label="Cafe" color="inherit" onClick={(e)=>handleChangeSelector(cafeIcon, "cafe")} className={classes.removeButtonBorder}>
                <Avatar className={classes.avatar}><LocalCafeIcon onClick={()=>menuRef.current.click()}/></Avatar>
                    </IconButton>
                </Tooltip>
                <Tooltip title={"Museum"} >
                    <IconButton aria-label="Museum" color="inherit" onClick={(e)=>handleChangeSelector(museumIcon, "museum")} className={classes.removeButtonBorder}>
                <Avatar className={classes.avatar}><MuseumIcon onClick={()=>menuRef.current.click()}/></Avatar>
                    </IconButton>
                </Tooltip>
                <Tooltip title={"Zoo"} >
                    <IconButton aria-label="Zoo" color="inherit" onClick={(e)=>handleChangeSelector(zooIcon, "zoo")} className={classes.removeButtonBorder}>
                <Avatar className={classes.avatar}><Icon className={"fas fa-paw"}  style={{color: "white"}} onClick={()=>menuRef.current.click()}/></Avatar>
                    </IconButton>
                </Tooltip>
                <Tooltip title={"Spa"} >
                    <IconButton aria-label="Spa" color="inherit" onClick={(e)=>handleChangeSelector(spaIcon, "spa")} className={classes.removeButtonBorder}>
                <Avatar className={classes.avatar}><SpaIcon onClick={()=>menuRef.current.click()}/></Avatar>
                    </IconButton>
                </Tooltip>

            </div>
            {/*Item row2*/}
            <div>
                <Tooltip title={"Gym"} >
                    <IconButton aria-label="Gym" color="inherit" onClick={(e)=>handleChangeSelector(gymIcon, "gym")} className={classes.removeButtonBorder}>
                        <Avatar  className={classes.avatar}><Icon className={"fas fa-dumbbell "}  style={{color: "white" }}  onClick={()=>menuRef.current.click()}/></Avatar>
                    </IconButton>
                </Tooltip>
                <Tooltip title={"Banks"} >
                    <IconButton aria-label="Banks" color="inherit" onClick={(e)=>handleChangeSelector(bankIcon, "bank")} className={classes.removeButtonBorder}>
                <Avatar className={classes.avatar}><AccountBalanceIcon onClick={()=>menuRef.current.click()} /></Avatar>
                    </IconButton>
                </Tooltip>
                <Tooltip title={"Gas Stations"} >
                    <IconButton aria-label="Gas Stations" color="inherit" onClick={(e)=>handleChangeSelector(gasIcon, "gas_station")} className={classes.removeButtonBorder}>
                <Avatar className={classes.avatar}><LocalGasStationIcon onClick={()=>menuRef.current.click()} /></Avatar>
                    </IconButton>
                </Tooltip>
                <Tooltip title={" Parking Lots"} >
                    <IconButton aria-label="Parking Lots" color="inherit" onClick={(e)=>handleChangeSelector(parkIcon, "parking")} className={classes.removeButtonBorder}>
                <Avatar className={classes.avatar}><LocalParkingIcon onClick={()=>menuRef.current.click()}/></Avatar>
                    </IconButton>
                </Tooltip>
                <Tooltip title={" Groceries"} >
                    <IconButton aria-label=" Groceries" color="inherit" onClick={(e)=>handleChangeSelector(groceryIcon, "grocery_or_supermarket")} className={classes.removeButtonBorder}>
                <Avatar className={classes.avatar}><LocalGroceryStoreIcon onClick={()=>menuRef.current.click()}/></Avatar>
                    </IconButton>
                </Tooltip>
                <Tooltip title={" Post Offices"} >
                    <IconButton aria-label="Post Offices" color="inherit" onClick={(e)=>handleChangeSelector(postIcon, "post_office")} className={classes.removeButtonBorder}>
                <Avatar className={classes.avatar}><LocalHospitalIcon onClick={()=>menuRef.current.click()}/></Avatar>
                    </IconButton>
                </Tooltip>
            </div>




        </MotionMenu>
    );

     return (
        <div className={classes.grow}>
            <AppBar position="static">
                <Toolbar>

                    <Typography className={classes.title} variant="h6" noWrap>
                        TouristTraceTrack
                    </Typography>

                    <div className={classes.grow} />
                    <div className={classes.sectionDesktop}>

                    <ConstraintSlider
                        iconType="clock-circle"
                        value={value}
                        onChange={(value) => handleChange(value)}
                        text="Minutes to destination"
                    />
                    </div>
                    {motionMenu}
                    {selectValue}


                    <div className={classes.search}>
                        <div className={classes.searchIcon}>
                            <SearchIcon />
                        </div>
                        <InputBase
                            placeholder="Search…"
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput,
                            }}
                            inputProps={{ 'aria-label': 'search' }}
                        />
                    </div>
                    {props.isLoggedIn ? authLinks : guestLinks}

                    <div className={classes.sectionMobile}>
                        <IconButton
                            aria-label="show more"
                            aria-controls={mobileMenuId}
                            aria-haspopup="true"
                            onClick={handleMobileMenuOpen}
                            color="inherit"
                        >
                            <MoreIcon />
                        </IconButton>
                    </div>
                </Toolbar>
            </AppBar>
            {renderMobileMenu}
            {renderMenu}
        </div>
    );
}

export default Navbar;
