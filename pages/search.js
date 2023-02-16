import React from 'react';
import TextField from '@mui/material/TextField';
import data from './cardtest';
import { makeStyles } from '@material-ui/styles';
import CardComponent from './card';
import { Grid } from "@material-ui/core";


const useStyles = makeStyles((theme) => ({
    root: {
        textAlign: 'center',
        marginTop: 10,
    }
}))

const search = () => {
    const classes = useStyles();
    const [filter, setFilter] = React.useState('');

    const searchText = (e) => {
        setFilter(e.target.value);
    }
    let searchData = data.valueProduct.filter(item => {
        return Object.keys(item).some(key =>
            item[key].toString().toLowerCase().includes(filter.toString().toLowerCase())
        )
    });
    return (
        <div className={classes.root}>
            <input type='text'
                placeholder="Search"
                value={filter}
                onChange={searchText.bind(this)}
                style={{ padding: 20, borderRadius: 10, width: 300 }} />
            <Grid container spacing={0}>
                {searchData.map((item, index) => {
                    return (
                        <Grid key={index} item>
                            <CardComponent
                                cardImageUrl={item.img}
                                description={item.description}
                                priceBuy={item.priceBuy}
                            />
                        </Grid>
                    );
                })}
            </Grid>
        </div>
    );
}

export default search;