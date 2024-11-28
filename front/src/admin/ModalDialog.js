/*
Handle popup dialog
*/
import React from 'react'
import {Dialog, DialogContent, DialogTitle} from "@mui/material";
import {IconButton} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';


export default function ModalDialog(props) {
    const {open, setOpen} = props;
    const {id, action, functionName} = props;

    return (
        <Dialog open={open}>
            <DialogTitle>Chi tiết</DialogTitle>
            <IconButton aria-label="close" onClick={() => setOpen(false)}
                        sx={{position: 'absolute', right: 8, top: 8, color: (theme) => theme.palette.grey[500]}}>
                <CloseIcon/>
            </IconButton>
            <DialogContent>
                {/* Handle Customer Modal */}
                {action === "customer/add" && <AddNewCustomer setOpen={setOpen} functionName={functionName}/>}
                {action === "customer/view" && <ShowCustomer id={id} functionName={functionName}/>}
                {action === "customer/edit" && <UpdateCustomer setOpen={setOpen} id={id} functionName={functionName}/>}
            </DialogContent>
        </Dialog>
    );
}
