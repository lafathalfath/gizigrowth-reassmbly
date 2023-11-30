import { Head, Link } from "@inertiajs/react";
import NavBar from "../NavigationBar";


const Index=(props)=>{
    return <>
        <Head title="GiBot"/>
        <div className="fixed z-50 w-full">
            <NavBar user={props.user}/>
        </div>
        <div className="pt-16 px-5">
            <div className="flex justify-between items-end">
                <div className="py-5 text-2xl text-[#94c73f] font-bold">GiBot</div>
                <div className="text-right border-r-[1px] border-black pr-5">Chatbot Mascot<br />Generator</div>
            </div>
            <div className="py-5 text-2xl text-center font-bold">Berkomunikasi dengan Ramah Pengguna Melalui Gibot!</div>
            <div className="flex flex-col items-center justify-center gap-10">
                <img src="../assets/images/gbot.png" alt="" />

                <Link href="/gibot/chat" className="py-2 px-5 bg-[#94c73f] hover:bg-[#acdf57] rounded-full text-white font-bold text-lg">Mulai</Link>
            </div>
        </div>
    </>
}

export default Index;