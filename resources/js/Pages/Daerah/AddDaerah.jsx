import { Head, Link } from "@inertiajs/react";
import React, { useState } from "react";
import { Inertia } from '@inertiajs/inertia';
import TextInput from "@/Components/TextInput";
import { AiFillWarning } from "react-icons/ai";

const AddDaerah=(props)=>{
    const [namaDaerah, setNamaDaerah] = useState('');
    const [kabupatenKota, setKabupatenKota] = useState('');
    const [provinsi, setProvinsi] = useState('');
    const [shapeLength, setShapeLength] = useState('');
    const [shapeArea, setShapeArea] = useState('');

    const closeNotif=()=>{
        document.getElementById('notifNull').style.display = 'none';
    }

    const handleSubmit = () =>{
        const data = {
            namaDaerah, kabupatenKota, provinsi, shapeLength, shapeArea
        }
        if (namaDaerah == '' || kabupatenKota =='' || provinsi =='' || shapeLength =='' || shapeArea == '') {
            document.getElementById('notifNull').style.display = 'block';
            setTimeout(() => {
                document.getElementById('notifNull').style.display = 'none';
            }, 5000);
        }else{
            Inertia.post('/daerah/store', data);
            // console.log(data);
        }
    }

    let fileData = null;
    const setFileData=(e)=>fileData=e;
    const handleFileChange=(e)=>{
        setFileData(e.target.files[0]);
    }
    const handleUploadCSV=()=>{
        if(fileData != null){
            // console.log('upload excel');
            const formData = new FormData();
            formData.append('file', fileData);
            Inertia.post('/daerah/file/store', formData);
        }else{
            document.getElementById('notifNull').style.display = 'block';
            setTimeout(() => {
                document.getElementById('notifNull').style.display = 'none';
            }, 5000);
        }
    }

    const [importCSV, setImportCSV] = useState(false);

    return(
        <div className='flex justify-center items-center w-full'>
            <div className="rounded-3xl p-5 w-6/12 m-2 bg-white w-full">
                <h1 className="mb-2 text-center text-lg font-bold">Tambah Data</h1>

                <button onClick={closeNotif} id='notifNull' className={`p-0 toast toast-top toast-center top-10 hidden`}>
                    <div className="alert alert-warning">
                        <span>
                            <AiFillWarning />
                        </span>
                        <span className='text-[#1b2021]'>{!importCSV ? 'Isi form dengan lengkap': 'Tidak ada file yang dipilih'}</span>
                    </div>
                </button>

                <div className="p-1 w-fit border border-gray-300 rounded rounded-full">
                    <button className={`p-1 mx-1 text-xs  ${!importCSV && 'px-3 text-white bg-[#94c73f] rounded rounded-full'}`} onClick={()=>setImportCSV(false)}>Form</button>
                    <button className={`p-1 mx-1 text-xs ${importCSV && 'px-3 text-white bg-[#94c73f] rounded rounded-full'}`} onClick={()=>setImportCSV(true)}>Import File</button>
                </div>
                { !importCSV ? 
                    <div>
                        <TextInput 
                            type="text" 
                            name="nama_daerah" 
                            placeholder="Nama Daerah"
                            className="w-full my-2"
                            onChange={(namaDaerah)=>setNamaDaerah(namaDaerah.target.value)}
                        /><br />

                        <TextInput 
                            type="text" 
                            name="kabupaten_kota" 
                            placeholder="Kabupaten/Kota" 
                            className="w-full my-2"
                            onChange={(kabupatenKota)=>setKabupatenKota(kabupatenKota.target.value)}
                        /><br />

                        <TextInput 
                            type="text" 
                            name="provinsi" 
                            placeholder="Provinsi" 
                            className="w-full my-2"
                            onChange={(provinsi)=>setProvinsi(provinsi.target.value)}
                        /><br />

                        <TextInput 
                            type="text" 
                            name="shape_length" 
                            placeholder="Shape Length"
                            className="w-full my-2"
                            onChange={(shapeLength)=>setShapeLength(shapeLength.target.value)}
                        /><br />

                        <TextInput 
                            type="text" 
                            name="shape_area"  
                            placeholder="Shape Area"
                            className="w-full my-2"
                            onChange={(shapeArea)=>setShapeArea(shapeArea.target.value)}
                        />
                    </div>
                    : <div>
                        <input type="file" name="dataTabel" accept=".xlsx, .csv" className="file:w-full file:rounded-full file:flex file:center file:bg-[#1b2021] hover:file:bg-zinc-700 file-input my-3 w-full h-64 border border-gray-300 rounded-lg p-5"
                        onChange={handleFileChange}
                        />
                        <label htmlFor="dataTabel" className='text-xs text-gray-400 m-0 p-0'>Allowed extention: .csv/.xlsx</label>
                    </div>
                }
                
                {!importCSV ? 
                <button
                    className="btn bg-[#94c73f] hover:bg-lime-600 text-gray-200 cursor-pointer ml-0 m-2" 
                    onClick={()=>handleSubmit()}
                >Save</button>
                :<button 
                    className="btn bg-[#94c73f] hover:bg-lime-600 text-gray-200 cursor-pointer ml-0 m-2" 
                    onClick={()=>handleUploadCSV()}
                >Save</button>
                }

                <Link href={route('daerah')} className="btn bg-red-700 hover:bg-red-900 text-gray-200 cursor-pointer m-2">Cancel</Link>
            </div>
        </div>
    )
}

export default AddDaerah;