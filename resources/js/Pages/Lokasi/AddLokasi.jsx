import { Link } from "@inertiajs/react";
import React, { useState } from "react";
import { Inertia } from '@inertiajs/inertia';
import TextInput from "@/Components/TextInput";

const AddLokasi=(props)=>{
    const [namaLokasi, setNamaLokasi] = useState('');
    const [kabupatenKota, setKabupatenKota] = useState('');
    const [provinsi, setProvinsi] = useState('');
    const [koordinatX, setKoordinatX] = useState('');
    const [koordinatY, setKoordinatY] = useState('');

    const [importCSV, setImportCSV] = useState(false);

    const handleSubmit = () =>{
        const data = {
            namaLokasi, kabupatenKota, provinsi, koordinatX, koordinatY
        }
        if (namaLokasi != '' || kabupatenKota!=='' || provinsi!='' || koordinatX!='' || koordinatY!='') {
            Inertia.post('/lokasi/store', data);
        }else{
            document.getElementById('notifNull').style.display = 'block';
            setTimeout(() => {
                document.getElementById('notifNull').style.display = 'none';
            }, 5000);
        }
    }

    let fileData = null;
    const setFileData=(e)=>fileData=e;
    const handleFileChange=(e)=>setFileData(e.target.files[0]);
    const handleSubmitCSV=()=>{
        if (fileData != null) {
            // console.log('bakekok');
            const formData = new FormData();
            formData.append('file', fileData);
            Inertia.post('/lokasi/file/store', formData);
        }else{
            document.getElementById('notifNull').style.display = 'block';
            setTimeout(() => {
                document.getElementById('notifNull').style.display = 'none';
            }, 5000);
        }
    }

    const closeNotif=()=>{
        document.getElementById('notifNull').style.display = 'none';
    }

    return(
        <div className='flex justify-center items-center w-full'>
            <div className="rounded-3xl p-5 w-6/12 m-2 bg-white w-full">
                <h1 className="mb-2 text-center text-lg font-bold">Tambah Data</h1>

                <button onClick={closeNotif} id='notifNull' className={`p-0 toast toast-top toast-center top-10 hidden`}>
                    <div className="alert alert-warning">
                        <span>
                            <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512" className='fill-[#1b2021]'><path d="M256 32c14.2 0 27.3 7.5 34.5 19.8l216 368c7.3 12.4 7.3 27.7 .2 40.1S486.3 480 472 480H40c-14.3 0-27.6-7.7-34.7-20.1s-7-27.8 .2-40.1l216-368C228.7 39.5 241.8 32 256 32zm0 128c-13.3 0-24 10.7-24 24V296c0 13.3 10.7 24 24 24s24-10.7 24-24V184c0-13.3-10.7-24-24-24zm32 224a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z"/></svg>
                        </span>
                        <span className='text-[#1b2021]'>{!importCSV ? 'Isi form dengan lengkap': 'Tidak ada file yang dipilih'}</span>
                    </div>
                </button>

                <div className="p-1 w-fit border border-gray-300 rounded rounded-full">
                    <button className={`p-1 mx-1 text-xs  ${!importCSV && 'px-3 text-white bg-[#94c73f] rounded rounded-full'}`} onClick={()=>setImportCSV(false)}>Form</button>
                    <button className={`p-1 mx-1 text-xs ${importCSV && 'px-3 text-white bg-[#94c73f] rounded rounded-full'}`} onClick={()=>setImportCSV(true)}>Import CSV</button>
                </div>
                {!importCSV ? 
                    <div>
                        <TextInput 
                            type="text" 
                            name="nama_lokasi" 
                            placeholder="Nama Lokasi"
                            // value={formData.nama_lokasi}
                            className="w-full my-2"
                            onChange={(namaLokasi)=>setNamaLokasi(namaLokasi.target.value)}
                        /><br />

                        <TextInput 
                            type="text" 
                            name="kabupaten_kota" 
                            placeholder="Kabupaten/Kota" 
                            // value={formData.kabupaten_kota}
                            className="w-full my-2"
                            onChange={(kabupatenKota)=>setKabupatenKota(kabupatenKota.target.value)}
                        /><br />

                        <TextInput 
                            type="text" 
                            name="provinsi" 
                            placeholder="Provinsi" 
                            // value={formData.provinsi}
                            className="w-full my-2"
                            onChange={(provinsi)=>setProvinsi(provinsi.target.value)}
                        /><br />

                        <TextInput 
                            type="text" 
                            name="koordinat_x" 
                            placeholder="Longitude"
                            // value={formData.koordinat_x} 
                            className="w-full my-2"
                            onChange={(koordinatX)=>setKoordinatX(koordinatX.target.value)}
                        /><br />

                        <TextInput 
                            type="text" 
                            name="koordinat_y"  
                            placeholder="Latitude" 
                            // value={formData.koordinat_y}
                            className="w-full my-2"
                            onChange={(koordinatY)=>setKoordinatY(koordinatY.target.value)}
                        />
                    </div>
                    : <div>
                        <input type="file" name="dataTabel" accept=".csv" className="file:w-full file:rounded-full file:flex file:center file:bg-[#1b2021] hover:file:bg-zinc-700 file-input my-3 w-full h-64 border border-gray-300 rounded-lg p-5"
                        onChange={handleFileChange}
                        />
                        <label htmlFor="dataTabel" className='text-xs text-gray-400 m-0 p-0'>Allowed extention: (.csv)</label>
                    </div>
                }


                {!importCSV ? 
                    <button
                        className="btn bg-[#94c73f] hover:bg-lime-600 text-gray-200 cursor-pointer m-2" 
                        onClick={()=>handleSubmit()}
                    >Save</button>
                    : <button
                        className="btn bg-[#94c73f] hover:bg-lime-600 text-gray-200 cursor-pointer m-2" 
                        onClick={()=>handleSubmitCSV()}
                    >Save</button>
                }
                <Link href={route('lokasi')} className="btn bg-red-700 hover:bg-red-900 text-gray-200 cursor-pointer m-2">Cancel</Link>
            </div>
        </div>
    )
}

export default AddLokasi;