import { Head, Link } from "@inertiajs/react";
import React, { useState } from "react";
import { Inertia } from '@inertiajs/inertia';
import TextInput from "@/Components/TextInput";

const EditLokasi=({dataProps})=>{
    let dataSet = {
        nama_lokasi: dataProps.nama_lokasi,
        kabupaten_kota: dataProps.kabupaten_kota,
        provinsi: dataProps.provinsi,
        koordinat_x: dataProps.koordinat_x,
        koordinat_y: dataProps.koordinat_y
    };
    const setNamaLokasi=(e)=>dataSet.nama_lokasi=e;
    const setKabupatenKota=(e)=>dataSet.kabupaten_kota=e;
    const setProvinsi=(e)=>dataSet.provinsi=e;
    const setKoordinatX=(e)=>dataSet.koordinat_x=e;
    const setKoordinatY=(e)=>dataSet.koordinat_y=e;

    const handleSubmit = (e) =>{
        const Data = dataSet;
        Inertia.put(`/lokasi/${e}`, Data);
    }

    return(
        <div className='flex justify-center items-center w-full'>
            <div className="rounded-3xl p-5 w-6/12 m-2 bg-white w-full">
                <h1 className="mb-2 text-center text-lg font-bold">Edit Data</h1>
                <TextInput 
                    type="text" 
                    name="nama_lokasi" 
                    placeholder="Nama Lokasi"
                    defaultValue={dataProps.nama_lokasi}
                    className="w-full my-2"
                    onChange={(nama_lokasi)=>setNamaLokasi(nama_lokasi.target.value)}
                /><br />

                <TextInput 
                    type="text" 
                    name="kabupaten_kota" 
                    placeholder="Kabupaten/Kota" 
                    defaultValue={dataProps.kabupaten_kota}
                    className="w-full my-2"
                    onChange={(kabupaten_kota)=>setKabupatenKota(kabupaten_kota.target.value)}
                /><br />

                <TextInput 
                    type="text" 
                    name="provinsi" 
                    placeholder="Provinsi" 
                    defaultValue={dataProps.provinsi}
                    className="w-full my-2"
                    onChange={(provinsi)=>setProvinsi(provinsi.target.value)}
                /><br />

                <TextInput 
                    type="text" 
                    name="koordinat_x" 
                    placeholder="Longitude"
                    defaultValue={dataProps.koordinat_x} 
                    className="w-full my-2"
                    onChange={(koordinat_x)=>setKoordinatX(koordinat_x.target.value)}
                /><br />

                <TextInput 
                    type="text" 
                    name="koordinat_y"  
                    placeholder="Latitude" 
                    defaultValue={dataProps.koordinat_y}
                    className="w-full my-2"
                    onChange={(koordinat_y)=>setKoordinatY(koordinat_y.target.value)}
                /><br /><br />

                <button 
                    // type='submit' 
                    className="btn bg-[#94c73f] hover:bg-lime-600 text-gray-200 cursor-pointer m-2" 
                    onClick={()=>handleSubmit(dataProps.id)}
                >Save</button>

                <Link href="/lokasi" className="btn bg-red-700 hover:bg-red-900 text-gray-200 cursor-pointer m-2">Cancel</Link>
            </div>
        </div>
    )
}

export default EditLokasi;