import { Grid, TextField } from "@material-ui/core";
import React from "react";

const formforbuy = () => {
    return (
        <div>
            <div style={{ float: 'left', width: '30%', marginTop: 10, marginLeft: 5 }}>
                <h2 style={{ fontFamily: 'Times New Roman' }}>Billing details</h2>
                <form>
                    <Grid container spacing={1}>
                        <Grid xs={16} sm={6} item>
                            <TextField type="text" name="name" label="First Name" variant="outlined" fullWidth />
                        </Grid>
                        <Grid xs={16} sm={6} item>
                            <TextField type="text" name="name" label="Last Name" variant="outlined" fullWidth />
                        </Grid>
                        <p style={{ fontFamily: 'Times New Roman' }}>Country / Region : Cambodia</p>
                        <TextField type="text" name="name" label="Address" placeholder="Home number and street name" variant="outlined" fullWidth />
                        <TextField type="text" name="name" label="Khan" variant="outlined" fullWidth style={{ marginTop: 15 }} />
                        <TextField type="text" name="name" label="Sangkat" variant="outlined" fullWidth style={{ marginTop: 15 }} />
                        <TextField type="text" name="name" label="City" variant="outlined" fullWidth style={{ marginTop: 15 }} />
                        <TextField type="text" name="name" label="Phone Number" variant="outlined" fullWidth style={{ marginTop: 15 }} />
                        <TextField type="email" name="name" label="Email address" variant="outlined" fullWidth style={{ marginTop: 15 }} />
                    </Grid>
                </form>
            </div>
            <div style={{ float: 'left', width: '30%', marginTop: 10, marginLeft: 5 }}>
                <h2 style={{ fontFamily: 'Times New Roman' }}>Order Review</h2>

            </div>
        </div>
    );
}

export default formforbuy;