import { Head, Link } from "@inertiajs/react";
import NavBar from "../NavigationBar";
import { AiOutlineSearch } from "react-icons/ai";
import Maps from "@/Components/Maps";
import Maps2 from "@/Components/Maps2";
import { useState } from "react";
import { Inertia } from '@inertiajs/inertia';


const Index=(props)=>{
    const table = props.data_kasus_stunting;
    // console.log(props.tahun);
    let datasets = []
    for(let i=0; i<table.length; i++){
        datasets.push({
            id: i,
            nama_daerah: table[i].nama_daerah.toLowerCase(),
            jumlah_kasus_stunting: table[i].jumlah_kasus_stunting,
            jumlah_anak: table[i].jumlah_anak,
            tahun: table[i].tahun
        });
    }
    let Tahun = [];
    for(let i=0; i<props.tahun.length; i++){
        if(!Tahun.includes(props.tahun[i])){
            Tahun.push(props.tahun[i]);
        }
    }
    Tahun = Tahun.reverse();
    // console.log(Tahun);

    const [searchEntry, setSearchEntry] = useState('');     
    const [year, setYear] = useState('2023');

    if (searchEntry!='') {
        datasets=datasets.filter(item=>item.nama_daerah.includes(searchEntry.toLowerCase()));
    }
    return <>
        <Head title="Gpoint"/>
        <div className="w-full z-50 fixed">
            <NavBar user={props.user}/>
        </div>
        <div className="pt-16 px-5">
            <div className="py-5 text-2xl text-[#94c73f] font-bold">Gpoint</div>
            <div>Temukan kumpulan data mentah berupa tabel yang bisa diolah lebih lanjut di sini. <br />
            GiziGrowth menyediakan akses ke beragam koleksi dataset terkait stunting dan pangan.</div>
        </div>

        <div className="px-5 flex items-center justify-between flex-wrap">
            <form className="mt-5 p-0 w-fit border border-gray-700 bg-white focus:border-[#04724d] focus:border-[#04724d] focus:ring-[#04724d] focus:ring-[#04724d] flex items-center shadow-sm rounded-md">
                <input type="search" name="search" id="searchData" className='h-8 pr-0 text-gray-700 border-none rounded-md focus:ring-white/0' onChange={(e)=>setSearchEntry(e.target.value)}/>
                <div className='p-1 m-1 bg-[#94c73f]/60 text-white hover:bg-[#b4e75f] rounded-md cursor-pointer'><AiOutlineSearch className='fill-black'/></div>
            </form>

            <form className="flex items-center justify-center gap-2 translate-y-[23%]">
                <select name="" id="" className="h-9 py-0 rounded-lg bg-[#94c73f]/50 border-none text-black" onChange={(e)=>setYear(e.target.value)} defaultValue={table[0].tahun}>
                    {/* <option className="bg-white" disabled defaultValue>Tahun</option> */}
                    {Tahun[0]!=null && Tahun.map(item=>{
                        return <option key={item} value={item} className="bg-white" onClick={()=>Inertia.get('/gpoint', {year:item})}>{item}</option>
                    })}
                </select>
                <Link className="h-9 py-1.5 px-3 rounded-lg bg-[#94c73f]/50 border-none text-black" href={`/gpoint?year=${year}`}>Go</Link>
            </form>
        </div>

        <br />
        <br />

        <div>
            <Maps2 data={datasets}/>
        </div>

        <br />

        <div className='p-20 pb-5 bg-[#04724d] text-white'>
                <div className='pb-10 text-center text-xl font-bold'>Hubungi Kami</div>
                <div className='flex items-start justify-between'>
                    <div>
                        <div className='pb-3 text-lg font-bold'>Kontak Kami</div>
                        <div>GiziGrowth - GG, 14022, Indenesia</div>
                        <div>+6282114022140</div>
                        <div>gizigrowth@company.co</div>
                    </div>
                    <div>
                        <div className='pb-3 text-lg font-bold'>Tentang Kami</div>
                        <div className='flex items-center justify-center gap-5'>
                            <div>
                                <Link href='/'>Beranda</Link><br />
                                <Link href='/dataset'>Dataset</Link><br />
                                <Link href='/gpoint'>GPoint</Link>
                            </div>
                            <div>
                                <Link href='/gbot'>GBot</Link><br />
                                <Link href='/about'>Tentang</Link><br />
                                <Link href='/contact'>Hubungi Kami</Link>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className='pb-3 text-lg font-bold'>Tentang Perusahaan Kami</div>
                        <div className='flex items-center justify-between gap-5'>
                            <img src="../assets/images/Inknovation.png" alt="" className='w-28'/>
                            <div>Inknovation merupakan <br /> sebuah tim yang berasal <br /> dari Sekolah Vokasi IPB <br /> University, Program Studi <br /> Teknologi Rekayasa <br /> Perangkat Lunak</div>
                        </div>
                    </div>
                </div>
                <div className='pt-10 text-center text-sm'>Copyright &copy; 2023 Inknoovation - GiziGrowth</div>
            </div>
    </>
}

export default Index;