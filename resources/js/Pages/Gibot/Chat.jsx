import { Head, Link, usePage } from "@inertiajs/react";
import NavBar from "../NavigationBar";
import { FaChevronLeft } from "react-icons/fa";
import { useEffect, useState } from "react";
import { IoMdSend } from "react-icons/io";
import { Inertia } from "@inertiajs/inertia";
import axios from "axios";

const Chat=(props)=>{
    // const {bardApiUrl} = usePage().props;
    // const [bardData, setBardData] = useState();
    // useEffect(()=>{
    //     axios.get(bardApiUrl)
    //         .then(response => setBardData(response.data))
    //         .catch(error => console.error('Error fetching data:', error));
    // }, [bardApiUrl]);

    const [query, setQuery] = useState('');
    const [searchResult, setSearchResult] = useState('');
    console.log(searchResult);
    const handleSearch=async()=>{
        try{
            const response = await axios.post('/api/search', {message: query});
            setSearchResult(response.data.response);
        }catch (error) {
            console.error(error);
        }
    }
    // console.log(searchResult);
    console.log(query);
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
                        <IoMdSend className="text-zinc-700"/>
                    </button>
                </form>
            </div>
            <div className="mx-5 mt-12 pt-5 min-h-[80vh]">
                {searchResult}
                {/* <path xmlns="http://www.w3.org/2000/svg" d="M0,999.75118L0,0L999.75118,0L999.75118,999.75118L0,999.75118z"/> */}
            </div>
        </div>
    </>
}

export default Chat;