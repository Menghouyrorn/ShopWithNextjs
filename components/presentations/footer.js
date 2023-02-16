import React from "react";
import { Paper, Typography } from "@mui/material";
import Image from 'next/image'
import imageCard from '../../styles/Screenshot 2021-10-10 143510.png';
import netWork from '../../styles/Screenshot 2021-10-10 144418.png'
import youTube from '../../styles/Screenshot 2021-10-10 144657.png'

const footer = () => {
    return (
        <div style={{ margin: 5 }}>
            <Paper style={{ backgroundColor: "#1E90FF", height: '50px' }} >
                <h2 style={{ margin: 0, padding: 10, position: 'relative', left: 40 }}>GET IN TOUCH</h2>
            </Paper>
            <Paper style={{ height: "60vh", margin: 0 }}>
                <div style={{ width: "35%", float: "left", position: "relative", left: 40 }}>
                    <h3>Computer Shop</h3>
                    <p>We started with a small business, but as a result of our dedication, loyalty, reliability, affordable prices, excellent customer services . . . . Read More</p>
                </div>
                <div style={{ width: "30%", float: "left", position: "relative", textAlign: 'center' }}>
                    <h3>Create By</h3>
                    <p>Name : Rorn Menghouy</p>
                    <p>Email : menghouyrorn@gmail.com</p>
                    <p>PhoneNumber : +85569361307</p>
                </div>
                <div style={{ width: "35%", float: "left", position: "relative", textAlign: 'center' }}>
                    <h3>PAYMENTS METHOD</h3>
                    <Image
                        src={imageCard}
                        alt="Picture of the PAYMENTS"
                        width={290}
                        height={60}
                    />
                    <h3>REACH US</h3>
                    <Image
                        src={netWork}
                        alt="Picture of the REACH US"
                        width={250}
                        height={60}
                    />
                    <h3>FOLLOW US</h3>
                    <Image
                        src={youTube}
                        alt="Picture of the FOLLOW US"
                        width={230}
                        height={50}
                    />
                </div>
            </Paper>
        </div>
    );
}

export default footer;