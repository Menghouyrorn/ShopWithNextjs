import React from 'react'
import { Card, Typography, CardHeader, CardMedia, Collapse, CardContent, Avatar, Button, IconButton, CardActions, Link,Paper} from "@material-ui/core";
import MoreIcon from '@material-ui/icons/More';
import { makeStyles } from '@material-ui/core/styles';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { fireAuth } from '../services/firebase';
import { useRouter } from 'next/router'
import Nextlink from 'next/link';
import { CardActionArea } from '@mui/material';
import { useCart } from "react-use-cart";



const useStyles = makeStyles((theme) => ({
    root: {
        minWidth: 'auto',
    },
    card: {
        margin: 15,
        backgroundColor: "#eee",
        borderRadius: '15px',
        width: '230px',
        border: '1px solid #C0C0C0'
    },
    media: {
        width: '100%',
        height: 200,
        cursor: 'pointer',

    },
    avatar: {
        backgroundColor: '#e22',
    },
}))

const mainstyles = {
    margin: 'auto',
    cursor: 'pointer',
}

const CardComponent = (props) => {
    const [cart,setCart]=React.useState([]);

    const addItem=(props)=>{
        setCart([...cart,props])
    }

    const classes = useStyles()
    return (
        <div className={classes.root}>
            <div>{cart.length}</div>
            <Paper className={classes.card} elevation={3}>
                <CardActionArea>
                    <CardMedia
                        className={classes.media}
                        image={props.cardImageUrl}
                        title={props.imageTitle}
                        style={{ borderRadius: 7, borderBottom: '1px solid black' }}
                    />
                    <CardContent>
                        <div style={{ marginLeft: 40, cursor: 'pointer' }}>
                            <StarBorderIcon />
                            <StarBorderIcon />
                            <StarBorderIcon />
                            <StarBorderIcon />
                            <StarBorderIcon />
                        </div>
                        <Typography>{props.description}</Typography>
                        <Typography style={{ color: "red" }}>{props.priceBuy}</Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions style={{ borderTop: '1px solid black', borderRadius: 7 }}>
                    <div style={mainstyles} key={props.id}>
                        <FavoriteBorderIcon onClick={()=>addItem(props.id)}/>
                        {" "}
                        <Link onClick={() => addItem(props.id)} ><AddShoppingCartIcon /></Link>
                    </div>
                </CardActions>
            </Paper>
        </div >
    );
};

export default CardComponent;