import { Button, IconButton } from "@material-ui/core";
import React from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import { color } from "@mui/system";
import { fireAuth } from "../services/firebase";
import { useState } from "react";

const useStyles = makeStyles((theme) => ({
    buy: {
        background: 'blue',
        color: 'white',
        textAlign: 'center',
        height: '30vh'
    }
}))

const text = () => {
    const classes = useStyles();
    const user = fireAuth.currentUser;
    const [product, setProduct] = useState([]);
    React.useEffect(() => {
        const data = localStorage.getItem('Products');
        setProduct(JSON.parse(data))
    }, []);
    const handleDelete=(product_name)=>{
        var object_product=JSON.parse(localStorage.getItem("Products"));
        for(let i=0;i<object_product.length;i++){
            if(object_product[i].name==product_name){
                object_product.splice(i,1);
                localStorage.setItem("Products",JSON.stringify(object_product));
                alert("Successfull !");
                break;
            }
        }
    }
    const getTotlaPrice=()=>{
        return product.reduce(
            (sum,{price,quantity})=>sum+price*quantity,0
        );
    };
    return (
        <div>
            <Grid>
                <Grid container justifyContent="center">
                    {!product ?
                        <p>Please Add product</p>
                        : <Grid item xs={12}>
                            <table class="table">
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Image</th>
                                        <th scope="col">Name</th>
                                        <th scope="col">Price</th>
                                        <th scope="col">Quality</th>
                                        <th scope="col">Button</th>
                                    </tr>
                                </thead>
                                {product.map((item, index) => {
                                    return (
                                        <tbody>
                                            <tr>
                                                <th scope="row">{index}</th>
                                                <td><img src={item.url} width={80} height={80}></img></td>
                                                <td>{item.name}</td>
                                                <td>{item.price}</td>
                                                <td>{item.quantity}</td>
                                                <td><IconButton onClick={()=>handleDelete(item.name)}><DeleteIcon /></IconButton></td>
                                            </tr>
                                        </tbody>
                                    )
                                })}
                            </table>
                        </Grid>
                    }
                    <div style={{fontSize:30}}>Total Price : $ {getTotlaPrice()}</div>
                </Grid>
            </Grid>
        </div>
    );
}
export default text;