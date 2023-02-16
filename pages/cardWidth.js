import React from 'react'
import { Card, Typography, CardHeader, CardMedia, Collapse, CardContent, Avatar, Button, IconButton, CardActions } from "@material-ui/core";
import MoreIcon from '@material-ui/icons/More';
import { makeStyles } from '@material-ui/core/styles';
import Link from 'next/link'
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import HorizontalRuleOutlinedIcon from '@mui/icons-material/HorizontalRuleOutlined';
import { fireAuth } from '../services/firebase';

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 'auto',
  },
  card: {
    margin: 15,
    backgroundColor: "#eee",
    borderRadius: '15px',
    width: '125vh',
    height: 'auto',
    border:'1px solid #C0C0C0'
  },
  media: {
    float: 'left',
    width: '45%',
    border: '1px solid black',
    cursor: 'pointer',
    textAlign: 'center',
  },
  avatar: {
    backgroundColor: '#e22',
  },
  left: {
    float: 'left',
    width: "55%"
  },
  none: {
    float: 'left',
    width: '100%',
  }
}))

const mainstyles = {
  cursor: 'pointer',
}
const CardWidth = ({ cardName, subTitle, operating, memory, hd, od, graphics, display, battery, weight, cardImageUrl, imageTitle, cpu, onBuy, priceBuy }) => {

  const classes = useStyles()
  const handleBuy = (e) => {
    e.preventDefault();
    const user = fireAuth.currentUser;
    console.log(user)
    if (user !== null) {
      alert("You Can Buy")
    } else {
      alert("No Account Please Login")
    }
  }
  return (
    <div className={classes.root}>
      <Card className={classes.card}>
        <CardMedia
          className={classes.media}
          image={cardImageUrl}
          title={imageTitle}
          style={{ borderRadius: 7,marginTop:10,marginLeft:3,width:300,height:200}}
        />
        <CardContent className={classes.left}>
          <Typography style={{ marginLeft: 30, fontFamily: "Times New Roman", fontSize: 20 }}>{cardName}</Typography>
          <Typography>-CPU: {cpu}</Typography>
          <Typography>-Operating: {operating}</Typography>
          <Typography>-Memory: {memory} </Typography>
          <Typography>-Hand Disk: {hd}</Typography>
          <Typography>-Optical Drive: {od}</Typography>
          <Typography>-Graphics: {graphics}</Typography>
          <Typography>-Display: {display}</Typography>
          <Typography>-Battery: {battery}</Typography>
          <Typography>-Weight: {weight}</Typography>
          <Typography style={{ color: "red" }}>$ {priceBuy}</Typography>
        </CardContent>
        <CardActions style={{ borderTop: '1px solid black',borderRadius:7}} className={classes.none}>
          <div style={mainstyles}>
            <FavoriteBorderIcon />
            {"  "}
            <AddShoppingCartIcon onClick={handleBuy} />
          </div>
        </CardActions>
      </Card>
    </div>
  );
};

export default CardWidth;