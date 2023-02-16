import React from "react";
import { makeStyles } from "@material-ui/styles";
import emailjs from 'emailjs-com';
import { Typography } from "@material-ui/core";


const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: "blue",
        height: 250,
        width: 300,
        margin: "0 auto",
        padding: 30,
        borderRadius: 10,
        marginTop: 20,
        "& input": {
            width: "100%",
            padding: 12,
            margin: 5,
            borderRadius: 8,
            border: "none",
            cursor: "pointer"
        }
    }
}))

const email = () => {
    const classes = useStyles();
    const handleEmailjs = (e) => {
        e.preventDefault();
        emailjs.sendForm("service_mthw93f", "template_qw3uji7", e.target, "user_oTNUZkT0odt61MGVdVX66")
            .then((res) => {
                console.log("Successful");
                e.target.elements.fullName.value = "";
            })
            .catch((err) => {
                console.log(err)
            })
    }

    return (
        <div>
            <form className={classes.root} onSubmit={handleEmailjs}>
                <input name="fullName" type="text" placeholder="Please Input the Full Name"></input>
                <input name="message" type="text" placeholder="Enter Your Gender"></input>
                <input name="email" type="email" placeholder="Enter your Email"></input>
                <input type="submit" value="Submit"></input>
            </form>
        </div>
    );
}

export default email;