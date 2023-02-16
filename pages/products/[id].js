import React from 'react';
import { useRouter } from 'next/router';
import CardComponent from '../card';
import { Paper } from '@material-ui/core';
import { firestore } from "../../services/firebase";
import { Grid } from '@material-ui/core';
import CardWidth from '../cardWidth'

const value = () => {
    const router = useRouter();
    const { id } = router.query;
    const [data, setData] = React.useState([])
    React.useEffect(() => {
        firestore.collection("User")
            .onSnapshot((snapshot) => {
                let data = snapshot.docs.map((doc) => (
                    {
                        id: doc.id,
                        ...doc.data()
                    }
                ))
                data.forEach(function (item, index, array) {

                })

                setData(data)

            })

    }, [])
    const product = data.find((a) => a.id === id);
    if (!product) {
        return <div>Not Product</div>
    }
    return (
        <div>
            <Grid container justifyContent="center">
                <Grid item xs={6}>
                    <CardComponent
                        cardName={product.name}
                        cardImageUrl={product.url}
                        imageTitle={product.imageTitle}
                        description={product.description}
                        priceBuy={product.price}
                    />
                </Grid>
                <Grid item xs={6}>
                    <CardWidth
                        cardName={product.name}
                        cardImageUrl={product.url}
                        imageTitle={product.imageTitle}
                        cpu={product.cpu}
                        operating={product.operating}
                        memory={product.memory}
                        hd={product.hd}
                        graphics={product.graphics}
                        display={product.display}
                        battery={product.battery}
                        weight={product.weight}
                        priceBuy={product.price}
                    />
                </Grid>
            </Grid>
        </div>
    );
}

export default value;