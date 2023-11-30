import TextInput from "@/Components/TextInput";
import { Inertia } from "@inertiajs/inertia";
import { Link } from "@inertiajs/react";

const EditStunting=({defaultData})=>{
    let nama_daerah = defaultData.nama_daerah;
    let tahun = defaultData.tahun;
    let jumlah_anak = defaultData.jumlah_anak;
    let jumlah_kasus_stunting = defaultData.jumlah_kasus_stunting;
    const setNamaDaerah=(e)=>nama_daerah=e;
    const setTahun=(e)=>tahun=e;
    const setJumlahAnak=(e)=>jumlah_anak=e;
    const setJumlahKasus=(e)=>jumlah_kasus_stunting=e;

    const handleSubmitForm=()=>{
        const data={nama_daerah, tahun, jumlah_anak, jumlah_kasus_stunting};
        Inertia.put(`/kasus_stunting/${defaultData.id}/update`, data);
    }
    return(
        <>
            <div className="rounded-3xl p-5 w-6/12 bg-white w-full">
                <h1 className="mb-2 text-center text-lg font-bold">Edit Data</h1>
                <form onSubmit={()=>handleSubmitForm()}>
                    <TextInput
                        type='text'
                        name="nama_daerah"
                        placeholder="Nama Daerah"
                        className="w-full my-2"
                        defaultValue={defaultData.nama_daerah}
                        onChange={(nama_daerah) => setNamaDaerah(nama_daerah.target.value)}
                        required = {true}
                    />
                    <TextInput
                        type='text'
                        name="tahun"
                        placeholder="Tahun"
                        className="w-full my-2"
                        defaultValue={defaultData.tahun}
                        onChange={(tahun)=>setTahun(tahun.target.value)}
                        required = {true}
                    />
                    <TextInput
                        type='text'
                        name="jumlah_kasus_stunting"
                        placeholder="Jumlah Kasus"
                        className="w-full my-2"
                        defaultValue={defaultData.jumlah_kasus_stunting}
                        onChange={(jumlah_kasus_stunting)=>setJumlahKasus(jumlah_kasus_stunting.target.value)}
                        required = {true}
                    />
                    <TextInput
                        type='text'
                        name="jumlah_anak"
                        placeholder="Jumlah Anak"
                        className="w-full my-2"
                        defaultValue={defaultData.jumlah_anak}
                        onChange={(jumlah_anak)=>setJumlahAnak(jumlah_anak.target.value)}
                        required = {true}
                    />
                    <button className="hidden"></button>
                </form>

                <button
                    className="btn bg-[#94c73f] hover:bg-lime-600 text-gray-200 cursor-pointer ml-0 m-2" 
                    onClick={()=>handleSubmitForm()}
                >Save</button>
                
                <Link href='/kasus_stunting' className="btn bg-red-700 hover:bg-red-900 text-gray-200 cursor-pointer m-2">Cancel</Link>
            </div>
        </>
    )
}

export default EditStunting;