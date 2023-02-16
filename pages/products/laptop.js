import React, { useContext, useState, useEffect, useLayoutEffect } from "react";
import imageBrand from '../../styles/Screenshot 2021-10-22 225621.png'
import Image from 'next/image'
import FormatAlignJustifyOutlinedIcon from '@mui/icons-material/FormatAlignJustifyOutlined';
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined';
import { Link } from "@mui/material";
import CardComponent from "../card";
import { Grid, Paper } from "@material-ui/core"
import Footer from '../../components/presentations/footer'
import { FlashOnOutlined } from "@material-ui/icons";
import CardWidth from '../cardWidth'
import styles from '../../styles/stylesLaptop.module.css'
import CloseIcon from '@mui/icons-material/Close';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Typography from '@mui/material/Typography';
import { firestore, fireAuth } from "../../services/firebase";


const brand = () => {
    const [laptopWidth, setLaptopwidth] = React.useState(false)
    const [data, setData] = React.useState([])
    const [value, setValue] = React.useState(1);
    const [cart, setCart] = React.useState([]);
    const [wish, setWish] = React.useState([]);
    React.useEffect(() => {
        firestore.collection("User")
            .onSnapshot((snapshot) => {
                let data = snapshot.docs.map((doc) => (
                    {
                        ProductID: doc.id,
                        ...doc.data()
                    }
                ))
                setData(data)
            })
    }, [])
    const handleDelet = (ProductID) => {
        firestore.collection('User').doc(ProductID).delete()
            .then((result) => {
                console.log("Delet Successfull")
            })
            .catch((err) => {
                console.log(err)
            });
    }
    const [expanded, setExpanded] = React.useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };
    const changTestDecoration = (e) => {
        e.target.style.textDecoration = 'none';
        e.target.style.color = "#00BFFF";
        e.target.style.borderRadius = '5px';
    }
    const changBackground = (e) => {
        e.target.style.color = "black";
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
                (item) => data.ProductID === item.ProductID
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
            // firestore.collection("UserAdd")
            //     .add({ cart })
            //     .then((res) => {
            //         console.log("Successfull !");
            //     })
            //     .catch((res) => {
            //         console.log("Not Successfull !");
            //     })
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
                (item) => data.ProductID === item.ProductID
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
    React.useEffect(() => {
        const object_product = JSON.parse(localStorage.getItem("Products"))
        for (let i = 0; i < object_product.length; i++) {
            console.log(Number(object_product[i].price) * Number(object_product[i].quantity));
        }
    })
    useEffect(() => {
        localStorage.setItem('WishList', JSON.stringify(wish))
    }, [wish])
    return (
        <div>
            <Grid justifyContent="center" container spacing={0}>
                <Grid item xs={4} >
                    <h1 style={{ fontFamily: 'Times New Roman', fontSize: 25, textAlign: 'center' }}>PRODUCT CATEGORIES</h1>
                    <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')} style={{ width: "80%", marginLeft: 15 }}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1bh-content"
                            id="panel1bh-header"
                        >
                            <Typography sx={{ width: '50%', flexShrink: 0 }}>
                                Notebooks & Tablets
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <div>
                                <Link style={{ color: 'black', fontFamily: 'Times New Roman', fontSize: 19, cursor: 'pointer', }} onMouseOver={changTestDecoration} onMouseOut={changBackground} onClick={() => setValue(1)}>Laptops</Link>
                            </div>
                            <div>
                                <Link style={{ color: 'black', fontFamily: 'Times New Roman', fontSize: 19, cursor: 'pointer', }} onMouseOver={changTestDecoration} onMouseOut={changBackground} onClick={() => setValue(2)}>2-In-1 Laptops</Link>
                            </div>
                            <div>
                                <Link style={{ color: 'black', fontFamily: 'Times New Roman', fontSize: 19, cursor: 'pointer', }} onMouseOver={changTestDecoration} onMouseOut={changBackground} onClick={() => setValue(3)}>Gaming Laptops</Link>
                            </div>
                            <div>
                                <Link style={{ color: 'black', fontFamily: 'Times New Roman', fontSize: 19, cursor: 'pointer', }} onMouseOver={changTestDecoration} onMouseOut={changBackground} onClick={() => setValue(4)}>Macbooks</Link>
                            </div>
                            <div>
                                <Link style={{ color: 'black', fontFamily: 'Times New Roman', fontSize: 19, cursor: 'pointer', }} onMouseOver={changTestDecoration} onMouseOut={changBackground} onClick={() => setValue(5)}>Surfaces</Link>
                            </div>
                            <div>
                                <Link style={{ color: 'black', fontFamily: 'Times New Roman', fontSize: 19, cursor: 'pointer', }} onMouseOver={changTestDecoration} onMouseOut={changBackground} onClick={() => setValue(6)}>Tablets</Link>
                            </div>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')} style={{ width: "80%", marginLeft: 15, marginBottom: 15 }}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel2bh-content"
                            id="panel2bh-header"
                        >
                            <Typography sx={{ width: '55%', flexShrink: 0 }}>Desktops & All-in-One</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <div >
                                <Link style={{ color: 'black', fontFamily: 'Times New Roman', fontSize: 19, cursor: 'pointer', }} onMouseOver={changTestDecoration} onMouseOut={changBackground} onClick={() => setValue(7)}>Brands PC</Link>
                            </div>
                            <div>
                                <Link style={{ color: 'black', fontFamily: 'Times New Roman', fontSize: 19, cursor: 'pointer', }} onMouseOver={changTestDecoration} onMouseOut={changBackground} onClick={() => setValue(8)}>Brands Gaming PC</Link>
                            </div>
                            <div>
                                <Link style={{ color: 'black', fontFamily: 'Times New Roman', fontSize: 19, cursor: 'pointer', }} onMouseOver={changTestDecoration} onMouseOut={changBackground} onClick={() => setValue(9)}>Custom PC</Link>
                            </div>
                            <div>
                                <Link style={{ color: 'black', fontFamily: 'Times New Roman', fontSize: 19, cursor: 'pointer', }} onMouseOver={changTestDecoration} onMouseOut={changBackground} onClick={() => setValue(10)}>Custom Gaming PC</Link>
                            </div>
                            <div>
                                <Link style={{ color: 'black', fontFamily: 'Times New Roman', fontSize: 19, cursor: 'pointer', }} onMouseOver={changTestDecoration} onMouseOut={changBackground} onClick={() => setValue(11)}>All-in-One</Link>
                            </div>
                            <div>
                                <Link style={{ color: 'black', fontFamily: 'Times New Roman', fontSize: 19, cursor: 'pointer', }} onMouseOver={changTestDecoration} onMouseOut={changBackground} onClick={() => setValue(12)}>iMac, iMac Pro</Link>
                            </div>
                            <div>
                                <Link style={{ color: 'black', fontFamily: 'Times New Roman', fontSize: 19, cursor: 'pointer', }} onMouseOver={changTestDecoration} onMouseOut={changBackground} onClick={() => setValue(13)}>Workstations</Link>
                            </div>
                        </AccordionDetails>
                    </Accordion>
                </Grid>
                {
                    value === 1 && (
                        <Grid item xs={8}>
                            {
                                !laptopWidth ?
                                    <Paper style={{ height: "200vh" }}>
                                        <div>
                                            <p style={{ fontFamily: "Times New Roman", fontSize: 20, borderBottom: "1px solid black", marginLeft: 20 }}>Filter by Brand</p>
                                            <div style={{ borderBottom: "1px solid black", marginLeft: 20, cursor: "pointer" }} >
                                                <img src="https://1000logos.net/wp-content/uploads/2016/09/Acer-logo.jpg" width="100" height="90" className={styles.Image}></img>
                                                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAjVBMVEX////mABLlAADzqKrmAAb63N3ueHvpP0P0s7T97u7mAA786ur0ra/mAAvyoaPjAADqUVb2vb774+TxlJboLjTtbG/+9/fvgoX4zc751dbpQkfpPEH1uLnrVlrrXWHqTFDnFh/wjI73ycrnISjwiYvxkpToKC/mEhzufH7tbnHsZGjrW1/xmZv3xMXoNDrzkZdbAAAF+UlEQVR4nO2bDVPiMBCGYW2VVoq0fH8JqKByyv//eZe02U3SFvHOOnc47zPjjE26Sd587G4LtFoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAXT+/qZ9A7qfCOfgZ3JxVS+2dAUHjxQOHlA4WXDxQKsQmg8b8Z59/zWYXxftXXrJ4vTeJnFdKLKZ4H/2ikf8unFV6b4hso/N+AQrkPCv9bmlTIIdOLmUmQk+QXwQcxlY3LlsaUMYWBtBFXDL9Loerj16CTpp3BwekuGc5zFom+47jtpMveK1G5EWWx2nXTtLvrc2WyuCkYujeTKZwPYza81712t+tqq40qTKj/bm2n99wbLYuSMSX0csv170PyjdeOcXpDetlIXrA4ax4cuXCkWwho9WANl8O63dGQQnqc+dbhvrCnTnF9S4+ZW//mNE+bqW/80Fa1ccCX1/ZeujJlkS6jYegbpjV7tRmFNKraH8hT+FiqTqV9eq0a36ta4nWdOgrHpmynb5hUDdcViY0orOvK7CNWGI3L1byKtK0zVutGfb4Qt0L3MrrY2cYuh7LEJhTSob4F7SJY4Ylqp+ESahWJz+2Wx0KpKVE7oH5mVOJcktiAwqQtNtPtaLSTs5FRSeE4dM/Ne+4rhrYgmoXOSiv/8+Q0pIlltHOitb31dua0Oy65mwYUynnJ9kVgkkOpt5pVOL3RlffW4eihkIytu9HVa/FY72QFmYAhDzhKMkVc2ctD6S9pt1Ma+ZcVJntTE0qE4OnNXIVvRTXZEnVk7MFa5yFCVe+45BhwqGldGcfM8idkN7cJESRutvXs5QhfVygtEzcc04B7T0SPdYgyzoFSyHGib6vZgXQoWJh/x3lt8ixji2XtF9aQ56PnDb0BhZHfrtoxA3YRO7ti1gHIEnftPkyp2qCSJTpWuV8eiGGykX/FLuZQkjWrMI5NxT7Je6F5atuYisIxVfvskmxSN4xJ7Nkn0ms+A+Jbh4GcyEdnR9IbD931NV9WSCsrISF6cTOXaEI2p6kuUtceOrcz2YwqoMrw1KBlz85IjkbkGgbzmvlqQKGpyNTufOy6DajklNpnFF6xsdekaeDJKsndMrf+ShIYZ66h7PnX71F4d/BS096G3JzmhEIz6NBXaM6TCvQJJ3vKUXGx3i2s8KF2ahpWaKLfOHJsw2synvWMQuM3o9qBvmgp7GxjObM9J5EIa9fw0KhC2fyW5cKm+GcUslMJHN8g5007UMkId5JY6HBX61RkDo5uQGwgWvhmt1vvSfRjhcGNsdq61RwQ89FLCOBPq/ONKWKuXUMOiE3HQzfXfFjxOwqOjh8qdM6WrEXCQyp2oKwWB0P9YGU3ZGQNg407B19QWHk64fy4NdYZoumNJiZJO6OQ/eOUM6JEUp6n3CRO/GGZIyt7NmWJAXGgGn1N4bD8XQebHx/uJK0ZZq1sc96XWl/ZmqlkIQjUHwvkZSXnBUerePTVenh/qxUrDDcsMCqN/E8VVu+zD2rTfiF6Xfjyezqr0C6iykMPx+PBPoq88HTJg3DRnVkyR3hXGY6WcnloXKF3EsOHqX3IuzoX8fWBcqOMg5Op3zrFksBKFlpm+dUn4Jr7klOdRWocZxS2g/ILHL5fPIg96C0vgV/UGoYVP9GAwnbQrl0I7T3OKmzTsGZ+MrIhLSa33GmmGol1Gld+odiIQuXH0mrFS/4Mf1ah8kuzsmmHvJhtz9jEy1Y2WdmwV31j2oxCNc9rf5jjAXlvE6PTCpXxq7cHwrU/zsDuR78ioYm3/tNj9XXp5xUesrAeGyF67HGyrg38b4WdG4VpmhdlA3um6NfSiMyuFpXXuvRu+nqr1NAhNYZhb1j7Wv/T31Q4+d0/O9Xq4nneX++90rrPTWrK9OWiv9bRtu6F7OlPX4yh7jSp1v6Jws8RB6c6+kbbjw3xfZrLBwovHyi8fKDw8jmt8Of/3uLn/2YGAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgYvgNVyFiZNS+0WoAAAAASUVORK5CYII=" width="100" height="90" className={styles.Image}></img>
                                                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLZIhcOUqe0vNeeSIkDav0zh7QrMpeR1JPpQ&usqp=CAU" width="100" height="90" className={styles.Image}></img>
                                            </div>
                                            <div style={{ float: 'right', marginRight: 40, marginTop: 5, cursor: 'pointer' }}>
                                                <Link style={{ color: 'black' }} onClick={() => setLaptopwidth(false)}><GridViewOutlinedIcon /></Link>
                                                {" "}
                                                <Link style={{ color: 'black' }} onClick={() => setLaptopwidth(true)}><FormatAlignJustifyOutlinedIcon /></Link>
                                            </div>
                                            <Grid container spacing={1} >
                                                {
                                                    data.filter(item => item.type == 0).map((item) => {
                                                        return (
                                                            <Grid item>
                                                                <CardComponent
                                                                    cardName={item.name}
                                                                    cardImageUrl={item.url}
                                                                    imageTitle={item.imageTitle}
                                                                    description={item.description}
                                                                    priceBuy={item.price}
                                                                    ProductID={item.id}
                                                                    addToCart={() => handleAddCart(item)}
                                                                    addToWish={() => handleAddWish(item)}
                                                                />
                                                            </Grid>
                                                        )
                                                    })
                                                }
                                            </Grid>
                                        </div>
                                    </Paper> :
                                    <Paper style={{ height: "200vh" }}>
                                        <div>
                                            <p style={{ fontFamily: "Times New Roman", fontSize: 20, borderBottom: "1px solid black", marginLeft: 20 }}>Filter by Brand</p>
                                            <div style={{ borderBottom: "1px solid black", marginLeft: 20, cursor: "pointer" }}>
                                                <img src="https://1000logos.net/wp-content/uploads/2016/09/Acer-logo.jpg" width="100" height="90" className={styles.Image}></img>
                                                <img src="data:image/png;base64,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" width="100" height="90" className={styles.Image}></img>
                                                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLZIhcOUqe0vNeeSIkDav0zh7QrMpeR1JPpQ&usqp=CAU" width="100" height="90" className={styles.Image}></img>
                                            </div>
                                            <div style={{ float: 'right', marginRight: 40, marginTop: 5, cursor: 'pointer' }}>
                                                <Link style={{ color: 'black' }} onClick={() => setLaptopwidth(false)}><GridViewOutlinedIcon /></Link>
                                                {" "}
                                                <Link style={{ color: 'black' }} onClick={() => setLaptopwidth(true)}><FormatAlignJustifyOutlinedIcon /></Link>
                                            </div>
                                            <Grid container spacing={1} >

                                                {
                                                    data.filter(item => item.type == 0).map((item) => {
                                                        return (
                                                            <Grid item>
                                                                <CardWidth
                                                                    cardName={item.name}
                                                                    cardImageUrl={item.url}
                                                                    imageTitle={item.imageTitle}
                                                                    cpu={item.cpu}
                                                                    operating={item.operating}
                                                                    memory={item.memory}
                                                                    hd={item.hd}
                                                                    graphics={item.graphics}
                                                                    display={item.display}
                                                                    battery={item.battery}
                                                                    weight={item.weight}
                                                                    priceBuy={item.price}
                                                                    ProductID={item.id}
                                                                    addToCart={() => handleAddCart(item)}
                                                                    addToWish={() => handleAddWish(item)}
                                                                />
                                                            </Grid>
                                                        )
                                                    })
                                                }

                                            </Grid>
                                        </div>
                                    </Paper>
                            }
                        </Grid>
                    )
                }
                {
                    value === 2 && (
                        <Grid item xs={8}>
                            {
                                !laptopWidth ?
                                    <Paper style={{ height: "200vh" }}>

                                        <div >
                                            <p style={{ fontFamily: "Times New Roman", fontSize: 20, borderBottom: "1px solid black", marginLeft: 20 }}>Filter by Brand</p>
                                            <div style={{ borderBottom: "1px solid black", marginLeft: 20, cursor: "pointer" }} >
                                                <img src="https://1000logos.net/wp-content/uploads/2016/09/Acer-logo.jpg" width="100" height="90" className={styles.Image}></img>
                                                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAjVBMVEX////mABLlAADzqKrmAAb63N3ueHvpP0P0s7T97u7mAA786ur0ra/mAAvyoaPjAADqUVb2vb774+TxlJboLjTtbG/+9/fvgoX4zc751dbpQkfpPEH1uLnrVlrrXWHqTFDnFh/wjI73ycrnISjwiYvxkpToKC/mEhzufH7tbnHsZGjrW1/xmZv3xMXoNDrzkZdbAAAF+UlEQVR4nO2bDVPiMBCGYW2VVoq0fH8JqKByyv//eZe02U3SFvHOOnc47zPjjE26Sd587G4LtFoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAXT+/qZ9A7qfCOfgZ3JxVS+2dAUHjxQOHlA4WXDxQKsQmg8b8Z59/zWYXxftXXrJ4vTeJnFdKLKZ4H/2ikf8unFV6b4hso/N+AQrkPCv9bmlTIIdOLmUmQk+QXwQcxlY3LlsaUMYWBtBFXDL9Loerj16CTpp3BwekuGc5zFom+47jtpMveK1G5EWWx2nXTtLvrc2WyuCkYujeTKZwPYza81712t+tqq40qTKj/bm2n99wbLYuSMSX0csv170PyjdeOcXpDetlIXrA4ax4cuXCkWwho9WANl8O63dGQQnqc+dbhvrCnTnF9S4+ZW//mNE+bqW/80Fa1ccCX1/ZeujJlkS6jYegbpjV7tRmFNKraH8hT+FiqTqV9eq0a36ta4nWdOgrHpmynb5hUDdcViY0orOvK7CNWGI3L1byKtK0zVutGfb4Qt0L3MrrY2cYuh7LEJhTSob4F7SJY4Ylqp+ESahWJz+2Wx0KpKVE7oH5mVOJcktiAwqQtNtPtaLSTs5FRSeE4dM/Ne+4rhrYgmoXOSiv/8+Q0pIlltHOitb31dua0Oy65mwYUynnJ9kVgkkOpt5pVOL3RlffW4eihkIytu9HVa/FY72QFmYAhDzhKMkVc2ctD6S9pt1Ma+ZcVJntTE0qE4OnNXIVvRTXZEnVk7MFa5yFCVe+45BhwqGldGcfM8idkN7cJESRutvXs5QhfVygtEzcc04B7T0SPdYgyzoFSyHGib6vZgXQoWJh/x3lt8ixji2XtF9aQ56PnDb0BhZHfrtoxA3YRO7ti1gHIEnftPkyp2qCSJTpWuV8eiGGykX/FLuZQkjWrMI5NxT7Je6F5atuYisIxVfvskmxSN4xJ7Nkn0ms+A+Jbh4GcyEdnR9IbD931NV9WSCsrISF6cTOXaEI2p6kuUtceOrcz2YwqoMrw1KBlz85IjkbkGgbzmvlqQKGpyNTufOy6DajklNpnFF6xsdekaeDJKsndMrf+ShIYZ66h7PnX71F4d/BS096G3JzmhEIz6NBXaM6TCvQJJ3vKUXGx3i2s8KF2ahpWaKLfOHJsw2synvWMQuM3o9qBvmgp7GxjObM9J5EIa9fw0KhC2fyW5cKm+GcUslMJHN8g5007UMkId5JY6HBX61RkDo5uQGwgWvhmt1vvSfRjhcGNsdq61RwQ89FLCOBPq/ONKWKuXUMOiE3HQzfXfFjxOwqOjh8qdM6WrEXCQyp2oKwWB0P9YGU3ZGQNg407B19QWHk64fy4NdYZoumNJiZJO6OQ/eOUM6JEUp6n3CRO/GGZIyt7NmWJAXGgGn1N4bD8XQebHx/uJK0ZZq1sc96XWl/ZmqlkIQjUHwvkZSXnBUerePTVenh/qxUrDDcsMCqN/E8VVu+zD2rTfiF6Xfjyezqr0C6iykMPx+PBPoq88HTJg3DRnVkyR3hXGY6WcnloXKF3EsOHqX3IuzoX8fWBcqOMg5Op3zrFksBKFlpm+dUn4Jr7klOdRWocZxS2g/ILHL5fPIg96C0vgV/UGoYVP9GAwnbQrl0I7T3OKmzTsGZ+MrIhLSa33GmmGol1Gld+odiIQuXH0mrFS/4Mf1ah8kuzsmmHvJhtz9jEy1Y2WdmwV31j2oxCNc9rf5jjAXlvE6PTCpXxq7cHwrU/zsDuR78ioYm3/tNj9XXp5xUesrAeGyF67HGyrg38b4WdG4VpmhdlA3um6NfSiMyuFpXXuvRu+nqr1NAhNYZhb1j7Wv/T31Q4+d0/O9Xq4nneX++90rrPTWrK9OWiv9bRtu6F7OlPX4yh7jSp1v6Jws8RB6c6+kbbjw3xfZrLBwovHyi8fKDw8jmt8Of/3uLn/2YGAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgYvgNVyFiZNS+0WoAAAAASUVORK5CYII=" width="100" height="90" className={styles.Image}></img>
                                                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLZIhcOUqe0vNeeSIkDav0zh7QrMpeR1JPpQ&usqp=CAU" width="100" height="90" className={styles.Image}></img>
                                            </div>
                                            <div style={{ float: 'right', marginRight: 40, marginTop: 5, cursor: 'pointer' }}>
                                                <Link style={{ color: 'black' }} onClick={() => setLaptopwidth(false)}><GridViewOutlinedIcon /></Link>
                                                {" "}
                                                <Link style={{ color: 'black' }} onClick={() => setLaptopwidth(true)}><FormatAlignJustifyOutlinedIcon /></Link>
                                            </div>
                                            <Grid container spacing={1} >
                                                {
                                                    data.filter(item => item.type == 1).map((item) => {
                                                        return (
                                                            <Grid item>
                                                                <CardComponent
                                                                    cardName={item.name}
                                                                    cardImageUrl={item.url}
                                                                    imageTitle={item.imageTitle}
                                                                    description={item.description}
                                                                    priceBuy={item.price}
                                                                    ProductID={item.id}
                                                                    addToCart={() => handleAddCart(item)}
                                                                    addToWish={() => handleAddWish(item)}
                                                                />
                                                            </Grid>
                                                        )
                                                    })
                                                }
                                            </Grid>
                                        </div>
                                    </Paper> :
                                    <Paper style={{ height: "200vh" }}>

                                        <div >
                                            <p style={{ fontFamily: "Times New Roman", fontSize: 20, borderBottom: "1px solid black", marginLeft: 20 }}>Filter by Brand</p>
                                            <div style={{ borderBottom: "1px solid black", marginLeft: 20, cursor: "pointer" }}>
                                                <img src="https://1000logos.net/wp-content/uploads/2016/09/Acer-logo.jpg" width="100" height="90" className={styles.Image}></img>
                                                <img src="data:image/png;base64,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" width="100" height="90" className={styles.Image}></img>
                                                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLZIhcOUqe0vNeeSIkDav0zh7QrMpeR1JPpQ&usqp=CAU" width="100" height="90" className={styles.Image}></img>
                                            </div>
                                            <div style={{ float: 'right', marginRight: 40, marginTop: 5, cursor: 'pointer' }}>
                                                <Link style={{ color: 'black' }} onClick={() => setLaptopwidth(false)}><GridViewOutlinedIcon /></Link>
                                                {" "}
                                                <Link style={{ color: 'black' }} onClick={() => setLaptopwidth(true)}><FormatAlignJustifyOutlinedIcon /></Link>
                                            </div>
                                            <Grid container spacing={1} >

                                                {
                                                    data.filter(item => item.type == 1).map((item) => {
                                                        return (
                                                            <Grid item>
                                                                <CardWidth
                                                                    cardName={item.name}
                                                                    cardImageUrl={item.url}
                                                                    imageTitle={item.imageTitle}
                                                                    cpu={item.cpu}
                                                                    operating={item.operating}
                                                                    memory={item.memory}
                                                                    hd={item.hd}
                                                                    graphics={item.graphics}
                                                                    display={item.display}
                                                                    battery={item.battery}
                                                                    weight={item.weight}
                                                                    priceBuy={item.price}
                                                                    ProductID={item.id}
                                                                    addToCart={() => handleAddCart(item)}
                                                                    addToWish={() => handleAddWish(item)}
                                                                />
                                                            </Grid>
                                                        )
                                                    })
                                                }

                                            </Grid>
                                        </div>
                                    </Paper>
                            }
                        </Grid>
                    )
                }
                {
                    value === 3 && (
                        <Grid item xs={8}>
                            {
                                !laptopWidth ?
                                    <Paper style={{ height: "200vh" }}>

                                        <div >
                                            <p style={{ fontFamily: "Times New Roman", fontSize: 20, borderBottom: "1px solid black", marginLeft: 20 }}>Filter by Brand</p>
                                            <div style={{ borderBottom: "1px solid black", marginLeft: 20, cursor: "pointer" }} >
                                                <img src="https://1000logos.net/wp-content/uploads/2016/09/Acer-logo.jpg" width="100" height="90" className={styles.Image}></img>
                                                <img src="data:image/png;base64,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" width="100" height="90" className={styles.Image}></img>
                                                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLZIhcOUqe0vNeeSIkDav0zh7QrMpeR1JPpQ&usqp=CAU" width="100" height="90" className={styles.Image}></img>
                                            </div>
                                            <div style={{ float: 'right', marginRight: 40, marginTop: 5, cursor: 'pointer' }}>
                                                <Link style={{ color: 'black' }} onClick={() => setLaptopwidth(false)}><GridViewOutlinedIcon /></Link>
                                                {" "}
                                                <Link style={{ color: 'black' }} onClick={() => setLaptopwidth(true)}><FormatAlignJustifyOutlinedIcon /></Link>
                                            </div>
                                            <Grid container spacing={1} >
                                                {
                                                    data.filter(item => item.type == 2).map((item) => {
                                                        return (
                                                            <Grid item>
                                                                <CardComponent
                                                                    cardName={item.name}
                                                                    cardImageUrl={item.url}
                                                                    imageTitle={item.imageTitle}
                                                                    description={item.description}
                                                                    priceBuy={item.price}
                                                                    ProductID={item.id}
                                                                    addToCart={() => handleAddCart(item)}
                                                                    addToWish={() => handleAddWish(item)}
                                                                />
                                                            </Grid>
                                                        )
                                                    })
                                                }
                                            </Grid>
                                        </div>
                                    </Paper> :
                                    <Paper style={{ height: "200vh" }}>

                                        <div >
                                            <p style={{ fontFamily: "Times New Roman", fontSize: 20, borderBottom: "1px solid black", marginLeft: 20 }}>Filter by Brand</p>
                                            <div style={{ borderBottom: "1px solid black", marginLeft: 20, cursor: "pointer" }}>
                                                <img src="https://1000logos.net/wp-content/uploads/2016/09/Acer-logo.jpg" width="100" height="90" className={styles.Image}></img>
                                                <img src="data:image/png;base64,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" width="100" height="90" className={styles.Image}></img>
                                                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLZIhcOUqe0vNeeSIkDav0zh7QrMpeR1JPpQ&usqp=CAU" width="100" height="90" className={styles.Image}></img>
                                            </div>
                                            <div style={{ float: 'right', marginRight: 40, marginTop: 5, cursor: 'pointer' }}>
                                                <Link style={{ color: 'black' }} onClick={() => setLaptopwidth(false)}><GridViewOutlinedIcon /></Link>
                                                {" "}
                                                <Link style={{ color: 'black' }} onClick={() => setLaptopwidth(true)}><FormatAlignJustifyOutlinedIcon /></Link>
                                            </div>
                                            <Grid container spacing={1} >

                                                {
                                                    data.filter(item => item.type == 2).map((item) => {
                                                        return (
                                                            <Grid item>
                                                                <CardWidth
                                                                    cardName={item.name}
                                                                    cardImageUrl={item.url}
                                                                    imageTitle={item.imageTitle}
                                                                    cpu={item.cpu}
                                                                    operating={item.operating}
                                                                    memory={item.memory}
                                                                    hd={item.hd}
                                                                    graphics={item.graphics}
                                                                    display={item.display}
                                                                    battery={item.battery}
                                                                    weight={item.weight}
                                                                    priceBuy={item.price}
                                                                    ProductID={item.id}
                                                                    addToCart={() => handleAddCart(item)}
                                                                    addToWish={() => handleAddWish(item)}
                                                                />
                                                            </Grid>
                                                        )
                                                    })
                                                }

                                            </Grid>
                                        </div>
                                    </Paper>
                            }
                        </Grid>
                    )
                }
                {
                    value === 4 && (
                        <Grid item xs={8}>
                            {
                                !laptopWidth ?
                                    <Paper style={{ height: "200vh" }}>

                                        <div >
                                            <p style={{ fontFamily: "Times New Roman", fontSize: 20, borderBottom: "1px solid black", marginLeft: 20 }}>Filter by Brand</p>
                                            <div style={{ borderBottom: "1px solid black", marginLeft: 20, cursor: "pointer" }} >
                                                <img src="https://1000logos.net/wp-content/uploads/2016/09/Acer-logo.jpg" width="100" height="90" className={styles.Image}></img>
                                                <img src="data:image/png;base64,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" width="100" height="90" className={styles.Image}></img>
                                                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLZIhcOUqe0vNeeSIkDav0zh7QrMpeR1JPpQ&usqp=CAU" width="100" height="90" className={styles.Image}></img>
                                            </div>
                                            <div style={{ float: 'right', marginRight: 40, marginTop: 5, cursor: 'pointer' }}>
                                                <Link style={{ color: 'black' }} onClick={() => setLaptopwidth(false)}><GridViewOutlinedIcon /></Link>
                                                {" "}
                                                <Link style={{ color: 'black' }} onClick={() => setLaptopwidth(true)}><FormatAlignJustifyOutlinedIcon /></Link>
                                            </div>
                                            <Grid container spacing={1} >
                                                {
                                                    data.filter(item => item.type == 3).map((item) => {
                                                        return (
                                                            <Grid item>
                                                                <CardComponent
                                                                    cardName={item.name}
                                                                    cardImageUrl={item.url}
                                                                    imageTitle={item.imageTitle}
                                                                    description={item.description}
                                                                    priceBuy={item.price}
                                                                    ProductID={item.id}
                                                                    addToCart={() => handleAddCart(item)}
                                                                    addToWish={() => handleAddWish(item)}
                                                                />
                                                            </Grid>
                                                        )
                                                    })
                                                }
                                            </Grid>
                                        </div>
                                    </Paper> :
                                    <Paper style={{ height: "200vh" }}>

                                        <div >
                                            <p style={{ fontFamily: "Times New Roman", fontSize: 20, borderBottom: "1px solid black", marginLeft: 20 }}>Filter by Brand</p>
                                            <div style={{ borderBottom: "1px solid black", marginLeft: 20, cursor: "pointer" }}>
                                                <img src="https://1000logos.net/wp-content/uploads/2016/09/Acer-logo.jpg" width="100" height="90" className={styles.Image}></img>
                                                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAjVBMVEX////mABLlAADzqKrmAAb63N3ueHvpP0P0s7T97u7mAA786ur0ra/mAAvyoaPjAADqUVb2vb774+TxlJboLjTtbG/+9/fvgoX4zc751dbpQkfpPEH1uLnrVlrrXWHqTFDnFh/wjI73ycrnISjwiYvxkpToKC/mEhzufH7tbnHsZGjrW1/xmZv3xMXoNDrzkZdbAAAF+UlEQVR4nO2bDVPiMBCGYW2VVoq0fH8JqKByyv//eZe02U3SFvHOOnc47zPjjE26Sd587G4LtFoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAXT+/qZ9A7qfCOfgZ3JxVS+2dAUHjxQOHlA4WXDxQKsQmg8b8Z59/zWYXxftXXrJ4vTeJnFdKLKZ4H/2ikf8unFV6b4hso/N+AQrkPCv9bmlTIIdOLmUmQk+QXwQcxlY3LlsaUMYWBtBFXDL9Loerj16CTpp3BwekuGc5zFom+47jtpMveK1G5EWWx2nXTtLvrc2WyuCkYujeTKZwPYza81712t+tqq40qTKj/bm2n99wbLYuSMSX0csv170PyjdeOcXpDetlIXrA4ax4cuXCkWwho9WANl8O63dGQQnqc+dbhvrCnTnF9S4+ZW//mNE+bqW/80Fa1ccCX1/ZeujJlkS6jYegbpjV7tRmFNKraH8hT+FiqTqV9eq0a36ta4nWdOgrHpmynb5hUDdcViY0orOvK7CNWGI3L1byKtK0zVutGfb4Qt0L3MrrY2cYuh7LEJhTSob4F7SJY4Ylqp+ESahWJz+2Wx0KpKVE7oH5mVOJcktiAwqQtNtPtaLSTs5FRSeE4dM/Ne+4rhrYgmoXOSiv/8+Q0pIlltHOitb31dua0Oy65mwYUynnJ9kVgkkOpt5pVOL3RlffW4eihkIytu9HVa/FY72QFmYAhDzhKMkVc2ctD6S9pt1Ma+ZcVJntTE0qE4OnNXIVvRTXZEnVk7MFa5yFCVe+45BhwqGldGcfM8idkN7cJESRutvXs5QhfVygtEzcc04B7T0SPdYgyzoFSyHGib6vZgXQoWJh/x3lt8ixji2XtF9aQ56PnDb0BhZHfrtoxA3YRO7ti1gHIEnftPkyp2qCSJTpWuV8eiGGykX/FLuZQkjWrMI5NxT7Je6F5atuYisIxVfvskmxSN4xJ7Nkn0ms+A+Jbh4GcyEdnR9IbD931NV9WSCsrISF6cTOXaEI2p6kuUtceOrcz2YwqoMrw1KBlz85IjkbkGgbzmvlqQKGpyNTufOy6DajklNpnFF6xsdekaeDJKsndMrf+ShIYZ66h7PnX71F4d/BS096G3JzmhEIz6NBXaM6TCvQJJ3vKUXGx3i2s8KF2ahpWaKLfOHJsw2synvWMQuM3o9qBvmgp7GxjObM9J5EIa9fw0KhC2fyW5cKm+GcUslMJHN8g5007UMkId5JY6HBX61RkDo5uQGwgWvhmt1vvSfRjhcGNsdq61RwQ89FLCOBPq/ONKWKuXUMOiE3HQzfXfFjxOwqOjh8qdM6WrEXCQyp2oKwWB0P9YGU3ZGQNg407B19QWHk64fy4NdYZoumNJiZJO6OQ/eOUM6JEUp6n3CRO/GGZIyt7NmWJAXGgGn1N4bD8XQebHx/uJK0ZZq1sc96XWl/ZmqlkIQjUHwvkZSXnBUerePTVenh/qxUrDDcsMCqN/E8VVu+zD2rTfiF6Xfjyezqr0C6iykMPx+PBPoq88HTJg3DRnVkyR3hXGY6WcnloXKF3EsOHqX3IuzoX8fWBcqOMg5Op3zrFksBKFlpm+dUn4Jr7klOdRWocZxS2g/ILHL5fPIg96C0vgV/UGoYVP9GAwnbQrl0I7T3OKmzTsGZ+MrIhLSa33GmmGol1Gld+odiIQuXH0mrFS/4Mf1ah8kuzsmmHvJhtz9jEy1Y2WdmwV31j2oxCNc9rf5jjAXlvE6PTCpXxq7cHwrU/zsDuR78ioYm3/tNj9XXp5xUesrAeGyF67HGyrg38b4WdG4VpmhdlA3um6NfSiMyuFpXXuvRu+nqr1NAhNYZhb1j7Wv/T31Q4+d0/O9Xq4nneX++90rrPTWrK9OWiv9bRtu6F7OlPX4yh7jSp1v6Jws8RB6c6+kbbjw3xfZrLBwovHyi8fKDw8jmt8Of/3uLn/2YGAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgYvgNVyFiZNS+0WoAAAAASUVORK5CYII=" width="100" height="90" className={styles.Image}></img>
                                                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLZIhcOUqe0vNeeSIkDav0zh7QrMpeR1JPpQ&usqp=CAU" width="100" height="90" className={styles.Image}></img>
                                            </div>
                                            <div style={{ float: 'right', marginRight: 40, marginTop: 5, cursor: 'pointer' }}>
                                                <Link style={{ color: 'black' }} onClick={() => setLaptopwidth(false)}><GridViewOutlinedIcon /></Link>
                                                {" "}
                                                <Link style={{ color: 'black' }} onClick={() => setLaptopwidth(true)}><FormatAlignJustifyOutlinedIcon /></Link>
                                            </div>
                                            <Grid container spacing={1} >

                                                {
                                                    data.filter(item => item.type == 3).map((item) => {
                                                        return (
                                                            <Grid item>
                                                                <CardWidth
                                                                    cardName={item.name}
                                                                    cardImageUrl={item.url}
                                                                    imageTitle={item.imageTitle}
                                                                    cpu={item.cpu}
                                                                    operating={item.operating}
                                                                    memory={item.memory}
                                                                    hd={item.hd}
                                                                    graphics={item.graphics}
                                                                    display={item.display}
                                                                    battery={item.battery}
                                                                    weight={item.weight}
                                                                    priceBuy={item.price}
                                                                    ProductID={item.id}
                                                                    addToCart={() => handleAddCart(item)}
                                                                    addToWish={() => handleAddWish(item)}
                                                                />
                                                            </Grid>
                                                        )
                                                    })
                                                }

                                            </Grid>
                                        </div>
                                    </Paper>
                            }
                        </Grid>
                    )
                }
                {
                    value === 5 && (
                        <Grid item xs={8}>
                            {
                                !laptopWidth ?
                                    <Paper style={{ height: "200vh" }}>

                                        <div >
                                            <p style={{ fontFamily: "Times New Roman", fontSize: 20, borderBottom: "1px solid black", marginLeft: 20 }}>Filter by Brand</p>
                                            <div style={{ borderBottom: "1px solid black", marginLeft: 20, cursor: "pointer" }} >
                                                <img src="https://1000logos.net/wp-content/uploads/2016/09/Acer-logo.jpg" width="100" height="90" className={styles.Image}></img>
                                                <img src="data:image/png;base64,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" width="100" height="90" className={styles.Image}></img>
                                                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLZIhcOUqe0vNeeSIkDav0zh7QrMpeR1JPpQ&usqp=CAU" width="100" height="90" className={styles.Image}></img>
                                            </div>
                                            <div style={{ float: 'right', marginRight: 40, marginTop: 5, cursor: 'pointer' }}>
                                                <Link style={{ color: 'black' }} onClick={() => setLaptopwidth(false)}><GridViewOutlinedIcon /></Link>
                                                {" "}
                                                <Link style={{ color: 'black' }} onClick={() => setLaptopwidth(true)}><FormatAlignJustifyOutlinedIcon /></Link>
                                            </div>
                                            <Grid container spacing={1} >
                                                {
                                                    data.filter(item => item.type == 4).map((item) => {
                                                        return (
                                                            <Grid item>
                                                                <CardComponent
                                                                    cardName={item.name}
                                                                    cardImageUrl={item.url}
                                                                    imageTitle={item.imageTitle}
                                                                    description={item.description}
                                                                    priceBuy={item.price}
                                                                    ProductID={item.id}
                                                                    addToCart={() => handleAddCart(item)}
                                                                    addToWish={() => handleAddWish(item)}
                                                                />
                                                            </Grid>
                                                        )
                                                    })
                                                }
                                            </Grid>
                                        </div>
                                    </Paper> :
                                    <Paper style={{ height: "200vh" }}>

                                        <div >
                                            <p style={{ fontFamily: "Times New Roman", fontSize: 20, borderBottom: "1px solid black", marginLeft: 20 }}>Filter by Brand</p>
                                            <div style={{ borderBottom: "1px solid black", marginLeft: 20, cursor: "pointer" }}>
                                                <img src="https://1000logos.net/wp-content/uploads/2016/09/Acer-logo.jpg" width="100" height="90" className={styles.Image}></img>
                                                <img src="data:image/png;base64,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" width="100" height="90" className={styles.Image}></img>
                                                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLZIhcOUqe0vNeeSIkDav0zh7QrMpeR1JPpQ&usqp=CAU" width="100" height="90" className={styles.Image}></img>
                                            </div>
                                            <div style={{ float: 'right', marginRight: 40, marginTop: 5, cursor: 'pointer' }}>
                                                <Link style={{ color: 'black' }} onClick={() => setLaptopwidth(false)}><GridViewOutlinedIcon /></Link>
                                                {" "}
                                                <Link style={{ color: 'black' }} onClick={() => setLaptopwidth(true)}><FormatAlignJustifyOutlinedIcon /></Link>
                                            </div>
                                            <Grid container spacing={1} >

                                                {
                                                    data.filter(item => item.type == 4).map((item) => {
                                                        return (
                                                            <Grid item>
                                                                <CardWidth
                                                                    cardName={item.name}
                                                                    cardImageUrl={item.url}
                                                                    imageTitle={item.imageTitle}
                                                                    cpu={item.cpu}
                                                                    operating={item.operating}
                                                                    memory={item.memory}
                                                                    hd={item.hd}
                                                                    graphics={item.graphics}
                                                                    display={item.display}
                                                                    battery={item.battery}
                                                                    weight={item.weight}
                                                                    priceBuy={item.price}
                                                                    ProductID={item.id}
                                                                    addToCart={() => handleAddCart(item)}
                                                                    addToWish={() => handleAddWish(item)}
                                                                />
                                                            </Grid>
                                                        )
                                                    })
                                                }

                                            </Grid>
                                        </div>
                                    </Paper>
                            }
                        </Grid>
                    )
                }
                {
                    value === 6 && (
                        <Grid item xs={8}>
                            {
                                !laptopWidth ?
                                    <Paper style={{ height: "200vh" }}>

                                        <div >
                                            <p style={{ fontFamily: "Times New Roman", fontSize: 20, borderBottom: "1px solid black", marginLeft: 20 }}>Filter by Brand</p>
                                            <div style={{ borderBottom: "1px solid black", marginLeft: 20, cursor: "pointer" }} >
                                                <img src="https://1000logos.net/wp-content/uploads/2016/09/Acer-logo.jpg" width="100" height="90" className={styles.Image}></img>
                                                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAjVBMVEX////mABLlAADzqKrmAAb63N3ueHvpP0P0s7T97u7mAA786ur0ra/mAAvyoaPjAADqUVb2vb774+TxlJboLjTtbG/+9/fvgoX4zc751dbpQkfpPEH1uLnrVlrrXWHqTFDnFh/wjI73ycrnISjwiYvxkpToKC/mEhzufH7tbnHsZGjrW1/xmZv3xMXoNDrzkZdbAAAF+UlEQVR4nO2bDVPiMBCGYW2VVoq0fH8JqKByyv//eZe02U3SFvHOOnc47zPjjE26Sd587G4LtFoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAXT+/qZ9A7qfCOfgZ3JxVS+2dAUHjxQOHlA4WXDxQKsQmg8b8Z59/zWYXxftXXrJ4vTeJnFdKLKZ4H/2ikf8unFV6b4hso/N+AQrkPCv9bmlTIIdOLmUmQk+QXwQcxlY3LlsaUMYWBtBFXDL9Loerj16CTpp3BwekuGc5zFom+47jtpMveK1G5EWWx2nXTtLvrc2WyuCkYujeTKZwPYza81712t+tqq40qTKj/bm2n99wbLYuSMSX0csv170PyjdeOcXpDetlIXrA4ax4cuXCkWwho9WANl8O63dGQQnqc+dbhvrCnTnF9S4+ZW//mNE+bqW/80Fa1ccCX1/ZeujJlkS6jYegbpjV7tRmFNKraH8hT+FiqTqV9eq0a36ta4nWdOgrHpmynb5hUDdcViY0orOvK7CNWGI3L1byKtK0zVutGfb4Qt0L3MrrY2cYuh7LEJhTSob4F7SJY4Ylqp+ESahWJz+2Wx0KpKVE7oH5mVOJcktiAwqQtNtPtaLSTs5FRSeE4dM/Ne+4rhrYgmoXOSiv/8+Q0pIlltHOitb31dua0Oy65mwYUynnJ9kVgkkOpt5pVOL3RlffW4eihkIytu9HVa/FY72QFmYAhDzhKMkVc2ctD6S9pt1Ma+ZcVJntTE0qE4OnNXIVvRTXZEnVk7MFa5yFCVe+45BhwqGldGcfM8idkN7cJESRutvXs5QhfVygtEzcc04B7T0SPdYgyzoFSyHGib6vZgXQoWJh/x3lt8ixji2XtF9aQ56PnDb0BhZHfrtoxA3YRO7ti1gHIEnftPkyp2qCSJTpWuV8eiGGykX/FLuZQkjWrMI5NxT7Je6F5atuYisIxVfvskmxSN4xJ7Nkn0ms+A+Jbh4GcyEdnR9IbD931NV9WSCsrISF6cTOXaEI2p6kuUtceOrcz2YwqoMrw1KBlz85IjkbkGgbzmvlqQKGpyNTufOy6DajklNpnFF6xsdekaeDJKsndMrf+ShIYZ66h7PnX71F4d/BS096G3JzmhEIz6NBXaM6TCvQJJ3vKUXGx3i2s8KF2ahpWaKLfOHJsw2synvWMQuM3o9qBvmgp7GxjObM9J5EIa9fw0KhC2fyW5cKm+GcUslMJHN8g5007UMkId5JY6HBX61RkDo5uQGwgWvhmt1vvSfRjhcGNsdq61RwQ89FLCOBPq/ONKWKuXUMOiE3HQzfXfFjxOwqOjh8qdM6WrEXCQyp2oKwWB0P9YGU3ZGQNg407B19QWHk64fy4NdYZoumNJiZJO6OQ/eOUM6JEUp6n3CRO/GGZIyt7NmWJAXGgGn1N4bD8XQebHx/uJK0ZZq1sc96XWl/ZmqlkIQjUHwvkZSXnBUerePTVenh/qxUrDDcsMCqN/E8VVu+zD2rTfiF6Xfjyezqr0C6iykMPx+PBPoq88HTJg3DRnVkyR3hXGY6WcnloXKF3EsOHqX3IuzoX8fWBcqOMg5Op3zrFksBKFlpm+dUn4Jr7klOdRWocZxS2g/ILHL5fPIg96C0vgV/UGoYVP9GAwnbQrl0I7T3OKmzTsGZ+MrIhLSa33GmmGol1Gld+odiIQuXH0mrFS/4Mf1ah8kuzsmmHvJhtz9jEy1Y2WdmwV31j2oxCNc9rf5jjAXlvE6PTCpXxq7cHwrU/zsDuR78ioYm3/tNj9XXp5xUesrAeGyF67HGyrg38b4WdG4VpmhdlA3um6NfSiMyuFpXXuvRu+nqr1NAhNYZhb1j7Wv/T31Q4+d0/O9Xq4nneX++90rrPTWrK9OWiv9bRtu6F7OlPX4yh7jSp1v6Jws8RB6c6+kbbjw3xfZrLBwovHyi8fKDw8jmt8Of/3uLn/2YGAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgYvgNVyFiZNS+0WoAAAAASUVORK5CYII=" width="100" height="90" className={styles.Image}></img>
                                                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLZIhcOUqe0vNeeSIkDav0zh7QrMpeR1JPpQ&usqp=CAU" width="100" height="90" className={styles.Image}></img>
                                            </div>
                                            <div style={{ float: 'right', marginRight: 40, marginTop: 5, cursor: 'pointer' }}>
                                                <Link style={{ color: 'black' }} onClick={() => setLaptopwidth(false)}><GridViewOutlinedIcon /></Link>
                                                {" "}
                                                <Link style={{ color: 'black' }} onClick={() => setLaptopwidth(true)}><FormatAlignJustifyOutlinedIcon /></Link>
                                            </div>
                                            <Grid container spacing={1} >
                                                {
                                                    data.filter(item => item.type == 5).map((item) => {
                                                        return (
                                                            <Grid item>
                                                                <CardComponent
                                                                    cardName={item.name}
                                                                    cardImageUrl={item.url}
                                                                    imageTitle={item.imageTitle}
                                                                    description={item.description}
                                                                    priceBuy={item.price}
                                                                    ProductID={item.id}
                                                                    addToCart={() => handleAddCart(item)}
                                                                    addToWish={() => handleAddWish(item)}
                                                                />
                                                            </Grid>
                                                        )
                                                    })
                                                }
                                            </Grid>
                                        </div>
                                    </Paper> :
                                    <Paper style={{ height: "200vh" }}>

                                        <div >
                                            <p style={{ fontFamily: "Times New Roman", fontSize: 20, borderBottom: "1px solid black", marginLeft: 20 }}>Filter by Brand</p>
                                            <div style={{ borderBottom: "1px solid black", marginLeft: 20, cursor: "pointer" }}>
                                                <img src="https://1000logos.net/wp-content/uploads/2016/09/Acer-logo.jpg" width="100" height="90" className={styles.Image}></img>
                                                <img src="data:image/png;base64,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" width="100" height="90" className={styles.Image}></img>
                                                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLZIhcOUqe0vNeeSIkDav0zh7QrMpeR1JPpQ&usqp=CAU" width="100" height="90" className={styles.Image}></img>
                                            </div>
                                            <div style={{ float: 'right', marginRight: 40, marginTop: 5, cursor: 'pointer' }}>
                                                <Link style={{ color: 'black' }} onClick={() => setLaptopwidth(false)}><GridViewOutlinedIcon /></Link>
                                                {" "}
                                                <Link style={{ color: 'black' }} onClick={() => setLaptopwidth(true)}><FormatAlignJustifyOutlinedIcon /></Link>
                                            </div>
                                            <Grid container spacing={1} >

                                                {
                                                    data.filter(item => item.type == 5).map((item) => {
                                                        return (
                                                            <Grid item>
                                                                <CardWidth
                                                                    cardName={item.name}
                                                                    cardImageUrl={item.url}
                                                                    imageTitle={item.imageTitle}
                                                                    cpu={item.cpu}
                                                                    operating={item.operating}
                                                                    memory={item.memory}
                                                                    hd={item.hd}
                                                                    graphics={item.graphics}
                                                                    display={item.display}
                                                                    battery={item.battery}
                                                                    weight={item.weight}
                                                                    priceBuy={item.price}
                                                                    ProductID={item.id}
                                                                    addToCart={() => handleAddCart(item)}
                                                                    addToWish={() => handleAddWish(item)}
                                                                />
                                                            </Grid>
                                                        )
                                                    })
                                                }

                                            </Grid>
                                        </div>
                                    </Paper>
                            }
                        </Grid>
                    )
                }
                {
                    value === 7 && (
                        <Grid item xs={8}>
                            {
                                !laptopWidth ?
                                    <Paper style={{ height: "200vh" }}>

                                        <div >
                                            <p style={{ fontFamily: "Times New Roman", fontSize: 20, borderBottom: "1px solid black", marginLeft: 20 }}>Filter by Brand</p>
                                            <div style={{ borderBottom: "1px solid black", marginLeft: 20, cursor: "pointer" }} >
                                                <img src="https://1000logos.net/wp-content/uploads/2016/09/Acer-logo.jpg" width="100" height="90" className={styles.Image}></img>
                                                <img src="data:image/png;base64,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" width="100" height="90" className={styles.Image}></img>
                                                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLZIhcOUqe0vNeeSIkDav0zh7QrMpeR1JPpQ&usqp=CAU" width="100" height="90" className={styles.Image}></img>
                                            </div>
                                            <div style={{ float: 'right', marginRight: 40, marginTop: 5, cursor: 'pointer' }}>
                                                <Link style={{ color: 'black' }} onClick={() => setLaptopwidth(false)}><GridViewOutlinedIcon /></Link>
                                                {" "}
                                                <Link style={{ color: 'black' }} onClick={() => setLaptopwidth(true)}><FormatAlignJustifyOutlinedIcon /></Link>
                                            </div>
                                            <Grid container spacing={1} >
                                                {
                                                    data.filter(item => item.type == 6).map((item) => {
                                                        return (
                                                            <Grid item>
                                                                <CardComponent
                                                                    cardName={item.name}
                                                                    cardImageUrl={item.url}
                                                                    imageTitle={item.imageTitle}
                                                                    description={item.description}
                                                                    priceBuy={item.price}
                                                                    ProductID={item.id}
                                                                    addToCart={() => handleAddCart(item)}
                                                                    addToWish={() => handleAddWish(item)}
                                                                />
                                                            </Grid>
                                                        )
                                                    })
                                                }
                                            </Grid>
                                        </div>
                                    </Paper> :
                                    <Paper style={{ height: "200vh" }}>

                                        <div >
                                            <p style={{ fontFamily: "Times New Roman", fontSize: 20, borderBottom: "1px solid black", marginLeft: 20 }}>Filter by Brand</p>
                                            <div style={{ borderBottom: "1px solid black", marginLeft: 20, cursor: "pointer" }}>
                                                <img src="https://1000logos.net/wp-content/uploads/2016/09/Acer-logo.jpg" width="100" height="90" className={styles.Image}></img>
                                                <img src="data:image/png;base64,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" width="100" height="90" className={styles.Image}></img>
                                                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLZIhcOUqe0vNeeSIkDav0zh7QrMpeR1JPpQ&usqp=CAU" width="100" height="90" className={styles.Image}></img>
                                            </div>
                                            <div style={{ float: 'right', marginRight: 40, marginTop: 5, cursor: 'pointer' }}>
                                                <Link style={{ color: 'black' }} onClick={() => setLaptopwidth(false)}><GridViewOutlinedIcon /></Link>
                                                {" "}
                                                <Link style={{ color: 'black' }} onClick={() => setLaptopwidth(true)}><FormatAlignJustifyOutlinedIcon /></Link>
                                            </div>
                                            <Grid container spacing={1} >

                                                {
                                                    data.filter(item => item.type == 6).map((item) => {
                                                        return (
                                                            <Grid item>
                                                                <CardWidth
                                                                    cardName={item.name}
                                                                    cardImageUrl={item.url}
                                                                    imageTitle={item.imageTitle}
                                                                    cpu={item.cpu}
                                                                    operating={item.operating}
                                                                    memory={item.memory}
                                                                    hd={item.hd}
                                                                    graphics={item.graphics}
                                                                    display={item.display}
                                                                    battery={item.battery}
                                                                    weight={item.weight}
                                                                    priceBuy={item.price}
                                                                    ProductID={item.id}
                                                                    addToCart={() => handleAddCart(item)}
                                                                    addToWish={() => handleAddWish(item)}
                                                                />
                                                            </Grid>
                                                        )
                                                    })
                                                }

                                            </Grid>
                                        </div>
                                    </Paper>
                            }
                        </Grid>
                    )
                }
                {
                    value === 8 && (
                        <Grid item xs={8}>
                            {
                                !laptopWidth ?
                                    <Paper style={{ height: "200vh" }}>

                                        <div>
                                            <p style={{ fontFamily: "Times New Roman", fontSize: 20, borderBottom: "1px solid black", marginLeft: 20 }}>Filter by Brand</p>
                                            <div style={{ borderBottom: "1px solid black", marginLeft: 20, cursor: "pointer" }} >
                                                <img src="https://1000logos.net/wp-content/uploads/2016/09/Acer-logo.jpg" width="100" height="90" className={styles.Image}></img>
                                                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAjVBMVEX////mABLlAADzqKrmAAb63N3ueHvpP0P0s7T97u7mAA786ur0ra/mAAvyoaPjAADqUVb2vb774+TxlJboLjTtbG/+9/fvgoX4zc751dbpQkfpPEH1uLnrVlrrXWHqTFDnFh/wjI73ycrnISjwiYvxkpToKC/mEhzufH7tbnHsZGjrW1/xmZv3xMXoNDrzkZdbAAAF+UlEQVR4nO2bDVPiMBCGYW2VVoq0fH8JqKByyv//eZe02U3SFvHOOnc47zPjjE26Sd587G4LtFoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAXT+/qZ9A7qfCOfgZ3JxVS+2dAUHjxQOHlA4WXDxQKsQmg8b8Z59/zWYXxftXXrJ4vTeJnFdKLKZ4H/2ikf8unFV6b4hso/N+AQrkPCv9bmlTIIdOLmUmQk+QXwQcxlY3LlsaUMYWBtBFXDL9Loerj16CTpp3BwekuGc5zFom+47jtpMveK1G5EWWx2nXTtLvrc2WyuCkYujeTKZwPYza81712t+tqq40qTKj/bm2n99wbLYuSMSX0csv170PyjdeOcXpDetlIXrA4ax4cuXCkWwho9WANl8O63dGQQnqc+dbhvrCnTnF9S4+ZW//mNE+bqW/80Fa1ccCX1/ZeujJlkS6jYegbpjV7tRmFNKraH8hT+FiqTqV9eq0a36ta4nWdOgrHpmynb5hUDdcViY0orOvK7CNWGI3L1byKtK0zVutGfb4Qt0L3MrrY2cYuh7LEJhTSob4F7SJY4Ylqp+ESahWJz+2Wx0KpKVE7oH5mVOJcktiAwqQtNtPtaLSTs5FRSeE4dM/Ne+4rhrYgmoXOSiv/8+Q0pIlltHOitb31dua0Oy65mwYUynnJ9kVgkkOpt5pVOL3RlffW4eihkIytu9HVa/FY72QFmYAhDzhKMkVc2ctD6S9pt1Ma+ZcVJntTE0qE4OnNXIVvRTXZEnVk7MFa5yFCVe+45BhwqGldGcfM8idkN7cJESRutvXs5QhfVygtEzcc04B7T0SPdYgyzoFSyHGib6vZgXQoWJh/x3lt8ixji2XtF9aQ56PnDb0BhZHfrtoxA3YRO7ti1gHIEnftPkyp2qCSJTpWuV8eiGGykX/FLuZQkjWrMI5NxT7Je6F5atuYisIxVfvskmxSN4xJ7Nkn0ms+A+Jbh4GcyEdnR9IbD931NV9WSCsrISF6cTOXaEI2p6kuUtceOrcz2YwqoMrw1KBlz85IjkbkGgbzmvlqQKGpyNTufOy6DajklNpnFF6xsdekaeDJKsndMrf+ShIYZ66h7PnX71F4d/BS096G3JzmhEIz6NBXaM6TCvQJJ3vKUXGx3i2s8KF2ahpWaKLfOHJsw2synvWMQuM3o9qBvmgp7GxjObM9J5EIa9fw0KhC2fyW5cKm+GcUslMJHN8g5007UMkId5JY6HBX61RkDo5uQGwgWvhmt1vvSfRjhcGNsdq61RwQ89FLCOBPq/ONKWKuXUMOiE3HQzfXfFjxOwqOjh8qdM6WrEXCQyp2oKwWB0P9YGU3ZGQNg407B19QWHk64fy4NdYZoumNJiZJO6OQ/eOUM6JEUp6n3CRO/GGZIyt7NmWJAXGgGn1N4bD8XQebHx/uJK0ZZq1sc96XWl/ZmqlkIQjUHwvkZSXnBUerePTVenh/qxUrDDcsMCqN/E8VVu+zD2rTfiF6Xfjyezqr0C6iykMPx+PBPoq88HTJg3DRnVkyR3hXGY6WcnloXKF3EsOHqX3IuzoX8fWBcqOMg5Op3zrFksBKFlpm+dUn4Jr7klOdRWocZxS2g/ILHL5fPIg96C0vgV/UGoYVP9GAwnbQrl0I7T3OKmzTsGZ+MrIhLSa33GmmGol1Gld+odiIQuXH0mrFS/4Mf1ah8kuzsmmHvJhtz9jEy1Y2WdmwV31j2oxCNc9rf5jjAXlvE6PTCpXxq7cHwrU/zsDuR78ioYm3/tNj9XXp5xUesrAeGyF67HGyrg38b4WdG4VpmhdlA3um6NfSiMyuFpXXuvRu+nqr1NAhNYZhb1j7Wv/T31Q4+d0/O9Xq4nneX++90rrPTWrK9OWiv9bRtu6F7OlPX4yh7jSp1v6Jws8RB6c6+kbbjw3xfZrLBwovHyi8fKDw8jmt8Of/3uLn/2YGAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgYvgNVyFiZNS+0WoAAAAASUVORK5CYII=" width="100" height="90" className={styles.Image}></img>
                                                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLZIhcOUqe0vNeeSIkDav0zh7QrMpeR1JPpQ&usqp=CAU" width="100" height="90" className={styles.Image}></img>
                                            </div>
                                            <div style={{ float: 'right', marginRight: 40, marginTop: 5, cursor: 'pointer' }}>
                                                <Link style={{ color: 'black' }} onClick={() => setLaptopwidth(false)}><GridViewOutlinedIcon /></Link>
                                                {" "}
                                                <Link style={{ color: 'black' }} onClick={() => setLaptopwidth(true)}><FormatAlignJustifyOutlinedIcon /></Link>
                                            </div>
                                            <Grid container spacing={1} >
                                                {
                                                    data.filter(item => item.type == 7).map((item) => {
                                                        return (
                                                            <Grid item>
                                                                <CardComponent
                                                                    cardName={item.name}
                                                                    cardImageUrl={item.url}
                                                                    imageTitle={item.imageTitle}
                                                                    description={item.description}
                                                                    priceBuy={item.price}
                                                                    ProductID={item.id}
                                                                    addToCart={() => handleAddCart(item)}
                                                                    addToWish={() => handleAddWish(item)}
                                                                />
                                                            </Grid>
                                                        )
                                                    })
                                                }
                                            </Grid>
                                        </div>
                                    </Paper> :
                                    <Paper style={{ height: "200vh" }}>

                                        <div>
                                            <p style={{ fontFamily: "Times New Roman", fontSize: 20, borderBottom: "1px solid black", marginLeft: 20 }}>Filter by Brand</p>
                                            <div style={{ borderBottom: "1px solid black", marginLeft: 20, cursor: "pointer" }}>
                                                <img src="https://1000logos.net/wp-content/uploads/2016/09/Acer-logo.jpg" width="100" height="90" className={styles.Image}></img>
                                                <img src="data:image/png;base64,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" width="100" height="90" className={styles.Image}></img>
                                                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLZIhcOUqe0vNeeSIkDav0zh7QrMpeR1JPpQ&usqp=CAU" width="100" height="90" className={styles.Image}></img>
                                            </div>
                                            <div style={{ float: 'right', marginRight: 40, marginTop: 5, cursor: 'pointer' }}>
                                                <Link style={{ color: 'black' }} onClick={() => setLaptopwidth(false)}><GridViewOutlinedIcon /></Link>
                                                {" "}
                                                <Link style={{ color: 'black' }} onClick={() => setLaptopwidth(true)}><FormatAlignJustifyOutlinedIcon /></Link>
                                            </div>
                                            <Grid container spacing={1} >

                                                {
                                                    data.filter(item => item.type == 7).map((item) => {
                                                        return (
                                                            <Grid item>
                                                                <CardWidth
                                                                    cardName={item.name}
                                                                    cardImageUrl={item.url}
                                                                    imageTitle={item.imageTitle}
                                                                    cpu={item.cpu}
                                                                    operating={item.operating}
                                                                    memory={item.memory}
                                                                    hd={item.hd}
                                                                    graphics={item.graphics}
                                                                    display={item.display}
                                                                    battery={item.battery}
                                                                    weight={item.weight}
                                                                    priceBuy={item.price}
                                                                    ProductID={item.id}
                                                                    addToCart={() => handleAddCart(item)}
                                                                    addToWish={() => handleAddWish(item)}
                                                                />
                                                            </Grid>
                                                        )
                                                    })
                                                }

                                            </Grid>
                                        </div>
                                    </Paper>
                            }
                        </Grid>
                    )
                }
                {
                    value === 9 && (
                        <Grid item xs={8}>
                            {
                                !laptopWidth ?
                                    <Paper style={{ height: "200vh" }}>

                                        <div>
                                            <p style={{ fontFamily: "Times New Roman", fontSize: 20, borderBottom: "1px solid black", marginLeft: 20 }}>Filter by Brand</p>
                                            <div style={{ borderBottom: "1px solid black", marginLeft: 20, cursor: "pointer" }} >
                                                <img src="https://1000logos.net/wp-content/uploads/2016/09/Acer-logo.jpg" width="100" height="90" className={styles.Image}></img>
                                                <img src="data:image/png;base64,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" width="100" height="90" className={styles.Image}></img>
                                                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLZIhcOUqe0vNeeSIkDav0zh7QrMpeR1JPpQ&usqp=CAU" width="100" height="90" className={styles.Image}></img>
                                            </div>
                                            <div style={{ float: 'right', marginRight: 40, marginTop: 5, cursor: 'pointer' }}>
                                                <Link style={{ color: 'black' }} onClick={() => setLaptopwidth(false)}><GridViewOutlinedIcon /></Link>
                                                {" "}
                                                <Link style={{ color: 'black' }} onClick={() => setLaptopwidth(true)}><FormatAlignJustifyOutlinedIcon /></Link>
                                            </div>
                                            <Grid container spacing={1} >
                                                {
                                                    data.filter(item => item.type == 8).map((item) => {
                                                        return (
                                                            <Grid item>
                                                                <CardComponent
                                                                    cardName={item.name}
                                                                    cardImageUrl={item.url}
                                                                    imageTitle={item.imageTitle}
                                                                    description={item.description}
                                                                    priceBuy={item.price}
                                                                    ProductID={item.id}
                                                                    addToCart={() => handleAddCart(item)}
                                                                    addToWish={() => handleAddWish(item)}
                                                                />
                                                            </Grid>
                                                        )
                                                    })
                                                }
                                            </Grid>
                                        </div>
                                    </Paper> :
                                    <Paper style={{ height: "200vh" }}>

                                        <div>
                                            <p style={{ fontFamily: "Times New Roman", fontSize: 20, borderBottom: "1px solid black", marginLeft: 20 }}>Filter by Brand</p>
                                            <div style={{ borderBottom: "1px solid black", marginLeft: 20, cursor: "pointer" }}>
                                                <img src="https://1000logos.net/wp-content/uploads/2016/09/Acer-logo.jpg" width="100" height="90" className={styles.Image}></img>
                                                <img src="data:image/png;base64,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" width="100" height="90" className={styles.Image}></img>
                                                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLZIhcOUqe0vNeeSIkDav0zh7QrMpeR1JPpQ&usqp=CAU" width="100" height="90" className={styles.Image}></img>
                                            </div>
                                            <div style={{ float: 'right', marginRight: 40, marginTop: 5, cursor: 'pointer' }}>
                                                <Link style={{ color: 'black' }} onClick={() => setLaptopwidth(false)}><GridViewOutlinedIcon /></Link>
                                                {" "}
                                                <Link style={{ color: 'black' }} onClick={() => setLaptopwidth(true)}><FormatAlignJustifyOutlinedIcon /></Link>
                                            </div>
                                            <Grid container spacing={1} >

                                                {
                                                    data.filter(item => item.type == 8).map((item) => {
                                                        return (
                                                            <Grid item>
                                                                <CardWidth
                                                                    cardName={item.name}
                                                                    cardImageUrl={item.url}
                                                                    imageTitle={item.imageTitle}
                                                                    cpu={item.cpu}
                                                                    operating={item.operating}
                                                                    memory={item.memory}
                                                                    hd={item.hd}
                                                                    graphics={item.graphics}
                                                                    display={item.display}
                                                                    battery={item.battery}
                                                                    weight={item.weight}
                                                                    priceBuy={item.price}
                                                                    ProductID={item.id}
                                                                    addToCart={() => handleAddCart(item)}
                                                                    addToWish={() => handleAddWish(item)}
                                                                />
                                                            </Grid>
                                                        )
                                                    })
                                                }

                                            </Grid>
                                        </div>
                                    </Paper>
                            }
                        </Grid>
                    )
                }
                {
                    value === 10 && (
                        <Grid item xs={8}>
                            {
                                !laptopWidth ?
                                    <Paper style={{ height: "200vh" }}>

                                        <div>
                                            <p style={{ fontFamily: "Times New Roman", fontSize: 20, borderBottom: "1px solid black", marginLeft: 20 }}>Filter by Brand</p>
                                            <div style={{ borderBottom: "1px solid black", marginLeft: 20, cursor: "pointer" }} >
                                                <img src="https://1000logos.net/wp-content/uploads/2016/09/Acer-logo.jpg" width="100" height="90" className={styles.Image}></img>
                                                <img src="data:image/png;base64,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" width="100" height="90" className={styles.Image}></img>
                                                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLZIhcOUqe0vNeeSIkDav0zh7QrMpeR1JPpQ&usqp=CAU" width="100" height="90" className={styles.Image}></img>
                                            </div>
                                            <div style={{ float: 'right', marginRight: 40, marginTop: 5, cursor: 'pointer' }}>
                                                <Link style={{ color: 'black' }} onClick={() => setLaptopwidth(false)}><GridViewOutlinedIcon /></Link>
                                                {" "}
                                                <Link style={{ color: 'black' }} onClick={() => setLaptopwidth(true)}><FormatAlignJustifyOutlinedIcon /></Link>
                                            </div>
                                            <Grid container spacing={1} >
                                                {
                                                    data.filter(item => item.type == 9).map((item) => {
                                                        return (
                                                            <Grid item>
                                                                <CardComponent
                                                                    cardName={item.name}
                                                                    cardImageUrl={item.url}
                                                                    imageTitle={item.imageTitle}
                                                                    description={item.description}
                                                                    priceBuy={item.price}
                                                                    ProductID={item.id}
                                                                    addToCart={() => handleAddCart(item)}
                                                                    addToWish={() => handleAddWish(item)}
                                                                />
                                                            </Grid>
                                                        )
                                                    })
                                                }
                                            </Grid>
                                        </div>
                                    </Paper> :
                                    <Paper style={{ height: "200vh" }}>

                                        <div>
                                            <p style={{ fontFamily: "Times New Roman", fontSize: 20, borderBottom: "1px solid black", marginLeft: 20 }}>Filter by Brand</p>
                                            <div style={{ borderBottom: "1px solid black", marginLeft: 20, cursor: "pointer" }}>
                                                <img src="https://1000logos.net/wp-content/uploads/2016/09/Acer-logo.jpg" width="100" height="90" className={styles.Image}></img>
                                                <img src="data:image/png;base64,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" width="100" height="90" className={styles.Image}></img>
                                                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLZIhcOUqe0vNeeSIkDav0zh7QrMpeR1JPpQ&usqp=CAU" width="100" height="90" className={styles.Image}></img>
                                            </div>
                                            <div style={{ float: 'right', marginRight: 40, marginTop: 5, cursor: 'pointer' }}>
                                                <Link style={{ color: 'black' }} onClick={() => setLaptopwidth(false)}><GridViewOutlinedIcon /></Link>
                                                {" "}
                                                <Link style={{ color: 'black' }} onClick={() => setLaptopwidth(true)}><FormatAlignJustifyOutlinedIcon /></Link>
                                            </div>
                                            <Grid container spacing={1} >

                                                {
                                                    data.filter(item => item.type == 9).map((item) => {
                                                        return (
                                                            <Grid item>
                                                                <CardWidth
                                                                    cardName={item.name}
                                                                    cardImageUrl={item.url}
                                                                    imageTitle={item.imageTitle}
                                                                    cpu={item.cpu}
                                                                    operating={item.operating}
                                                                    memory={item.memory}
                                                                    hd={item.hd}
                                                                    graphics={item.graphics}
                                                                    display={item.display}
                                                                    battery={item.battery}
                                                                    weight={item.weight}
                                                                    priceBuy={item.price}
                                                                    ProductID={item.id}
                                                                    addToCart={() => handleAddCart(item)}
                                                                    addToWish={() => handleAddWish(item)}
                                                                />
                                                            </Grid>
                                                        )
                                                    })
                                                }

                                            </Grid>
                                        </div>
                                    </Paper>
                            }
                        </Grid>
                    )
                }
                {
                    value === 11 && (
                        <Grid item xs={8}>
                            {
                                !laptopWidth ?
                                    <Paper style={{ height: "200vh" }}>

                                        <div>
                                            <p style={{ fontFamily: "Times New Roman", fontSize: 20, borderBottom: "1px solid black", marginLeft: 20 }}>Filter by Brand</p>
                                            <div style={{ borderBottom: "1px solid black", marginLeft: 20, cursor: "pointer" }} >
                                                <img src="https://1000logos.net/wp-content/uploads/2016/09/Acer-logo.jpg" width="100" height="90" className={styles.Image}></img>
                                                <img src="data:image/png;base64,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" width="100" height="90" className={styles.Image}></img>
                                                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLZIhcOUqe0vNeeSIkDav0zh7QrMpeR1JPpQ&usqp=CAU" width="100" height="90" className={styles.Image}></img>
                                            </div>
                                            <div style={{ float: 'right', marginRight: 40, marginTop: 5, cursor: 'pointer' }}>
                                                <Link style={{ color: 'black' }} onClick={() => setLaptopwidth(false)}><GridViewOutlinedIcon /></Link>
                                                {" "}
                                                <Link style={{ color: 'black' }} onClick={() => setLaptopwidth(true)}><FormatAlignJustifyOutlinedIcon /></Link>
                                            </div>
                                            <Grid container spacing={1} >
                                                {
                                                    data.filter(item => item.type == 10).map((item) => {
                                                        return (
                                                            <Grid item>
                                                                <CardComponent
                                                                    cardName={item.name}
                                                                    cardImageUrl={item.url}
                                                                    imageTitle={item.imageTitle}
                                                                    description={item.description}
                                                                    priceBuy={item.price}
                                                                    ProductID={item.id}
                                                                    addToCart={() => handleAddCart(item)}
                                                                    addToWish={() => handleAddWish(item)}
                                                                />
                                                            </Grid>
                                                        )
                                                    })
                                                }
                                            </Grid>
                                        </div>
                                    </Paper> :
                                    <Paper style={{ height: "200vh" }}>

                                        <div>
                                            <p style={{ fontFamily: "Times New Roman", fontSize: 20, borderBottom: "1px solid black", marginLeft: 20 }}>Filter by Brand</p>
                                            <div style={{ borderBottom: "1px solid black", marginLeft: 20, cursor: "pointer" }}>
                                                <img src="https://1000logos.net/wp-content/uploads/2016/09/Acer-logo.jpg" width="100" height="90" className={styles.Image}></img>
                                                <img src="data:image/png;base64,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" width="100" height="90" className={styles.Image}></img>
                                                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLZIhcOUqe0vNeeSIkDav0zh7QrMpeR1JPpQ&usqp=CAU" width="100" height="90" className={styles.Image}></img>
                                            </div>
                                            <div style={{ float: 'right', marginRight: 40, marginTop: 5, cursor: 'pointer' }}>
                                                <Link style={{ color: 'black' }} onClick={() => setLaptopwidth(false)}><GridViewOutlinedIcon /></Link>
                                                {" "}
                                                <Link style={{ color: 'black' }} onClick={() => setLaptopwidth(true)}><FormatAlignJustifyOutlinedIcon /></Link>
                                            </div>
                                            <Grid container spacing={1} >

                                                {
                                                    data.filter(item => item.type == 10).map((item) => {
                                                        return (
                                                            <Grid item>
                                                                <CardWidth
                                                                    cardName={item.name}
                                                                    cardImageUrl={item.url}
                                                                    imageTitle={item.imageTitle}
                                                                    cpu={item.cpu}
                                                                    operating={item.operating}
                                                                    memory={item.memory}
                                                                    hd={item.hd}
                                                                    graphics={item.graphics}
                                                                    display={item.display}
                                                                    battery={item.battery}
                                                                    weight={item.weight}
                                                                    priceBuy={item.price}
                                                                    ProductID={item.id}
                                                                    addToCart={() => handleAddCart(item)}
                                                                    addToWish={() => handleAddWish(item)}
                                                                />
                                                            </Grid>
                                                        )
                                                    })
                                                }

                                            </Grid>
                                        </div>
                                    </Paper>
                            }
                        </Grid>
                    )
                }
                {
                    value === 12 && (
                        <Grid item xs={8}>
                            {
                                !laptopWidth ?
                                    <Paper style={{ height: "200vh" }}>

                                        <div>
                                            <p style={{ fontFamily: "Times New Roman", fontSize: 20, borderBottom: "1px solid black", marginLeft: 20 }}>Filter by Brand</p>
                                            <div style={{ borderBottom: "1px solid black", marginLeft: 20, cursor: "pointer" }} >
                                                <img src="https://1000logos.net/wp-content/uploads/2016/09/Acer-logo.jpg" width="100" height="90" className={styles.Image}></img>
                                                <img src="data:image/png;base64,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" width="100" height="90" className={styles.Image}></img>
                                                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLZIhcOUqe0vNeeSIkDav0zh7QrMpeR1JPpQ&usqp=CAU" width="100" height="90" className={styles.Image}></img>
                                            </div>
                                            <div style={{ float: 'right', marginRight: 40, marginTop: 5, cursor: 'pointer' }}>
                                                <Link style={{ color: 'black' }} onClick={() => setLaptopwidth(false)}><GridViewOutlinedIcon /></Link>
                                                {" "}
                                                <Link style={{ color: 'black' }} onClick={() => setLaptopwidth(true)}><FormatAlignJustifyOutlinedIcon /></Link>
                                            </div>
                                            <Grid container spacing={1} >
                                                {
                                                    data.filter(item => item.type == 11).map((item) => {
                                                        return (
                                                            <Grid item>
                                                                <CardComponent
                                                                    cardName={item.name}
                                                                    cardImageUrl={item.url}
                                                                    imageTitle={item.imageTitle}
                                                                    description={item.description}
                                                                    priceBuy={item.price}
                                                                    ProductID={item.id}
                                                                    addToCart={() => handleAddCart(item)}
                                                                    addToWish={() => handleAddWish(item)}
                                                                />
                                                            </Grid>
                                                        )
                                                    })
                                                }
                                            </Grid>
                                        </div>
                                    </Paper> :
                                    <Paper style={{ height: "200vh" }}>

                                        <div>
                                            <p style={{ fontFamily: "Times New Roman", fontSize: 20, borderBottom: "1px solid black", marginLeft: 20 }}>Filter by Brand</p>
                                            <div style={{ borderBottom: "1px solid black", marginLeft: 20, cursor: "pointer" }}>
                                                <img src="https://1000logos.net/wp-content/uploads/2016/09/Acer-logo.jpg" width="100" height="90" className={styles.Image}></img>
                                                <img src="data:image/png;base64,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" width="100" height="90" className={styles.Image}></img>
                                                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLZIhcOUqe0vNeeSIkDav0zh7QrMpeR1JPpQ&usqp=CAU" width="100" height="90" className={styles.Image}></img>
                                            </div>
                                            <div style={{ float: 'right', marginRight: 40, marginTop: 5, cursor: 'pointer' }}>
                                                <Link style={{ color: 'black' }} onClick={() => setLaptopwidth(false)}><GridViewOutlinedIcon /></Link>
                                                {" "}
                                                <Link style={{ color: 'black' }} onClick={() => setLaptopwidth(true)}><FormatAlignJustifyOutlinedIcon /></Link>
                                            </div>
                                            <Grid container spacing={1} >

                                                {
                                                    data.filter(item => item.type == 11).map((item) => {
                                                        return (
                                                            <Grid item>
                                                                <CardWidth
                                                                    cardName={item.name}
                                                                    cardImageUrl={item.url}
                                                                    imageTitle={item.imageTitle}
                                                                    cpu={item.cpu}
                                                                    operating={item.operating}
                                                                    memory={item.memory}
                                                                    hd={item.hd}
                                                                    graphics={item.graphics}
                                                                    display={item.display}
                                                                    battery={item.battery}
                                                                    weight={item.weight}
                                                                    priceBuy={item.price}
                                                                    ProductID={item.id}
                                                                    addToCart={() => handleAddCart(item)}
                                                                    addToWish={() => handleAddWish(item)}
                                                                />
                                                            </Grid>
                                                        )
                                                    })
                                                }

                                            </Grid>
                                        </div>
                                    </Paper>
                            }
                        </Grid>
                    )
                }
                {
                    value === 13 && (
                        <Grid item xs={8}>
                            {
                                !laptopWidth ?
                                    <Paper style={{ height: "200vh" }}>

                                        <div>
                                            <p style={{ fontFamily: "Times New Roman", fontSize: 20, borderBottom: "1px solid black", marginLeft: 20 }}>Filter by Brand</p>
                                            <div style={{ borderBottom: "1px solid black", marginLeft: 20, cursor: "pointer" }} >
                                                <img src="https://1000logos.net/wp-content/uploads/2016/09/Acer-logo.jpg" width="100" height="90" className={styles.Image}></img>
                                                <img src="data:image/png;base64,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" width="100" height="90" className={styles.Image}></img>
                                                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLZIhcOUqe0vNeeSIkDav0zh7QrMpeR1JPpQ&usqp=CAU" width="100" height="90" className={styles.Image}></img>
                                            </div>
                                            <div style={{ float: 'right', marginRight: 40, marginTop: 5, cursor: 'pointer' }}>
                                                <Link style={{ color: 'black' }} onClick={() => setLaptopwidth(false)}><GridViewOutlinedIcon /></Link>
                                                {" "}
                                                <Link style={{ color: 'black' }} onClick={() => setLaptopwidth(true)}><FormatAlignJustifyOutlinedIcon /></Link>
                                            </div>
                                            <Grid container spacing={1} >
                                                {
                                                    data.filter(item => item.type == 12).map((item) => {
                                                        return (
                                                            <Grid item>
                                                                <CardComponent
                                                                    cardName={item.name}
                                                                    cardImageUrl={item.url}
                                                                    imageTitle={item.imageTitle}
                                                                    description={item.description}
                                                                    priceBuy={item.price}
                                                                    ProductID={item.id}
                                                                    addToCart={() => handleAddCart(item)}
                                                                    addToWish={() => handleAddWish(item)}
                                                                />
                                                            </Grid>
                                                        )
                                                    })
                                                }
                                            </Grid>
                                        </div>
                                    </Paper> :
                                    <Paper style={{ height: "200vh" }}>
                                        <div>
                                            <p style={{ fontFamily: "Times New Roman", fontSize: 20, borderBottom: "1px solid black", marginLeft: 20 }}>Filter by Brand</p>
                                            <div style={{ borderBottom: "1px solid black", marginLeft: 20, cursor: "pointer" }}>
                                                <img src="https://1000logos.net/wp-content/uploads/2016/09/Acer-logo.jpg" width="100" height="90" className={styles.Image}></img>
                                                <img src="data:image/png;base64,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" width="100" height="90" className={styles.Image}></img>
                                                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLZIhcOUqe0vNeeSIkDav0zh7QrMpeR1JPpQ&usqp=CAU" width="100" height="90" className={styles.Image}></img>
                                            </div>
                                            <div style={{ float: 'right', marginRight: 40, marginTop: 5, cursor: 'pointer' }}>
                                                <Link style={{ color: 'black' }} onClick={() => setLaptopwidth(false)}><GridViewOutlinedIcon /></Link>
                                                {" "}
                                                <Link style={{ color: 'black' }} onClick={() => setLaptopwidth(true)}><FormatAlignJustifyOutlinedIcon /></Link>
                                            </div>
                                            <Grid container spacing={1} >
                                                {
                                                    data.filter(item => item.type == 12).map((item) => {
                                                        return (
                                                            <Grid item>
                                                                <CardWidth
                                                                    cardName={item.name}
                                                                    cardImageUrl={item.url}
                                                                    imageTitle={item.imageTitle}
                                                                    cpu={item.cpu}
                                                                    operating={item.operating}
                                                                    memory={item.memory}
                                                                    hd={item.hd}
                                                                    graphics={item.graphics}
                                                                    display={item.display}
                                                                    battery={item.battery}
                                                                    weight={item.weight}
                                                                    priceBuy={item.price}
                                                                    ProductID={item.id}
                                                                    addToCart={() => handleAddCart(item)}
                                                                    addToWish={() => handleAddWish(item)}
                                                                />
                                                            </Grid>
                                                        )
                                                    })
                                                }
                                            </Grid>
                                        </div>
                                    </Paper>
                            }
                        </Grid>
                    )
                }
            </Grid>
            <Footer />
        </div>
    );
}

export default brand;