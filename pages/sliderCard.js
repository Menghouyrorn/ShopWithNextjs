import React from 'react';
import AddIcon from '@mui/icons-material/Add';
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule';
import { Paper, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';



const useStyles = makeStyles((theme) => ({
    button: {
        padding: 5,
        width: 40,
        background: 'none',
        fontSize: 30
    },
    num: {
        padding: 20,
        background: 'none',
        fontSize: 30

    }
}))


const Product = [
    "https://ochanjang.com/wp-content/uploads/2021/01/6t8Zh249QiFmVnkQdCCtHK.jpg",
    "https://m.media-amazon.com/images/I/71CSbyoByWL._AC_SL1500_.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIPtUHosYnzX93FOASA21Kp7kpsPteMwR7SA&usqp=CAU",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYLtg16TdOBDlikRNz_7uV6-45-OCnzJ1GWQ&usqp=CAU",
]
const slider = () => {
    const [image, setImage] = React.useState(Product[0])
    const classes = useStyles();
    return (
        <div>
            <div style={{ width: '50%', float: 'left' }}>
                <Paper elevation={8} style={{ width: 425 }}>
                    <img src={image} style={{ width: 420, height: 410, border: '1px solid black' }}></img>
                </Paper>
                <div>
                    {Product.map((img, index) => (
                        <Paper elevation={8} style={{ width: 107, height: 107, display: 'inline-block', marginLeft: 5, marginTop: 5 }}>
                            <img src={img} key={index} style={{ width: 100, height: 100, border: image === img ? "4px solid red" : "", cursor: 'pointer', margin: 5 }} onClick={() => setImage(img)}></img>
                        </Paper>
                    ))}
                </div>
            </div>
            <div style={{ width: '50%', float: 'left', }}>
                <h1>Acer Predator PT515</h1>
                <p style={{ color: 'red', fontFamily: 'Times New Roman', fontSize: 20 }}> $1,819.00</p>
                <div style={{ display: 'flew' }}>
                    <button className={classes.button}>+</button>
                    <span className={classes.num}>1</span>
                    <button className={classes.button}>-</button>
                </div>
                <Button style={{ color: 'white', marginTop: 10, background: "#0E17FD" }} variant="contained" size="large">Add To Card</Button>
                <Button style={{ color: 'white', marginLeft: 15, marginTop: 10, background: "#0E17FD" }} variant="contained" size="large">Buy Now</Button>
                <p style={{ fontFamily: 'Times New Roman', fontSize: 25 }}>Availability:<span style={{ color: '#0038FF' }}> In Stock</span></p>
                <p style={{ fontFamily: 'Times New Roman', fontSize: 25 }}>Categories:<span style={{ color: '#0038FF' }}>Computer, Laptops, Notebooks
                    & Tablets, Gaming Laptops</span></p>
            </div>
        </div>

    );
}

export default slider;