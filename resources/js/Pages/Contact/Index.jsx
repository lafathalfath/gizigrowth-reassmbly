import { Head, Link } from "@inertiajs/react";
import React, { useState } from "react";
import NavBar from "../NavigationBar";
import { FaPhoneVolume } from 'react-icons/fa';
import { GrMail } from 'react-icons/gr';
import { MdLocationOn } from 'react-icons/md';
import { BsDiscord } from 'react-icons/bs';
import { AiFillWarning, AiOutlineInstagram, AiOutlineTwitter } from "react-icons/ai";
import { Inertia } from "@inertiajs/inertia";

const Index = ({auth}) => {
    let feedback = {
        namaDepan: null,
        namaBelakang: null,
        email: null,
        noTelp: null,
        pesan: null
    };
    const setNamaDepan=(e)=>feedback.namaDepan=e;
    const setNamaBelakang=(e)=>feedback.namaBelakang=e;
    const setEmail=(e)=>feedback.email=e;
    const setNoTelp=(e)=>feedback.noTelp=e;
    const setPesan=(e)=>feedback.pesan=e;

    const handleSubmit=()=>{
        Inertia.post('/contact/feedback', feedback);
        location.reload();
        setNamaDepan(null);
        setNamaBelakang(null);
        setEmail(null);
        setNoTelp(null);
        setPesan(null);
    }

    const closeNotif=()=>{
        document.getElementById('notifNull').style.display = 'none';
    }
    return(
        <>
            <Head title="Hubungi Kami"/>
            <div className="fixed z-50 w-full">
                <NavBar user={auth.user}/>
            </div>
            <div className="pt-16 px-5 h-[95vh]">
                <div className="w-full h-full my-5 p-2 bg-white rounded-lg shadow-xl border flex items-center justify-center">
                    <div className="w-[50%] h-full p-10 rounded-lg bg-[#94c73f] relative overflow-hidden flex flex-col items-start justify-between">
                        <div className="h-32 w-32 bg-[#AFD56F] rounded-full absolute bottom-12 right-12"></div>
                        <div className="h-52 w-52 bg-[#CAE39F] rounded-full absolute bottom-0 right-0 translate-x-[25%] translate-y-[25%]"></div>
                        <div></div>
                        <div className="text-white text-xl font-bold z-10 absolute">Informasi Kontak</div>
                        <div className="text-white flex flex-col gap-10 z-10">
                            <Link href='#' className="flex items-center gap-5"><FaPhoneVolume className="text-lg"/> +6282114022140</Link>
                            <Link href='#' className="flex items-center gap-5"><GrMail className="text-lg"/> gizigrowth@company.co</Link>
                            <Link href='#' className="flex items-center gap-5"><MdLocationOn className="text-lg"/> GiziGrowth - GG, Kota Bogor, 14022, Indonesia</Link>
                        </div>
                        <div className="flex items-center gap-5 z-10">
                            <Link href='#' className="p-2 bg-white rounded-full"><AiOutlineTwitter/></Link>
                            <Link href='#' className="p-2 bg-white rounded-full"><AiOutlineInstagram/></Link>
                            <Link href='#' className="p-2 bg-white rounded-full"><BsDiscord/></Link>
                        </div>
                    </div>
                    <div className="w-full h-full p-10">
                        <div  className="w-full h-full flex flex-col items-end justify-start gap-10">
                            <div className="w-full flex items-center gap-5">
                                <div  className="w-full">
                                    <label htmlFor="namaDepan" className="text-xs">Nama Depan</label><br />
                                    <input type="text" name="namaDepan" id="" className="p-1 pb-0 w-full border-b-2 border-t-0 border-x-0 focus:border-[#94c73f]" onChange={(namaDepan)=>setNamaDepan(namaDepan.target.value)}/>
                                </div>
                                <div  className="w-full">
                                    <label htmlFor="namaBelakang" className="text-xs">Nama Belakang</label><br />
                                    <input type="text" name="namaBelakang" id="" className="p-1 pb-0 w-full border-b-2 border-t-0 border-x-0 focus:border-[#94c73f]" onChange={(namaBelakang)=>setNamaBelakang(namaBelakang.target.value)}/>
                                </div>
                            </div>
                            <div className="w-full flex items-center gap-5">
                                <div  className="w-full">
                                    <label htmlFor="email" className="text-xs">Email</label><br />
                                    <input type="email" name="email" id="" className="p-1 pb-0 w-full border-b-2 border-t-0 border-x-0 focus:border-[#94c73f]" onChange={(email)=>setEmail(email.target.value)}/>
                                </div>
                                <div  className="w-full">
                                    <label htmlFor="noTelp" className="text-xs">Nomor Telepon</label><br />
                                    <div className="flex items-end justify-between gap-3">
                                        <div className="pb-0.5">+62</div>
                                        <input type="tel" name="noTelp" id="" className="p-1 pb-0 w-full border-b-2 border-t-0 border-x-0 focus:border-[#94c73f]" onChange={(noTelp)=>setNoTelp(noTelp.target.value)}/>
                                    </div>
                                </div>
                            </div>
                            <div  className="w-full">
                                <label htmlFor="pesan" className="text-xs">Pesan</label><br />
                                <input type="text" name="pesan" id="" placeholder="Tulis Pesanmu ..." className="p-1 w-full border-b-2 border-t-0 border-x-0 focus:border-[#94c73f]" onChange={(pesan)=>setPesan(pesan.target.value)}/>
                            </div>
                            <button className="py-3 px-6 w-fit bg-[#94c73f] text-white shadow-lg rounded-md cursor-pointer" onClick={()=>{
                                if (feedback.namaDepan!=null && feedback.namaDepan!=null && feedback.email!=null && feedback.noTelp!=null && feedback.pesan!==null) {
                                    document.getElementById('submitModal').showModal();
                                }else{
                                    document.getElementById('notifNull').style.display = 'block';
                                    setTimeout(() => {
                                        document.getElementById('notifNull').style.display = 'none';
                                    }, 5000);
                                }
                            }}>Kirim Pesan</button>
                        </div>
                    </div>
                </div>
            </div>

            <dialog id="submitModal" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg text-center">Konfirmasi</h3>
                    <p className="py-4">Kirim pesan sekarang?</p>
                    <div className="w-full flex justify-end">
                        <button className='btn bg-[#94c73f] hover:bg-[#74a71f] mr-5 text-gray-200'
                            id='submitButton'
                            onClick={handleSubmit}
                        >Kirim</button>
                        <button className='btn' onClick={()=>document.getElementById('submitModal').close()}>Batal</button>
                    </div>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>

            <button onClick={closeNotif} id='notifNull' className={`mt-16 p-0 toast toast-top toast-center top-10 hidden`}>
                <div className="alert alert-warning">
                    <span>
                        <AiFillWarning />
                    </span>
                    <span className='text-[#1b2021]'>Isi form dengan lengkap!</span>
                </div>
            </button>
        </>
    )
}

export default Index;