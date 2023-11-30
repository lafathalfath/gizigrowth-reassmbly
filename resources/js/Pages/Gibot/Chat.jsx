import { Head, Link } from "@inertiajs/react";
import NavBar from "../NavigationBar";
import { FaChevronLeft } from "react-icons/fa";
import { IoSend } from "react-icons/io5";
import axios from "axios";
import { useState } from "react";
import { Inertia } from "@inertiajs/inertia";

const Chat=(props)=>{

    const [query, setQuery] = useState('');
    const [searchResult, setSearchResult] = useState([]);

    const handleSearch=async()=>{
        try{
            const response = Inertia.get('/api/search', {params: {query}});
            setSearchResult(response.data.item);
        } catch (error){
            console.error('Error Searching: ', error);
        }
    }
    console.log(searchResult);
    return <>
        <Head title="Chat | GiBot"/>
        <div className="fixed w-full z-50">
            <NavBar user={props.user}/>
        </div>
        <div className="pt-16 bg-[#C9E39F]">
            <div className="py-3 px-6 fixed w-full bg-[#94c73f] text-white flex items-center justify-start gap-[50%]">
                <Link href="/gibot" className="bg-[#94c73f] hover:bg-[#acdf57] p-1 rounded-md">
                    <FaChevronLeft />
                </Link>
                <div className="-translate-x-[80%] text-xl font-bold">GiBot</div>
            </div>
            <div className="p-3 pt-5 w-full bg-gradient-to-t from-[#C9E39F] from-70% to-transparent fixed bottom-0">
                <form onSubmit={handleSearch} className="py-3 px-6 w-full bg-white  rounded-lg flex items-center justify-between">
                    <input 
                        type="text" 
                        className="p-0 w-full border-none focus:ring-0" 
                        placeholder="Tulis pesan ..."
                        value={query}
                        onChange={(e)=>setQuery(e.target.value)}
                    />
                    <button className="text-xl">
                        <IoSend className="text-zinc-700"/>
                    </button>
                </form>
            </div>
            <div className="mx-5 mt-12 pt-5 min-h-[80vh]">
                {searchResult && searchResult.map((result)=>{
                    <Link href={result.link} className="w-96 h-40 bg-white mb-5" key={result.link}>{result.title}</Link>
                })}
                <path xmlns="http://www.w3.org/2000/svg" d="M0,999.75118L0,0L999.75118,0L999.75118,999.75118L0,999.75118z"/>
            </div>
        </div>
    </>
}

export default Chat;