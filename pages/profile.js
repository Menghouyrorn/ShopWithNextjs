import { Button, Dialog, DialogContent } from '@mui/material';
import React from 'react';
import { firestore } from '../services/firebase';

const profile=()=>{

    const [open,setOpen]=React.useState(false);

    const handleOpen=()=>{
        setOpen(true);
    }
    const handleClose=()=>{
        setOpen(false);
    }

    // const handleClickUpdate=()=>{
    //     firestore.collection("Users").doc(id).update({
    //         email:email,
    //     })
    // }

    return (
        <div>
            <Button onClick={handleOpen}>Open Dialog</Button>
            <Dialog
                open={open}
                onClose={handleClose}
            >
                <DialogContent
                style={{width:'90vh',height:'100vh'}}
                >
                
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default profile;