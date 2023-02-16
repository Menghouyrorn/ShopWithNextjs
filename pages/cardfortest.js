import React from "react";
import { Grid, Paper } from '@material-ui/core'
import Card from './card1'
import data from './cardtest'



const card = ({cart}) => {
    console.warn(data.valueProduct.length)
    return (
        <div>
            <Grid container spacing={1}>
                {data.valueProduct.map((item,index) => {
                    return (
                        <Grid item>
                            <Card
                                cardImageUrl={item.img}
                                description={item.description}
                                priceBuy={item.priceBuy}
                                id={item.id}
                                item={item}
                                cart={cart}
                            />
                        </Grid>
                    )
                })}
            </Grid>
        </div>
    );
}

export default card;