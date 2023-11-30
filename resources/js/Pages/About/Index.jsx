import { Head } from "@inertiajs/react";
import React from "react";
import NavBar from "../NavigationBar";

const Index = ({auth}) => {
    const preventAction=(e)=>{
        e.preventDefault();
    }
    return(
        <>
            <Head title="Tentang"/>
            <div className="fixed z-50 w-full">
                <NavBar user={auth.user}/>
            </div>
            <div className="pt-16 w-full">
                <img src="../assets/images/malas.png" alt="" className="w-full pointer-events-none"
                    onContextMenu={preventAction}
                    onDragStart={preventAction}
                    onDrop={preventAction}/>
            </div>
        </>
    )
}

export default Index;