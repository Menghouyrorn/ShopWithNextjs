import React from "react";
import { Grid, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { firestore } from "../services/firebase";
import CloseIcon from '@mui/icons-material/Close';



const useStyles = makeStyles((theme) => ({
    root: {
        width: 300,
        height: 350,
        marginTop: 10,
        textAlign: 'center',
        marginLeft: 10
    }
}))


const show = () => {
    const classes = useStyles();
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
                console.log(data)
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

    return (
        <div>
            <Grid container spacing={2}>
                <h1>DELL COMPUTER</h1>
                {
                    data.filter(item => item.type == 0).map((item) => {
                        return (
                            <Grid item key={item.id}>
                                <Paper className={classes.root} elevation={8}>
                                    <CloseIcon onClick={() => handleDelet(item.id)} style={{ float: 'right', marginTop: 10, marginRight: 10, cursor: 'pointer' }} />
                                    <img src={item.url} width='200px' height="200px" style={{ marginTop: 5 }}></img>
                                    <li>{item.name}</li>
                                    <li>{item.cpu}</li>
                                    <li>{item.ram}</li>
                                    <li>{item.handdisk}</li>
                                    <li>{item.store}</li>
                                </Paper>
                            </Grid>
                        )
                    })
                }
            </Grid>
        </div>
    );
}

export default show;