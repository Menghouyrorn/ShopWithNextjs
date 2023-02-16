import { Grid, IconButton } from "@material-ui/core";
import React from "react";
import DeleteIcon from '@mui/icons-material/Delete';

const order = () => {
    const [data, setData] = React.useState([]);
    React.useEffect(() => {
        const data = localStorage.getItem("WishList");
        setData(JSON.parse(data));
    }, []);
    const handleDelete=(product_name)=>{
        var object_product=JSON.parse(localStorage.getItem("WishList"));
        for(let i=0;i<object_product.length;i++){
            if(object_product[i].name==product_name){
                object_product.splice(i,1);
                localStorage.setItem("WishList",JSON.stringify(object_product));
                alert("Successfull !");
                break;
            }
        }
    }
    return (
        <div>
            <Grid>
                <Grid container justifyContent="center">
                    <Grid item xs={12}>
                        {!data ?
                            <p>Please Add word list</p>
                            :
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
                                {data.map((item, index) => {
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
                                    );
                                })}
                            </table>
                        }

                    </Grid>
                </Grid>
            </Grid>
        </div>
    );
}

export default order;