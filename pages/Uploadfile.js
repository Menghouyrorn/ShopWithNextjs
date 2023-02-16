import React from "react";
import { makeStyles } from "@material-ui/styles";
import { fireStorage, firestore } from "../services/firebase";


const upload = () => {
    const [image, Viewimage] = React.useState()
    const handleUpload = (e) => {
        e.preventDefault();
        const { file } = e.target.elements;
        const storageFire = fireStorage.ref("")
        const fireAdd = storageFire.child(file.files[0].name)
        fireAdd.put(file.files[0])
            .then((res) => {
                console.log("Upload Successful !")
                alert("Upload file Successful !")
                console.log(file.files[0].name);
                handleView(e, file.files[0].name)
            })
            .catch((err) => {
                console.log(err)
            })
    }
    const handleView = (e, imageUrl) => {
        e.preventDefault();
        const storageFire = fireStorage.ref("")
        const fireView = storageFire.child(imageUrl)
        fireView.getDownloadURL()
            .then((res) => {
                alert("Can View")
                Viewimage(res)
            })
            .catch((err) => {
                console.log(err)
            })
    }
    const handleDelete = (e) => {
        e.preventDefault();
        const storageFire = fireStorage.ref("")
        const fireDelete = storageFire.child("")
        fireDelete.delete()
            .then((res) => {
                alert("Delete Successful")
            })
            .catch((err) => {
                console.log(err)
            })
    }
    return (
        <>
            <form onSubmit={handleUpload}>
                <input type="file" name="file" />
                <input type="submit" value="Submit" style={{ backgroundColor: "blue", color: 'white', padding: 10, borderRadius: 10, marginTop: 5, cursor: 'pointer' }}></input>
            </form>
            <button onClick={handleView} style={{ backgroundColor: 'red', color: "white", borderRadius: 10, padding: 10, marginLeft: 5, cursor: 'pointer' }}>View</button>
            <button onClick={handleDelete} style={{ backgroundColor: "green", color: "white", borderRadius: 10, padding: 10, marginLeft: 15, cursor: 'pointer' }}>Delete</button>
            <br />
            <img src={image} style={{ width: 500, height: 300, marginLeft: 5, marginTop: 10, backgroundColor: '#CCCCFF' }}></img>
        </>
    );
}

export default upload;
