import TextInput from "@/Components/TextInput";
import { Inertia } from "@inertiajs/inertia";
import { Link } from "@inertiajs/react";
import { useState } from "react";
import { AiFillWarning } from "react-icons/ai";

const AddStunting=(props)=>{
    let nama_daerah = null;
    let tahun = null;
    let jumlah_anak = null;
    let jumlah_kasus_stunting = null;
    const setNamaDaerah=(e)=>nama_daerah=e;
    const setTahun=(e)=>tahun=e;
    const setJumlahAnak=(e)=>jumlah_anak=e;
    const setJumlahKasus=(e)=>jumlah_kasus_stunting=e;
    const [nullNotif, setNullNotif] = useState(false);
    const handleSubmitForm=()=>{
        const data = {nama_daerah, tahun, jumlah_anak, jumlah_kasus_stunting};
        if(nama_daerah != null && tahun != null && jumlah_kasus_stunting != null){
            setNullNotif(false);
            Inertia.post('/kasus_stunting/store', data);
        }else{
            setNullNotif(true);
            setTimeout(()=>{setNullNotif(false)}, 5000);
        }
    }

    const [importCSV, setImportCSV] = useState(false);
    const [fileData, setFileData] = useState(null);
    const handleFileChange=(e)=>setFileData(e.target.files[0]);
    const handleUploadFile=()=>{
        if(fileData != null){
            const formData = new FormData();
            formData.append('file', fileData);
            Inertia.post('/kasus_stunting/file/store', formData);
        }else{
            setNullNotif(true);
            setTimeout(()=>{
                setNullNotif(false);
            }, 5000);
        }
    }

    return(
        <>
            <div className="rounded-3xl p-5 w-6/12 bg-white w-full">
                <h1 className="mb-2 text-center text-lg font-bold">Tambah Data</h1>

                {nullNotif &&
                    <button onClick={()=>setNullNotif(false)} className={`p-0 toast toast-top toast-center top-10`}>
                        <div className="alert alert-warning">
                            <span>
                                <AiFillWarning />
                            </span>
                            <span className='text-[#1b2021]'>
                                {!importCSV ? 'Isi form dengan lengkap': 'Tidak ada file yang dipilih'}
                            </span>
                        </div>
                    </button>
                }

                <div className="p-1 w-fit border border-gray-300 rounded rounded-full">
                    <button className={`p-1 mx-1 text-xs  ${!importCSV && 'px-3 text-white bg-[#94c73f] rounded rounded-full'}`} onClick={()=>setImportCSV(false)}>Form</button>
                    <button className={`p-1 mx-1 text-xs ${importCSV && 'px-3 text-white bg-[#94c73f] rounded rounded-full'}`} onClick={()=>setImportCSV(true)}>Import File</button>
                </div>

                {!importCSV ? 
                    <form onSubmit={()=>handleSubmitForm()}>
                        <TextInput
                            type='text'
                            name="nama_daerah"
                            placeholder="Nama Daerah"
                            className="w-full my-2"
                            onChange={(nama_daerah) => setNamaDaerah(nama_daerah.target.value)}
                            required = {true}
                        />
                        <TextInput
                            type='text'
                            name="tahun"
                            placeholder="Tahun"
                            className="w-full my-2"
                            onChange={(tahun)=>setTahun(tahun.target.value)}
                            required = {true}
                        />
                        <TextInput
                            type='text'
                            name="jumlah_kasus_stunting"
                            placeholder="Jumlah Kasus"
                            className="w-full my-2"
                            onChange={(jumlah_kasus_stunting)=>setJumlahKasus(jumlah_kasus_stunting.target.value)}
                            required = {true}
                        />
                        <TextInput
                            type='text'
                            name="jumlah_anak"
                            placeholder="Jumlah Anak"
                            className="w-full my-2"
                            onChange={(jumlahanak)=>setJumlahAnak(jumlahanak.target.value)}
                            required = {true}
                        />
                        <button className="hidden"></button>
                    </form>
                    : <div>
                        <input type="file" name="dataTabel" accept=".csv, .xlsx" className="file:w-full file:rounded-full file:flex file:center file:bg-[#1b2021] hover:file:bg-zinc-700 file-input my-3 w-full h-64 border border-gray-300 rounded-lg p-5"
                        onChange={handleFileChange}
                        />
                        <label htmlFor="dataTabel" className='text-xs text-gray-400 m-0 p-0'>Allowed extention: .xlsx/.csv</label>
                    </div>
                }
                {!importCSV ?
                <button
                    className="btn bg-[#94c73f] hover:bg-lime-600 text-gray-200 cursor-pointer ml-0 m-2" 
                    onClick={()=>handleSubmitForm()}
                >Save</button>
                : <button
                    className="btn bg-[#94c73f] hover:bg-lime-600 text-gray-200 cursor-pointer ml-0 m-2" 
                    onClick={()=>handleUploadFile()}
                >Save</button>
                }
                
                <Link href='/kasus_stunting' className="btn bg-red-700 hover:bg-red-900 text-gray-200 cursor-pointer m-2">Cancel</Link>
            </div>
        </>
    )
}

export default AddStunting;