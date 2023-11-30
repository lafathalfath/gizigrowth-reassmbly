import { Head } from "@inertiajs/react";
import NavBar from "../NavigationBar";
import { AiFillEye } from "react-icons/ai";
import { HiDownload } from "react-icons/hi";
import { Inertia } from "@inertiajs/inertia";


const Download=(props)=>{
    const data = props.data_kasus_stunting;
    const pageTitle = `Data Kasus Stunting ${props.kunci}`;

    const handleDownload=(namaDaerah, Tahun)=>{
        const klasifikasi = {
            name: namaDaerah,
            tahun: Tahun
        }
        // console.log(klasifikasi.tahun);
        // Inertia.get('/stunting/download', klasifikasi);
        location.href = `/stunting/download?name=${klasifikasi.name}&tahun=${klasifikasi.tahun}`;
    }
    const handleDownloadCollect=(item)=>{
        let klasifikasi = {}
        if(props.kunci.slice(0,2) == '20'){
            klasifikasi = {tahun: item}
            location.href = `/stunting/download?tahun=${klasifikasi.tahun}`;
        }else{
            klasifikasi = {name: item}
            location.href = `/stunting/download?name=${klasifikasi.name}`;
        }
        // Inertia.get('/stunting/download', klasifikasi);
    }

    return <>
        <Head title={pageTitle}/>
        <div className="w-full fixed z-50">
            <NavBar user={props.user}/>
        </div>
        <div className="pt-16 px-5">
            <h1 className="py-5 text-[#94c73f] text-2xl font-bold">{pageTitle}</h1>
        </div>
        <div className="mx-5 p-5 bg-[#C9E39F] rounded-lg divide-y-2 divide-black/50">
            <div className="pb-5 flex items-center justify-between">
                <div className="text-xl font-bold">
                    Deskripsi Dataset
                </div>
                <div className='flex items-center justify-center gap-2'>
                    <AiFillEye className='text-xl'/>
                    <div>--</div>
                </div>
            </div>
            <div className="py-5 flex items-center justify-start gap-5">
                <div className="font-bold">
                    <div>Sumber</div>
                    <div>Pembuat</div>
                    <div>Terakhir diperbarui</div>
                </div>
                <div>
                    <div>--</div>
                    <div>--</div>
                    <div>{data[0].updated_at.slice(0,10)}</div>
                </div>
            </div>
            <div className="pt-5 divide-y-2 divide-black/10">
                <div className="py-2 flex items-center justify-between">
                    <div className="font-bold text-lg">Data Kasus Stunting {props.kunci}</div>
                    <button 
                        onClick={()=>handleDownloadCollect(props.kunci)} 
                        className="flex flex-col items-center justify-between font-bold bg-[#94c73f] hover:bg-[#aec73f] py-1 px-4 rounded-lg">
                        <HiDownload className="text-xl"/>
                        Unduh
                    </button>
                </div>
                {data[0]!=null && data.map(item=>{
                    return <div key={item.id} className="py-2 flex items-center justify-between">
                        {props.kunci.slice(0,2) == '20' ? 
                            <div className="font-bold text-lg">{item.nama_daerah}</div>
                            : <div className="font-bold text-lg">{item.tahun}</div>
                        }
                        <button 
                            onClick={()=>handleDownload(item.nama_daerah, item.tahun)} 
                            className="flex flex-col items-center justify-between font-bold bg-[#94c73f] hover:bg-[#aec73f] py-1 px-4 rounded-lg">
                            <HiDownload className="text-xl"/>
                            Unduh
                        </button>
                    </div>
                })}
            </div>
        </div>
    </>
}

export default Download;