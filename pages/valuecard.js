import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import data from './data';
import CardComponent from "./card";
import Nextlink from 'next/link'


const ComponentPage = () => {
  console.log(data.products.cardName)
  return (
    <div style={{ float: 'right', width: '69%' }}>
      <Grid container spacing={2}>
        {data.products.map((item, index) => {
          return (
            <Grid key={index} item xs={3.5}>
              <Nextlink href={`/products/${item.slug}`} passHref>
                <div>
                  <CardComponent
                    cardName={item.cardName}
                    subTitle={item.subTitle}
                    cardImageUrl={item.cardImageUrl[0]}
                    imageTitle={item.imageTitle}
                    description={item.description}
                    priceBuy={item.priceBuy}
                  />
                </div>
              </Nextlink>
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
};

export default ComponentPage;