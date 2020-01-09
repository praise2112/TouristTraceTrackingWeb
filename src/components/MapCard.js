import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Rate } from 'antd';

import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ReactCardFlip from 'react-card-flip';


const useStyles = makeStyles(theme => ({
    card: {
        maxWidth: 345,
        width: "24em",
        margin: "0 1em 1em 1em"
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: red[500],
    },
}));

const MapCard = (({info, key}) =>{
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };
    const { address, distanceText, name, openNow, priceLevel, rating, timeText } = info;
    let { photoUrl} = info;
    if(photoUrl === ""){
        photoUrl = "https://carolinadojo.com/wp-content/uploads/2017/04/default-image.jpg"
    }
    console.log(photoUrl);
    console.log(key + "ll");


    return (



        <ReactCardFlip isFlipped={expanded} flipDirection="vertical">
            <Card className={classes.card} key={key}>
                <CardHeader
                    // avatar={
                    //     <Avatar aria-label="recipe" className={classes.avatar}>
                    //         R
                    //     </Avatar>
                    // }
                    // action={
                    //     <IconButton aria-label="settings">
                    //         <MoreVertIcon />
                    //     </IconButton>
                    // }
                    title={name}
                    // subheader="September 14, 2016"
                />
                <CardMedia
                    className={classes.media}
                    image={photoUrl}
                    title={name}
                />
                <CardContent>
                    <Typography variant="body2" color="textSecondary" component="p">
                        <span className="d-block text-center">Distance: {distanceText} - {timeText} away</span>
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p" className={'text-center'}>
                        <Rate value={rating} /> <br/>
                        <Rate value={priceLevel} character="$" />
                    </Typography>
                </CardContent>
                <CardActions disableSpacing>
                    <IconButton aria-label="add to favorites">
                        <FavoriteIcon />
                    </IconButton>
                    <IconButton aria-label="share">
                        <ShareIcon />
                    </IconButton>
                    <IconButton
                        className={clsx(classes.expand, {
                            [classes.expandOpen]: expanded,
                        })}
                        onClick={handleExpandClick}
                        aria-expanded={expanded}
                        aria-label="show more"
                    >
                        <ExpandMoreIcon />
                    </IconButton>
                </CardActions>
            </Card>
            <Card className={classes.card} key={key}>
                <CardHeader
                    // avatar={
                    //     <Avatar aria-label="recipe" className={classes.avatar}>
                    //         R
                    //     </Avatar>
                    // }
                    // action={
                    //     <IconButton aria-label="settings">
                    //         <MoreVertIcon />
                    //     </IconButton>
                    // }
                    title={name}
                    // subheader="September 14, 2016"
                />
                {/*<CardMedia*/}
                    {/*className={classes.media}*/}
                    {/*image={photoUrl}*/}
                    {/*title={name}*/}
                {/*/>*/}
                <CardContent>
                    <Typography variant="body2" color="textSecondary" component="p">
                        <p className={'text-center'}>Address</p>
                        <hr/>
                        {address}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p" className={'text-center'}>
                        {openNow ? (<span><b>Open now</b> </span>): (<span><b>Closed now</b></span>) }
                    </Typography>
                </CardContent>
                <CardActions disableSpacing>
                    <IconButton aria-label="add to favorites">
                        <FavoriteIcon />
                    </IconButton>
                    <IconButton aria-label="share">
                        <ShareIcon />
                    </IconButton>
                    <IconButton
                        className={clsx(classes.expand, {
                            [classes.expandOpen]: expanded,
                        })}
                        onClick={handleExpandClick}
                        aria-expanded={expanded}
                        aria-label="show more"
                    >
                        <ExpandMoreIcon />
                    </IconButton>
                </CardActions>
            </Card>

    </ReactCardFlip>

    );
});

export default MapCard;
