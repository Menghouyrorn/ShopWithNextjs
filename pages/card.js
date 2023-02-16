import React, { useContext } from 'react'
import { Card, Typography, CardHeader, CardMedia, Collapse, CardContent, Avatar, Button, IconButton, CardActions, Link } from "@material-ui/core";
import MoreIcon from '@material-ui/icons/More';
import { makeStyles } from '@material-ui/core/styles';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { fireAuth } from '../services/firebase';
import { useRouter } from 'next/router';
import Nextlink from 'next/link';
import { CardActionArea } from '@mui/material';
import { useCart } from "react-use-cart";
import { firestore } from '../services/firebase';

//style css
const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 'auto',
  },
  card: {
    margin: 15,
    backgroundColor: "#eee",
    borderRadius: '15px',
    width: '250px',
    border: '1px solid #C0C0C0',

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

const CardComponent = ({cardImageUrl,imageTitle,description,priceBuy,addToCart,addToWish}) => {
  const router = useRouter();
  const { addItem } = useCart();
  const [cart, setCart] = React.useState([]);

  
  //const addToCart = (props) => {
    //const user = fireAuth.currentUser;
    //if (user !== null) {
     // let newCart = [...cart];
    //  let itemInCart = newCart.find(
    //    (item) => props.cardName === item.cardName
    //  );
    //  if (itemInCart) {
     //   itemInCart.quantity++;
     // } else {
     //   itemInCart = {
     //     ...props,
     //     quantity: 1,
     //   };
     //   newCart.push(itemInCart);
     // }
     // setCart(newCart);
  //  } else {
    //  alert("No Account Please Login")
   // }
 // };


  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Card className={classes.card}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image={cardImageUrl}
            title={imageTitle}
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
            <Typography>{description}</Typography>
            <Typography style={{ color: "red" }}>$ {priceBuy}</Typography>
          </CardContent>
        </CardActionArea>
        <CardActions style={{ borderTop: '1px solid black', borderRadius: 7 }}>
          <div style={mainstyles}>
            <Link onClick={addToWish}><FavoriteBorderIcon /></Link>
            {" "}
            <Link onClick={addToCart} ><AddShoppingCartIcon /></Link>
          </div>
        </CardActions>
      </Card>
    </div >
  );
};

export default CardComponent;