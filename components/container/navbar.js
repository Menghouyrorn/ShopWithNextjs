import React from 'react';
import styles from '../../styles/nav.module.css';
import Profile from '../../styles/images 1.jpg';
import LINK from 'next/link';
import Image from 'next/image'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import MenuIcon from '@mui/icons-material/Menu';
import { fireAuth, firestore, signInWithGoogle, signInWithEmailAndPassword, registerWithEmailAndPassword, logout, sendPasswordResetEmail } from '../../services/firebase';
import LogoutIcon from '@mui/icons-material/Logout';
import { Dialog, DialogContent, DialogTitle, Button, TextField, makeStyles, Paper, Link } from '@material-ui/core'
import CloseIcon from '@mui/icons-material/Close';
import emailjs from 'emailjs-com';
import { Typography } from '@mui/material';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Search from '../presentations/search';
import AddCart from '../../pages/addcart'
import { useRouter } from 'next/router';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';


const useStyles = makeStyles((theme) => ({
    form: {
        height: '450px',
        width: '350px',
    }
}))

export default function Navigation() {
    const [open, setOpen] = React.useState(false);
    const [isForGotPassword, SetIsForgotPassword] = React.useState(false);
    const [signup, SetSignup] = React.useState(false);
    const [error, SetError] = React.useState('');
    const userInfo = fireAuth.currentUser;
    const [cart,setCart]=React.useState([]);
    const router = useRouter();
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [name, setName] = React.useState('');
    const [cartItems, setCartItems] = React.useState([]);
    const [data,setData]=React.useState([]);
    const [wish,setWish]=React.useState([]);
    React.useEffect(()=>{
        setCart(JSON.parse(localStorage.getItem("Products")));
    },[])
    React.useEffect(()=>{
        setWish(JSON.parse(localStorage.getItem("WishList")));
    },[])

    React.useEffect(()=>{
        firestore.collection("User")
        .onSnapshot((snapshot)=>{
            let data=snapshot.docs.map((doc)=>({
                ProductID:doc.id,
                ...doc.data()
            }))
            setData(data);
        })
    },[])

    const handleLogout = (e) => {
        e.preventDefault();
        fireAuth.signOut()
            .then((res) => {
                router.push('/')
                localStorage.setItem("Products","[]");
                localStorage.setItem('WishList', "[]");
                alert("User LogOut")
            })
            .catch((err) => {
                alert("Error")
            })
    }
    const handleOpen = () => {
        setOpen(true)
    }
    const handleClose = () => {
        setOpen(false)
    }
    const handleLogin = (e) => {
        e.preventDefault();
        const { email, password } = e.target.elements;
        fireAuth.signInWithEmailAndPassword(email.value, password.value)
            .then((res) => {
                if (email.value == 'admin@gmail.com' && password.value == "admin123") {
                    router.push('/admin')
                    setOpen(false)
                } else {
                    console.log("User Login")
                    e.target.elements.fullName.value = ('')
                    e.target.elements.email.value = ('')
                    e.target.elements.password.value = ('')
                    setOpen(false)
                }

            })
            .catch((err) => {
                console.log(err)
                e.target.elements.fullName.value = ('')
                e.target.elements.email.value = ('')
                e.target.elements.password.value = ('')
                SetError(err.message)
            })
    }
    const handleForgotPassword = (e) => {
        e.preventDefault();
        const { email } = e.target.elements;
        fireAuth.sendPasswordResetEmail(email.value)
            .then((res) => {
                console.log("For Got Succesfull")
                e.target.elements.email.value = ('')
            })
            .catch((err) => {
                console.log(err)
                e.target.elements.email.value = ('')
                SetError(err.message)
            })
    }
    const handleSignup = (e) => {
        e.preventDefault();
        const disk = e.target.elements;
        const user = {
            email: disk.email.value,
            password: disk.password.value,
        }
        fireAuth.createUserWithEmailAndPassword(disk.email.value, disk.password.value)
            .then((res) => {
                firestore.collection("Users")
                    .add({
                        name: disk.username.value,
                        email: disk.email.value,
                        password: disk.password.value,
                    })
                    .then((res) => {
                        console.log('Add to firestore Successfull')
                    })
                    .catch((err) => {
                        console.log(err)
                    })
                const user = fireAuth.currentUser;
                user
                    .updateProfile({
                        displayName: disk.username.value,
                    })
                    .then((res) => {
                        console.log("Name successfull")
                    })
                    .catch((err) => {
                        console.log(err)
                    })
                alert("Create Account Succesfull")
                emailjs.sendForm("service_mthw93f", "template_qw3uji7", e.target, "user_oTNUZkT0odt61MGVdVX66")
                e.target.elements.username.value = ('');
                e.target.elements.password.value = ('');
                e.target.elements.email.value = ('');
                SetSignup(false)
            })
            .catch((err) => {
                console.log(err)
                SetError(err.message)
                e.target.elements.username.value = ('');
                e.target.elements.password.value = ('');
                e.target.elements.email.value = ('');
            })
    }
    const classes = useStyles();
    return (
        <div className={styles.navs}>
            <LINK href='/' >
                <h2 style={{ marginLeft: 30, color: 'white', cursor: 'pointer', padding: 7,position:'relative',top:5 }}>CT SHOP</h2>
            </LINK>
            <Search />
            <ul style={{position:"relative",top:12}}>
                <li>
                    <MenuIcon /><Link href="../products/laptop" underline="none" style={{ color: 'white' }}>All Product</Link>
                </li>
                <li>
                    <FavoriteBorderIcon /><span style={{ padding: '3px 6px', background: 'red', borderRadius: '50%', position: 'relative', top: -18, right: 7, color: 'white', fontSize: 13 }}>{wish.length}</span><Link href="../cart/wish" underline="none" style={{ color: 'white' }}>WISH LIST </Link>
                </li>
                <li>
                    <ShoppingCartIcon></ShoppingCartIcon><span style={{ padding: '3px 6px', background: 'red', borderRadius: '50%', position: 'relative', top: -18, right: 7, color: 'white', fontSize: 13 }}>{cart.length}</span><Link href="../addcart" underline="none" style={{ color: 'white' }}> CART </Link>
                </li>
                <li>
                    {!userInfo ?
                        <ul>
                            <li style={{ padding: 0 }}>
                                <PermIdentityIcon /><button onClick={handleOpen} style={{ border: 'none', background: 'none', cursor: 'pointer', fontSize: 15, fontFamily: 'Time New Roman', color: 'white' }}>SIGN IN</button>
                            </li>
                        </ul> :
                        <ul style={{padding:0,position:'relative',top:-6}}>
                            <li style={{padding:0,fontSize:15,color:'blue'}}>{userInfo.displayName}</li>
                            <li style={{ padding: 0}}>
                                <LogoutIcon style={{fontSize:15,position:'relative',top:4}}/><button onClick={handleLogout} style={{ border: 'none', background: 'none', cursor: 'pointer', fontSize: 15, padding: 0, fontFamily: 'Time New Roman', color: 'white' }}>LOG OUT</button>
                            </li>
                        </ul>

                    }
                </li>
            </ul>
            <Dialog
                open={open}
                onClose={handleClose}
            >
                <Link onClick={handleClose} style={{ cursor: 'pointer', color: 'black', textAlign: 'right', marginTop: 20, marginRight: 15 }}><CloseIcon /></Link>
                <DialogContent>
                    {
                        !signup ?
                            <Paper elevation={0}>
                                {
                                    !isForGotPassword ?
                                        <form className={classes.form} onSubmit={handleLogin}>
                                            <h2 style={{ fontFamily: "Times New Roman", textAlign: 'center' }}>LOGIN</h2>
                                            <TextField type="text" name="fullName" label="Enter the FullName" variant="outlined" required fullWidth style={{ marginBottom: 10 }} />
                                            <TextField type="email" name="email" label='Enter the Email' variant="outlined" required fullWidth style={{ marginBottom: 10 }} />
                                            <TextField type="password" name="password" label="Enter the Password" variant="outlined" required fullWidth style={{ marginBottom: 10 }} />
                                            <Typography style={{ color: 'red' }}>{error}</Typography>
                                            <TextField type='submit' value='Submit' variant="outlined" fullWidth />
                                            <Link style={{ cursor: 'pointer' }} onClick={() => {
                                                SetIsForgotPassword(true)
                                                SetError('')
                                            }}>Forget Password ?</Link>
                                            <div >
                                                <p style={{ display: 'inline-block' }}>Do you have account?</p>
                                                <Link style={{ cursor: 'pointer' }} onClick={() => {
                                                    SetSignup(true)
                                                    SetError('')
                                                }}>Sign Up</Link>
                                            </div>
                                        </form> :
                                        <form className={classes.form} onSubmit={handleForgotPassword}>
                                            <h2 style={{ fontFamily: "Times New Roman", textAlign: 'center' }}>For Got Password</h2>
                                            <TextField name="email" label='Enter the Email' variant="outlined" required fullWidth style={{ marginBottom: 10 }} />
                                            <Typography style={{ color: 'red' }}>{error}</Typography>
                                            <TextField type='submit' value='Submit' variant="outlined" fullWidth />
                                            <Button variant="outlined" style={{ cursor: 'pointer', fontSize: 15, marginTop: 15, marginLeft: 100 }} onClick={() => {
                                                SetIsForgotPassword(false)
                                                SetError('')
                                            }}>Go bank to Login</Button>
                                        </form>
                                }
                            </Paper> :
                            <Paper elevation={0} style={{ height: 505, width: 350 }}>
                                <form className={classes.form} onSubmit={handleSignup}>
                                    <h2 style={{ fontFamily: "Times New Roman", textAlign: 'center' }}>SIGNUP</h2>
                                    <TextField type="text" name="username" label="Enter the LastName" variant="outlined" required fullWidth style={{ marginBottom: 10 }} />
                                    <TextField type="email" name="email" label='Enter the Email' variant="outlined" required fullWidth style={{ marginBottom: 10 }} />
                                    <TextField type="password" name="password" label="Enter the Password" variant="outlined" required fullWidth style={{ marginBottom: 10 }} />
                                    <FormControl component="fieldset" style={{ marginTop: 5 }}>
                                        <FormLabel component="legend">Gender</FormLabel>
                                        <RadioGroup aria-label="gender" name="gender1" style={{ display: 'initial' }}>
                                            <FormControlLabel value="female" name="female" control={<Radio />} label="Female" />
                                            <FormControlLabel value="male" name="male" control={<Radio />} label="Male" />
                                        </RadioGroup>
                                    </FormControl>
                                    <Typography style={{ color: 'red' }}>{error}</Typography>
                                    <TextField type='submit' value='Submit' variant="outlined" fullWidth />
                                    <Link style={{ cursor: 'pointer' }} onClick={() => {
                                        SetSignup(false)
                                        SetError('')
                                        }}>GO BANK TO THE LOGIN</Link>
                                </form>
                            </Paper>
                    }
                </DialogContent>
            </Dialog>
        </div>

    );
}