/*
Handle popup dialog
*/
import React from 'react'
import {Dialog, DialogContent, DialogTitle} from "@mui/material";
import {IconButton} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import AddNewProduct from "./app_container/form/products/AddNewProduct";
import UpdateProduct from "./app_container/form/products/UpdateProduct";
import ShowOrder from "./app_container/form/orders/ShowOrder";
import UpdateOrder from "./app_container/form/orders/UpdateOrder";
import AddNewCategory from "./app_container/form/category/AddNewCategory";
import UpdateCategory from "./app_container/form/category/UpdateCategory";
import UpdateAccount from "./app_container/form/accounts/UpdateAccount";
import {ShowProduct} from "./app_container/form/products/ShowProduct";

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
                {/* Handle Products Modal */}
                {action === "products/add" && <AddNewProduct setOpen={setOpen} functionName={functionName}/>}
                {action === "products/view" && <ShowProduct id={id} functionName={functionName}/>}
                {action === "products/edit" && <UpdateProduct setOpen={setOpen} id={id} functionName={functionName}/>}
                {/* Handle Orders Modal */}
                {action === "orders/view" && <ShowOrder id={id} functionName={functionName}/>}
                {action === "orders/edit" && <UpdateOrder setOpen={setOpen} id={id} functionName={functionName}/>}
                {/* Handle Category Modal */}
                {action === "categories/add" && <AddNewCategory setOpen={setOpen} functionName={functionName}/>}
                {action === "categories/edit" && <UpdateCategory setOpen={setOpen} id={id} functionName={functionName}/>}
                {/* Handle Accounts Modal */}
                {action === "users/edit" && <UpdateAccount setOpen={setOpen} id={id} functionName={functionName}/>}
            </DialogContent>
        </Dialog>
    );
}
