import { Head, Link } from "@inertiajs/react";
import React, { useEffect, useState } from "react";
import { Inertia } from '@inertiajs/inertia';
import TextInput from "@/Components/TextInput";

const EditDaerah=({dataProps})=>{
    let dataSet ={
        nama_daerah: dataProps.nama_daerah,
        kabupaten_kota: dataProps.kabupaten_kota,
        provinsi: dataProps.provinsi,
        shape_length: dataProps.shape_length,
        shape_area: dataProps.shape_area
    }
    const setNamaDaerah=(e)=>dataSet.nama_daerah = e;
    const setKabupatenKota=(e)=>dataSet.kabupaten_kota = e;
    const setProvinsi=(e)=>dataSet.provinsi = e;
    const setShapeLength=(e)=>dataSet.shape_length=e;
    const setShapeArea=(e)=>dataSet.shape_area=e;

    
    const handleSubmit=(e)=>{
        const Data = dataSet;
        Inertia.put(`/daerah/${e}`, Data);
    }

    return(
        <div className='flex justify-center items-center w-full'>
            <div className="rounded-3xl p-5 w-6/12 m-2 bg-white w-full">
                <h1 className="mb-2 text-center text-lg font-bold">Edit Data</h1>
                <TextInput 
                    type="text" 
                    name="nama_daerah" 
                    placeholder="Nama Daerah"
                    defaultValue={dataSet.nama_daerah}
                    className="w-full my-2"
                    onChange={(nama_daerah)=>setNamaDaerah(nama_daerah.target.value)}
                /><br />

                <TextInput 
                    type="text" 
                    name="kabupaten_kota" 
                    placeholder="Kabupaten/Kota" 
                    defaultValue={dataSet.kabupaten_kota}
                    className="w-full my-2"
                    onChange={(kabupaten_kota)=>setKabupatenKota(kabupaten_kota.target.value)}
                /><br />

                <TextInput 
                    type="text" 
                    name="provinsi" 
                    placeholder="Provinsi" 
                    defaultValue={dataSet.provinsi}
                    className="w-full my-2"
                    onChange={(provinsi)=>setProvinsi(provinsi.target.value)}
                /><br />

                <TextInput 
                    type="text" 
                    name="shape_length" 
                    placeholder="Shape Length"
                    defaultValue={dataSet.shape_length} 
                    className="w-full my-2"
                    onChange={(shape_length)=>setShapeLength(shape_length.target.value)}
                /><br />

                <TextInput 
                    type="text" 
                    name="shape_area"  
                    placeholder="Shape Area" 
                    defaultValue={dataSet.shape_area}
                    className="w-full my-2"
                    onChange={(shape_area)=>setShapeArea(shape_area.target.value)}
                /><br /><br />

                <button 
                    className="btn bg-[#94c73f] hover:bg-lime-600 text-gray-200 cursor-pointer m-2" 
                    onClick={()=>handleSubmit(dataProps.id)}
                >Save</button>

                <Link href={route('daerah')} className="btn bg-red-700 hover:bg-red-900 text-gray-200 cursor-pointer m-2">Cancel</Link>
            </div>
        </div>
    )
}

export default EditDaerah;