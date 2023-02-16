import React from "react";
import Sliderimage from '../components/presentations/slider'
import { Paper } from "@mui/material";
import Footer from "../components/presentations/footer";
import Slider from "./products/sliderCard";


const Home = () => {
    return (
        <div>
            <Paper style={{ height: "340vh" }}>
                <Sliderimage />
                <Slider />
                <Footer />
            </Paper>
        </div>
    );
}

export default Home;
<>

</>