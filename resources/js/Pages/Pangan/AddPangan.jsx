import TextInput from "@/Components/TextInput";
import { Link } from "@inertiajs/react";
import { useState } from "react";
import { AiFillWarning } from "react-icons/ai";


const AddPangan=()=>{

    const [data, setData] = useState({nama_lokasi: null, tahun:null, ketersediaan_pangan:null, jenis_pangan:null});
    // console.log(data);

    const [nullNotif, setNullNotif] = useState(false);
    const handleSubmitForm=()=>{
        if(data.nama_lokasi != null && data.tahun != null && data.ketersediaan_pangan != null && data.jenis_pangan != null){
            setNullNotif(false);
            Inertia.post('/ketahanan_pangan/store', data);
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
            Inertia.post('/ketahanan_pangan/file/store', formData);
        }else{
            setNullNotif(true);
            setTimeout(()=>{
                setNullNotif(false);
            }, 5000);
        }
    }

    return <div className="rounded-3xl p-5 w-6/12 bg-white w-full">


        <div className="p-1 w-fit border border-gray-300 rounded rounded-full">
            <button className={`p-1 mx-1 text-xs  ${!importCSV && 'px-3 text-white bg-[#94c73f] rounded rounded-full'}`} onClick={()=>setImportCSV(false)}>Form</button>
            <button className={`p-1 mx-1 text-xs ${importCSV && 'px-3 text-white bg-[#94c73f] rounded rounded-full'}`} onClick={()=>setImportCSV(true)}>Import File</button>
        </div>

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

        {!importCSV ? 
            <form onSubmit={()=>handleSubmitForm()}>
                <TextInput
                    type='text'
                    name="nama_daerah"
                    placeholder="Nama Lokasi"
                    className="w-full my-2"
                    onChange={(e) => setData({nama_lokasi: e.target.value, tahun: data.tahun, ketersediaan_pangan:data.ketersediaan_pangan, jenis_pangan:data.jenis_pangan})}
                    required = {true}
                />
                <TextInput
                    type='text'
                    name="tahun"
                    placeholder="Tahun"
                    className="w-full my-2"
                    onChange={(e)=>setData({nama_lokasi: data.nama_lokasi, tahun: e.target.value, ketersediaan_pangan:data.ketersediaan_pangan, jenis_pangan:data.jenis_pangan})}
                    required = {true}
                />
                <TextInput
                    type='text'
                    name="jumlah_kasus_stunting"
                    placeholder="Ketersediaan Pangan"
                    className="w-full my-2"
                    onChange={(e)=>setData({nama_lokasi: data.nama_lokasi, tahun:data.tahun, ketersediaan_pangan: e.target.value, jenis_pangan:data.jenis_pangan})}
                    required = {true}
                />
                <TextInput
                    type='text'
                    name="jumlah_anak"
                    placeholder="Jenis Pangan"
                    className="w-full my-2"
                    onChange={(e)=>setData({nama_lokasi: data.nama_lokasi, tahun: data.tahun, ketersediaan_pangan:data.ketersediaan_pangan, jenis_pangan: e.target.value})}
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

        <Link href='/ketahanan_pangan' className="btn bg-red-700 hover:bg-red-900 text-gray-200 cursor-pointer m-2">Cancel</Link>
    </div>
}

export default AddPangan;