import React,{useState,useEffect,useLayoutEffect} from "react";
import Carousel from 'react-elastic-carousel';
import Card from '../card';
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import next from "next";
import { fireAuth, firestore } from '../../services/firebase'
import CloseIcon from '@mui/icons-material/Close';

const slider = () => {
  const [cart, setCart] = React.useState([]);
  const [data, setData] = React.useState([]);
  const [wish, setWish] = React.useState([]);
  React.useEffect(() => {
    firestore.collection("User")
      .onSnapshot((snapshot) => {
        let data = snapshot.docs.map((doc) => (
          {
            id: doc.id,
            ...doc.data()
          }
        ))

        setData(data)
      })
  }, [])

  const handleDelet = (id) => {
    firestore.collection('User').doc(id).delete()
      .then((result) => {
        console.log("Delet Successfull")
      })
      .catch((err) => {
        console.log(err)
      });
  }
  const handleAddCart = (data) => {
    const user = fireAuth.currentUser;
    if (user !== null) {
      let users = {
        email: user.email,
        card: []
      }
      let newCart = [...cart];
      let itemInCart = newCart.find(
        (item) => data.id === item.id
      );
      if (itemInCart) {
        itemInCart.quantity++;
      } else {
        itemInCart = {
          ...data,
          quantity: 1,
        };
        newCart.push(itemInCart);
      }
      users.card.push(newCart);
      localStorage.setItem("Current_user", JSON.stringify(users))
      setCart(newCart);
    } else {
      alert("No Account Please Login")
    }
  }
  useLayoutEffect(() => {
    if (localStorage.getItem('Products')) {
      setCart(JSON.parse(localStorage.getItem('Products')))
    } else {
      localStorage.setItem('Products', JSON.stringify(cart))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('Products', JSON.stringify(cart))
  }, [cart])
  const handleAddWish = (data) => {
    const user = fireAuth.currentUser;
    if (user !== null) {
      let newCart = [...wish];
      let itemInCart = newCart.find(
        (item) => data.id === item.id
      );
      if (itemInCart) {
        itemInCart.quantity++;
      } else {
        itemInCart = {
          ...data,
          quantity: 1,
        };
        newCart.push(itemInCart);
      }
      setWish(newCart);
    } else {
      alert("No Account Please Login")
    }
  }
  useLayoutEffect(() => {
    if (localStorage.getItem('WishList')) {
      setWish(JSON.parse(localStorage.getItem('WishList')))
    } else {
      localStorage.setItem('WishList', JSON.stringify(wish))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('WishList', JSON.stringify(wish))
  }, [wish])
  const breakPoints = [
    { width: 500, itemsToShow: 1 },
    { width: 700, itemsToShow: 2 },
    { width: 950, itemsToShow: 3 },
    { width: 1200, itemsToShow: 4 },
    { width: 1500, itemsToShow: 5 }
  ]
  return (
    <div style={{ width: '100%' }}>

      <Grid container spacing={0} >
        <div style={{ display: 'flex' }}>
          <h3 style={{ color: "#1A03A6", marginRight: 4 }}>HOT{" "}</h3>
          <h3 style={{ color: '#DE5306' }}>SALE</h3>
        </div>
        <Carousel breakPoints={breakPoints}>
          {data.filter(item => item.type == 13).map((item, index) => {
            return (
              <Grid key={index} item>
                <div style={{
                  width: '100%',
                  display: 'flew',
                  height: 380,
                  margin: '0 20px',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                  <Card
                    cardName={item.name}
                    cardImageUrl={item.url}
                    imageTitle={item.imageTitle}
                    description={item.description}
                    priceBuy={item.price}
                    addToCart={() => handleAddCart(item)}
                    addToWish={() => handleAddWish(item)}
                  />
                </div>
              </Grid>
            );
          })}
        </Carousel>
      </Grid>
      <Grid container spacing={0} >
        <div style={{ display: 'flex' }}>
          <h3 style={{ color: "#1A03A6", marginRight: 4 }}>NEW{" "}</h3>
          <h3 style={{ color: '#DE5306' }}>ARRIVAL</h3>
        </div>
        <Carousel breakPoints={breakPoints}>
          {data.filter(item => item.type == 14).map((item, index) => {
            return (
              <Grid key={index} item>
                <div style={{
                  width: '100%',
                  display: 'flew',
                  height: 380,
                  margin: '0 20px',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                  <Card
                    cardName={item.name}
                    cardImageUrl={item.url}
                    imageTitle={item.imageTitle}
                    description={item.description}
                    priceBuy={item.price}
                    ProductID={item.id}
                    addToCart={() => handleAddCart(item)}
                    addToWish={() => handleAddWish(item)}
                  />
                </div>
              </Grid>
            );
          })}
        </Carousel>
      </Grid>
      <Grid container spacing={0} >
        <div style={{ display: 'flex' }}>
          <h3 style={{ color: "#1A03A6", marginRight: 4 }}>COMING{" "}</h3>
          <h3 style={{ color: '#DE5306' }}>SOON</h3>
        </div>
        <Carousel breakPoints={breakPoints}>
          {data.filter(item => item.type == 15).map((item, index) => {
            return (
              <Grid key={index} item>
                <div style={{
                  width: '100%',
                  display: 'flew',
                  height: 380,
                  margin: '0 20px',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                  <Card
                    cardName={item.name}
                    cardImageUrl={item.url}
                    imageTitle={item.imageTitle}
                    description={item.description}
                    priceBuy={item.price}
                    ProductID={item.id}
                    addToCart={() => handleAddCart(item)}
                    addToWish={() => handleAddWish(item)}
                  />
                </div>
              </Grid>
            );
          })}
        </Carousel>
      </Grid>

    </div>
  );
}

export default slider;