import React from "react";
// import Modal from "./Modal";
export default function Modal() {
    const [open, setOpen] = React.useState(true);
 
    const handleClose = () => {
        setOpen(false);
    };
 
    const handleOpen = () => {
        setOpen(true);
    };
 
    return (
        <div

        >

            <Modal isOpen={open} onClose={handleClose}>
                <>
                    <h1>GFG</h1>
                    <h3>A computer science portal!</h3>
                </>
            </Modal>
        </div>
    );
}