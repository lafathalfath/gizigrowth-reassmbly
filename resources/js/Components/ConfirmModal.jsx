import { Inertia } from "@inertiajs/inertia";
import React from "react";
import DangerButton from "./DangerButton";

const ConfirmModal=({isOpen, onClose, onDelete, itemId, itemName})=>{
    const handleDelete=()=>{
        onDelete(itemId);
        onClose();
    }
    return(
        // <div className="w-[100%] h-[100%] bg-black">
            <div className={`absolute w-[100%] h-full bg-gray-600/[0.5] left-0 top-0 items-center justify-center ${isOpen ? 'flex' : 'hidden'}`}>
                <div className="modal-box">
                    <h2>Are you sure you want to delete {itemName}?</h2>
                    <div className="modal-action">
                        <DangerButton className="btn btn-primary mr-2 text-xl" onClick={handleDelete}>
                            Delete
                        </DangerButton>
                        <button className="btn" onClick={onClose}>
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        // </div>
    )
}

export default ConfirmModal;