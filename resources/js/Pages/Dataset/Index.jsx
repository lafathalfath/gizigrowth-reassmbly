import { Head, Link } from "@inertiajs/react";
import NavBar from "../NavigationBar";
import StuntingChart from "@/Components/StuntingChart";
import Chart from "react-google-charts";
import { Inertia } from "@inertiajs/inertia";
import { AiOutlineSearch, AiFillEye, AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { useState } from "react";

const Index=(props)=>{
    // console.log(props.total);
    // console.log(props.list_tahun);
    // console.log(props.list_tahun);

    const tabel = props.data_kasus_stunting;
    // console.log(tabel);

    // const pages = props.data_kasus_stunting.links.slice(1, props.data_kasus_stunting.links.length-1);
    // const PrevPage = props.data_kasus_stunting.links[0];
    // const NextPage = props.data_kasus_stunting.links[props.data_kasus_stunting.links.length-1];
    // const FirstPage = props.data_kasus_stunting.first_page_url;
    // const LastPage = props.data_kasus_stunting.last_page_url;
    // const CurrentPage = props.data_kasus_stunting.current_page;

    // const [datasetLength, setDatasetLength] = useState(0);

    const [searchKey, setSearchKey] = useState('');
    const [year, setYear] = useState('');
    const [name, setName] = useState('');
    let datasets = []
    for(let i=0; i<tabel.length; i++){
        if(searchKey!=''||searchKey!=null){
            datasets.push({
                id: i,
                namaDaerah: tabel[i].nama_daerah,
                kasus: tabel[i].jumlah_kasus_stunting,
                tahun: tabel[i].tahun
            });
        }
    }
    let Daerah = [];
    for(let i=0; i<tabel.length; i++){
        if(!Daerah.includes(tabel[i].tahun)){
            Daerah.push(tabel[i].tahun);
        }
    }
    for(let i=0; i<tabel.length; i++){
        if(!Daerah.includes(tabel[i].nama_daerah)){
            Daerah.push(tabel[i].nama_daerah);
        }
    }

    const pagination = 10;
    let Last;
    if (Daerah.length % pagination != 0) {
        Last = Math.round(Daerah.length/pagination)+1;
    }else{
        Last = Math.round(Daerah.length/pagination);
    }
    const [halaman, setHamalan] = useState(1);
    const showEntry = Daerah.slice((halaman-1)*pagination, halaman*pagination);
    const handlePrevPage=()=>{
        if (halaman>1) {
            setHamalan(halaman-1);
        }
    }
    const handleNextPage=()=>{
        if (halaman<Last) {
            setHamalan(halaman+1);
        }
    }
    let pages = [];
    for (let i = 1; i < Last+1; i++) {
        pages.push(i);
    }
    let terbang;
    if (year&&name) {
        terbang = `/dataset?daerah=${name}&tahun=${year}`; 
    }else if (year && !name) {
        terbang = `/dataset?tahun=${year}`; 
    }else if (!year && name) { 
        terbang = `/dataset?daerah=${name}`; 
    }
    // const checkTahun=()=>{
    //     if (Tahun[0]!=null && CurrentPage == 1) {
    //         return true
    //     }
    // }

    return <>
        <Head title="Dataset"/>
        <div className="w-full fixed z-50">
            <NavBar user={props.user}/>
        </div>
        <div className="pt-16 pb-5 px-5 ">
            <h1 className="text-2xl pt-5 font-bold text-[#94c73f]">Dataset</h1>
            <div>
            Temukan kumpulan data mentah berupa tabel yang bisa diolah lebih lanjut di sini. <br />
            GiziGrowth menyediakan akses ke beragam koleksi dataset terkait stunting dan pangan.
            </div>
        </div>
        <div className="px-5 flex items-center justify-between flex-wrap">
            <form className="mt-5 p-0 w-64 border border-gray-700 bg-white focus:border-[#04724d] focus:border-[#04724d] focus:ring-[#04724d] focus:ring-[#04724d] flex items-center shadow-sm rounded-md"
                onSubmit={()=>Inertia.get('/dataset', {search: searchKey})}
            >
                <input type="search" name="search" id="searchData" placeholder="Cari daerah atau tahun" className='w-full h-8 pr-0 text-gray-700 border-none rounded-md focus:ring-white/0' onChange={(searchKey)=>setSearchKey(searchKey.target.value)}/>
                <button className='p-1 m-1 bg-[#94c73f]/60 text-white hover:bg-[#b4e75f] rounded-md'><AiOutlineSearch className='fill-black'/></button>
            </form>
            <form className="flex items-center justify-center gap-2 translate-y-[23%]">
                <div className="font-bold mr-5">filter:</div>
                <select name="" id="" className="h-9 py-0 rounded-lg bg-[#94c73f]/50 border-none text-black" defaultValue='Daerah'
                    onChange={(name)=>setName(name.target.value)}
                >
                    <option className="bg-white" disabled>Daerah</option>
                    {props.list_daerah[0]!=null && props.list_daerah.map(item=>{
                        return <option key={item.nama_daerah} value={item.nama_daerah} className="bg-white"
                         >{item.nama_daerah}</option>
                    })}
                </select>
                <select name="" id="" className="h-9 py-0 rounded-lg bg-[#94c73f]/50 border-none text-black"
                onChange={(year)=>setYear(year.target.value)}
                defaultValue='Tahun'>
                    <option className="bg-white" disabled>Tahun</option>
                    {props.list_tahun[0]!=null && props.list_tahun.map(item=>{
                        return <option key={item} value={item} className="bg-white"
                        >{item}</option>
                    })}
                </select>
                <Link href={terbang} className="py-1.5 px-3 bg-[#94c73f]/50 rounded-lg"
                >Go</Link>
            </form>
        </div>

        <div className="px-5">
            <div className='p-5 text-center text-lg'>{Daerah.length} Dataset ditemukan</div>
            <div className="px-5 rounded-xl bg-[#94c73f]/50 divide-y divide-solid divide-gray-600">
                {/* {CurrentPage==1 &&  */}
                { 
                    // Tahun[0]!=null && Tahun.map(item=>{
                    //     return <div key={item} className='py-5 flex items-center justify-between'>
                    //         <div>
                    //             {/* <button className='text-lg' onClick={()=>Inertia.get(`/dataset/stunting/${ item }`)}>Data Kasus Stunting tahun {item}</button> */}
                    //             <Link className='text-lg' href={`/dataset/stunting/${ item }`}>Data Kasus Stunting tahun {item}</Link>
                    //             <div className='text-xs text-gray-500'>{props.list_daerah.length+1} dokumen</div>
                    //         </div>
                    //         <div className='flex items-center justify-center gap-2'>
                    //             <AiFillEye className='text-xl'/>
                    //             <div>--</div>
                    //         </div>
                    //     </div>
                    // })
                }
                {showEntry[0]!=null && showEntry.map(item=>{
                    return <div key={item} className='py-5 flex items-center justify-between'>
                        <div>
                            {/* <button className='text-lg' onClick={()=>Inertia.get(`/dataset/stunting/${ item }`)}>Data Kasus Stunting Kelurahan {item}</button> */}
                            <Link className='text-lg' href={`/dataset/stunting/${ item }`}>Data Kasus Stunting {item}</Link>
                            <div className='text-xs text-gray-500'>{props.list_tahun.length+1} dokumen</div>
                        </div>
                        <div className='flex items-center justify-center gap-2'>
                            <AiFillEye  className='text-xl'/>
                            <div>--</div>
                        </div>
                    </div>
                })}
            </div>
        </div>

        <div className="p-5 flex items-center justify-center gap-2">
            <button 
                // href={PrevPage.url}
                onClick={handlePrevPage}
            ><AiOutlineLeft/></button>
            <button 
                // href={FirstPage} 
                onClick={()=>setHamalan(1)}
            className="px-3 bg-gray-300 rounded-md">First</button>
            {pages && pages.map(item=>{
                return <div key={item}>
                    <button onClick={()=>setHamalan(item)} className={`${halaman==item && 'bg-gray-400 text-white px-2 py-0.5 rounded-md'} mx-1`}>{item}</button>
                </div>
            })}
            <button 
                // href={LastPage} 
                onClick={()=>setHamalan(Last)}
            className="px-3 bg-gray-300 rounded-md">Last</button>
            <button 
                // href={NextPage.url}
                onClick={handleNextPage}
            ><AiOutlineRight/></button>
        </div>

        <br />
    </>
}

export default Index;