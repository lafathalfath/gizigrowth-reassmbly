import DangerButton from "@/Components/DangerButton";
import UserProfileImage from "@/Components/UserProfileImage";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Inertia } from "@inertiajs/inertia";
import { Head, Link } from '@inertiajs/react';
import { useEffect, useState } from "react";
import { AiFillCamera, AiFillDelete, AiFillEdit, AiFillEye, AiFillWarning, AiOutlineClose } from 'react-icons/ai';


const Index=({auth})=>{
    const user = auth.user;

    const [showIcon, setShowIcon] = useState(false);
    // const [image, setImage] = useState(null);
    let image = null;
    const setImage=(e)=>image=e;
    const handleFileChange=(e)=>{
        setImage(e.target.files[0]);
    }
    const closeNotif=()=>{
        document.getElementById('notifNull').style.display = 'none';
    }
    const handleUploadFile=()=>{
        if(image != null){
            const formData = new FormData();
            formData.append('file', image);
            Inertia.post('/profile/photo', formData);
            location.href = '/profile';
            location.reload();
        }else{
            document.getElementById('notifNull').style.display = 'block';
            setTimeout(() => {
                document.getElementById('notifNull').style.display = 'none';
            }, 5000);
        }
    }

    return(
        <AuthenticatedLayout
            user={user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Profile</h2>}
        >
            <Head title="Profile"/>


            <dialog id="uploadImage" className="modal">
                <div className="modal-box">

                    <button onClick={closeNotif} id='notifNull' className={`p-0 toast toast-top toast-center top-10 hidden`}>
                        <div className="alert alert-warning">
                            <span>
                                <AiFillWarning />
                            </span>
                            <span className='text-[#1b2021]'>Tidak ada file yang dipilih</span>
                        </div>
                    </button>

                    <h3 className="font-bold text-lg text-center">Upload Gambar</h3>
                    <div>
                        <input type="file" id="custom-input" name="image" accept="image/*" onChange={handleFileChange} className="mb-5 p-2 w-full h-64 border border-gray-300 rounded-lg flex items-center justify-center file:bg-zinc-700 file:text-gray-200 file:border-none file:rounded-full file:py-2 file:px-4 file:w-full file:flex file:items-center"/>
                        <div>
                            <button className='btn btn-sm bg-[#94c73f] hover:bg-[#94d74f] mr-5 text-gray-200' id='uploadImageButton' onClick={()=>handleUploadFile()}>Save</button>
                            <div className='btn btn-sm bg-red-700 hover:bg-red-900 text-gray-200' onClick={(image)=>{
                                document.getElementById('uploadImage').close();
                                setImage(null);
                                }}>Cancel</div>
                        </div>
                    </div>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>

            <dialog id="imageOverview" className="modal p-0 m-0 rounded-none">
                <div className="modal-box p-0 m-0 rounded-none">
                    <div className="relative">
                        <UserProfileImage src={auth.user.profile_image} className='w-full rounded-none'/>
                        <div className='btn btn-sm px-[6px] m-2 border-none rounded-full bg-black/25 hover:bg-black/75 absolute top-0 right-0 focus:border-none' onClick={()=>{
                            document.getElementById('imageOverview').close();
                            setImage(null);
                            }}><AiOutlineClose className="w-5 h-5 text-white"/></div>
                        <div className="py-2 px-5 absolute bottom-0 left-[50%] -translate-x-1/2">
                            <button className='p-2 m-2 bg-black/25 hover:bg-black/75 text-white rounded-full focus:boder-none' onClick={()=>{
                                document.getElementById('imageOverview').close();
                                document.getElementById('uploadImage').showModal();
                                }}>
                                    <AiFillEdit />
                            </button>
                            <button className='p-2 m-2 bg-black/25 hover:bg-black/75 text-white rounded-full focus:boder-none'
                                onClick={()=>document.getElementById('confirmDelete').showModal()}
                                >
                                <AiFillDelete />
                            </button>
                        </div>
                    </div>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>

            <dialog id="confirmDelete" className="modal p-0 m-0 rounded-none">
                <div className="modal-box">
                    <h2>Apakah Anda yakin ingin menghapus foto profil?</h2>
                    <div>
                        <DangerButton onClick={()=>{Inertia.delete(route('deletePhotoProfile')); location.reload();}}>Ya</DangerButton>
                        <button className="py-1.5 px-4 rounded-lg ml-5 bg-gray-100 hover:bg-gray-200" onClick={()=>document.getElementById('confirmDelete').close()}>tidak</button>
                    </div>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="p-4 sm:p-8 bg-white shadow shadow-lg sm:rounded-lg">
                        <div className="flex gap-10 items-center h-fit mb-5">
                            <div>
                            {auth.user.profile_image ? 
                                <div className={`w-fit h-fit rounded-full cursor-pointer ${showIcon && 'mix-blend-multiply bg-zinc-500'} relative`} onMouseOver={()=>setShowIcon(true)} onMouseOut={()=>setShowIcon(false)} onClick={()=>document.getElementById('imageOverview').showModal()}>
                                    <UserProfileImage src={auth.user.profile_image} className={`w-32 h-32 ${showIcon && 'opacity-75'}`}/>
                                    {showIcon && 
                                        <AiFillEye className="fill-white h-5 w-5 absolute top-[50%] right-[50%] translate-x-1/2 -translate-y-1/2"/>
                                    }
                                </div>
                                : <div className="w-32 h-32 rounded-full bg-gray-400 hover:bg-gray-500 flex items-center justify-center cursor-pointer" onMouseOver={()=>setShowIcon(true)} onMouseOut={()=>setShowIcon(false)} onClick={()=>document.getElementById('uploadImage').showModal()}>{showIcon && <AiFillCamera className="fill-white"/>}</div>
                            }
                            </div>
                            {/* end pp */}
                            <div>
                                <b>Username:</b> {user.name} <br />
                                <b>Email:</b> {user.email} <br />
                                <b>Role:</b> {user.role} <br />
                                <b>Bergabung:</b> {user.created_at.slice(0,10)}
                            </div>
                        </div>
                        <div className="w-full flex justify-end">
                            <Link href={route('profile.edit')} className="mt-3 inline-flex items-center px-4 py-2 bg-warning border border-transparent rounded-md font-semibold text-xs text-black uppercase tracking-widest hover:bg-yellow-500 hover:text-black active:bg-yellow-600 focus:outline-none transition ease-in-out duration-150">Edit</Link>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}

export default Index;