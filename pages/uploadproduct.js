import React from "react";
import { Grid, TextField, FormControl, InputLabel, NativeSelect, Link } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { firestore } from "../services/firebase";



const useStyles = makeStyles((theme) => ({
    input: {
        marginTop: 10
    }
}))

const upload = () => {
    const classes = useStyles();

    const handleUpload = (e) => {
        e.preventDefault()
        const data = e.target.elements;
        console.log(data.name.value)
        firestore.collection("User")
            .add({
                url: data.url.value,
                name: data.name.value,
                cpu: data.cpu.value,
                ram: data.ram.value,
                handdisk: data.hd.value,
                store: data.st.value,
                type: data.type.value,
                imageTitle: data.imti.value,
                price: data.pb.value,
                qty:data.qty.value,
                description: data.description.value,
                operating: data.operating.value,
                memory: data.memory.value,
                graphics: data.graphics.value,
                display: data.display.value,
                battery: data.battery.value,
                weight: data.weight.value
            })
            .then((res) => {
                alert("Successfull")
            })
            .catch((err) => {
                console.log(err)
            })
    }
    return (
        <div>
            <Grid container justifyContent="center">
                <Grid item xs={12} sm={6}>
                    <Grid>
                        <form onSubmit={handleUpload}>
                            <Grid container spacing={1}>
                                <Grid item xs={6}>
                                    <FormControl fullWidth>
                                        <InputLabel variant="standard" htmlFor="uncontrolled-native">
                                            Type of Computer
                                        </InputLabel>
                                        <NativeSelect
                                            native

                                            inputProps={{
                                                name: 'type',
                                                id: 'uncontrolled-native',
                                            }}
                                        >
                                            <option value=""></option>
                                            <option value={0}>Laptop</option>
                                            <option value={1}>2-In-1Laptops</option>
                                            <option value={2}>Gaming Laptops</option>
                                            <option value={3}>Macbooks</option>
                                            <option value={4}>Surfaces</option>
                                            <option value={5}>Tablets</option>
                                            <option value={6}>Brands PC</option>
                                            <option value={7}>Brands Gaming PC</option>
                                            <option value={8}>Custom PC</option>
                                            <option value={9}>Custom Gaming PC</option>
                                            <option value={10}>All-in-One</option>
                                            <option value={11}>iMac, iMac Pro</option>
                                            <option value={12}>Workstations</option>
                                            <option value={13}>HOT SALE</option>
                                            <option value={14}>NEW ARRIVAL</option>
                                            <option value={15}>COMING SOON</option>
                                        </NativeSelect>
                                    </FormControl>
                                </Grid>

                                <Grid item xs={6}>
                                    <TextField className={classes.input} type="text" variant="outlined" name="url" label="Inputer the URL" fullWidth ></TextField>
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField className={classes.input} type="text" variant="outlined" name="qty" label="Inputer the Quality" fullWidth ></TextField>
                                </Grid>
                                <Grid item xs={6} >
                                    <TextField className={classes.input} type="text" variant="outlined" name="name" label="Enter the Name" fullWidth ></TextField>
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField className={classes.input} type="text" variant="outlined" name="cpu" label="Enter the CPU" fullWidth ></TextField>
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField className={classes.input} type="text" variant="outlined" name="ram" label="Enter the RAM" fullWidth ></TextField>
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField className={classes.input} type="text" variant="outlined" name="hd" label="Enter the Hand Disk" fullWidth ></TextField>
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField className={classes.input} type="text" variant="outlined" name="st" label="Enter the Store" fullWidth ></TextField>
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField className={classes.input} type="text" variant="outlined" name="imti" label="Enter the Title Image" fullWidth ></TextField>
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField className={classes.input} type="text" variant="outlined" name="pb" label="Enter the PriceProduct" fullWidth ></TextField>
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField className={classes.input} type="text" variant="outlined" name="description" label="Enter the description" fullWidth ></TextField>
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField className={classes.input} type="text" variant="outlined" name="operating" label="Enter the operating" fullWidth ></TextField>
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField className={classes.input} type="text" variant="outlined" name="memory" label="Enter the memory" fullWidth ></TextField>
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField className={classes.input} type="text" variant="outlined" name="graphics" label="Enter the graphics" fullWidth ></TextField>
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField className={classes.input} type="text" variant="outlined" name="display" label="Enter the display" fullWidth ></TextField>
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField className={classes.input} type="text" variant="outlined" name="battery" label="Enter the battery" fullWidth ></TextField>
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField className={classes.input} type="text" variant="outlined" name="weight" label="Enter the weight" fullWidth ></TextField>
                                </Grid>
                                <TextField className={classes.input} type="submit" variant="outlined" value="Submit" fullWidth ></TextField>
                            </Grid>
                        </form>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    );
}

export default upload;