import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import React, { useState } from 'react';
import { Link, Head, router } from '@inertiajs/react';
import AddLokasi from './AddLokasi';
import DangerButton from '@/Components/DangerButton';
import { Inertia } from '@inertiajs/inertia';
import EditLokasi from './EditLokasi';
import ConfirmModal from '@/Components/ConfirmModal';
import { InertiaLink } from '@inertiajs/inertia-react';
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';

const Index = (props) =>{
    const handelAddButton=()=>{
        document.getElementById('addFormModal').showModal();
    }
    const [editData, setEditData] = useState({
        id: '',
        nama_lokasi: '',
        kabupaten_kota: '',
        provinsi: '',
        koordinat_x: '',
        koordinat_y: ''
    });
    const handleEditButton=(propItems)=>{
        setEditData({
            id: propItems.id,
            nama_lokasi: propItems.nama_lokasi,
            kabupaten_kota: propItems.kabupaten_kota,
            provinsi: propItems.provinsi, 
            koordinat_x: propItems.koordinat_x,
            koordinat_y: propItems.koordinat_y
        });
        document.getElementById('editFormModal').showModal();
    }

    const [deleteItemId, setDeleteItemId] = useState(null);
    const [deleteItemName, setDeleteItemName] = useState(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const openDeleteModal=(itemId, itemName)=>{
        setDeleteItemId(itemId);
        setDeleteItemName(itemName);
        setIsDeleteModalOpen(true);
    }
    const closeDeleteModal=()=>{
        setIsDeleteModalOpen(false);
        setDeleteItemId(null);
        setDeleteItemName(null);
    }
    const handleDelete=(itemId)=>{
        Inertia.delete(`/lokasi/${itemId}`);
    }

    let page = [];
    let pageNum = 1;
    for (let i = 1; i < props.lokasi.links.length-1; i++) {
        page.push(props.lokasi.links[i]);
    }
    let noData = props.lokasi.from;

    let searchEntry = '';
    const setSearchEntry=(e)=>searchEntry=e;

    return (
        <AuthenticatedLayout
            user={props.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Lokasi</h2>}
        >
            <div className='p-5'>
                <Head title='tabel lokasi' appName='GiziGrowth'/>
                <div>
                    <button onClick={handelAddButton} className='btn bg-[#04724d] hover:bg-[#94c73f] text-white hover:text-black'>Tambah Data +</button>

                    <dialog id='addFormModal' className='modal p-0 m-0 w-full h-full'>
                        <div className="modal-box m-0 p-0 w-full">
                            <AddLokasi/>
                        </div>
                        <form method="dialog" className="modal-backdrop">
                            <button>close</button>
                        </form>
                    </dialog>

                    <dialog id='editFormModal' className='modal p-0 m-0 w-full h-full'>
                        <div className="modal-box m-0 p-0 w-full">
                            <EditLokasi dataProps={editData}/>
                        </div>
                        <form method="dialog" className="modal-backdrop">
                            <button>close</button>
                        </form>
                    </dialog>

                    <button 
                        className='mx-5 my-4 btn btn-sm bg-zinc-900 hover:bg-red-900 hover:text-gray-400 text-red-500 absolute right-0'
                        onClick={()=>{
                            document.getElementById('deleteAllModal').showModal();
                            document.getElementById('deleteAllButton').disabled = true;
                            setTimeout(()=>document.getElementById('deleteAllButton').disabled = false, 5000);
                        }}
                    >
                        Delete All Data
                    </button><br />
                    <dialog id="deleteAllModal" className="modal">
                        <div className="modal-box">
                            <h3 className="font-bold text-lg text-center">Peringatan!</h3>
                            <p className="py-4">Apakah Anda yakin ingin menghapus semua data?</p>
                            <div className="w-full flex justify-end">
                                <button className='btn bg-red-700 hover:bg-red-900 mr-5 text-gray-200'
                                    id='deleteAllButton'
                                    onClick={()=>{Inertia.delete('/lokasi')}}
                                >Delete</button>
                                <button className='btn' onClick={()=>document.getElementById('deleteAllModal').close()}>Cancel</button>
                            </div>
                        </div>
                        <form method="dialog" className="modal-backdrop">
                            <button>close</button>
                        </form>
                    </dialog>

                    <form className='mt-5' onSubmit={()=>Inertia.get(`/lokasi?search=${searchEntry}`)}>
                        <input type="search" name="search" id="searchData"  className='mr-3 h-8 border-gray-300 border-gray-700 bg-gray-0 text-gray-700 focus:border-[#04724d] focus:border-[#04724d] focus:ring-[#04724d] focus:ring-[#04724d] rounded-md shadow-sm' onChange={(searchEntry)=>setSearchEntry(searchEntry.target.value)}/>
                        <button className='btn btn-sm bg-[#94c73f] text-white hover:bg-[#b4e75f]'>Search</button>
                    </form>
                    <table className='table mt-5 rounded-lg overflow-x-auto'>
                        <thead> 
                            <tr className='bg-white border rounded-lg shadow-lg'>
                                <th>Nomor</th>
                                <th>Nama Lokasi</th>
                                <th>Kabupaten/Kota</th>
                                <th>Provinsi</th>
                                <th>Longitude</th>
                                <th>Latitude</th>
                                <th>Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {props.lokasi.data && props.lokasi.data.map((item) => {
                                return(
                                    <tr key={item.id} className='border-b-gray-300'>
                                        <td>{noData++}</td>
                                        <td>{item.nama_lokasi}</td>
                                        <td>{item.kabupaten_kota}</td>
                                        <td>{item.provinsi}</td>
                                        <td>{item.koordinat_x}</td>
                                        <td>{item.koordinat_y}</td>
                                        <td>
                                            <button 
                                                className='m-1 btn btn-sm btn-warning hover:bg-amber-500'
                                                onClick={()=>handleEditButton(item)}
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><path d="M362.7 19.3L314.3 67.7 444.3 197.7l48.4-48.4c25-25 25-65.5 0-90.5L453.3 19.3c-25-25-65.5-25-90.5 0zm-71 71L58.6 323.5c-10.4 10.4-18 23.3-22.2 37.4L1 481.2C-1.5 489.7 .8 498.8 7 505s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L421.7 220.3 291.7 90.3z"/></svg>
                                                Edit
                                            </button>
                                            <DangerButton 
                                                className='m-1 btn btn-sm bg-red-700 hover:bg-red-900 text-gray-200'
                                                onClick={()=>openDeleteModal(item.id, item.nama_lokasi)}
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512" className='fill-white'><path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"/></svg>
                                                Delete
                                            </DangerButton>
                                        </td>
                                    </tr>
                                ) 
                            })}
                        </tbody>
                    </table>
                    
                    <ConfirmModal
                        isOpen={isDeleteModalOpen}
                        onClose={closeDeleteModal}
                        onDelete={handleDelete}
                        itemId={deleteItemId}
                        itemName={deleteItemName}
                    />
                    
                    {/* <div className="join mt-4 border border-gray-400">
                        <InertiaLink href={props.lokasi.prev_page_url} className="join-item btn btn-sm border border-gray-300">{`<`}</InertiaLink>
                        <InertiaLink href={props.lokasi.first_page_url} className="join-item btn btn-sm border border-gray-300">{`<<`}First</InertiaLink>

                        {page.map(page=>{
                            return <InertiaLink href={page.url} key={page.label}
                            className={`join-item btn btn-sm border border-gray-300 ${page.active ? 'bg-gray-300 hover:bg-gray-400':''}`}
                            >{pageNum++}</InertiaLink>
                        })}
                        
                        <InertiaLink href={props.lokasi.last_page_url} className="join-item btn btn-sm border border-gray-300">Last{`>>`}</InertiaLink>
                        <InertiaLink href={props.lokasi.next_page_url} className="join-item btn btn-sm border border-gray-300">{`>`}</InertiaLink>
                    </div> */}

                    <div className="p-5 flex items-center justify-center gap-2">
                        <Link href={props.lokasi.prev_page_url}><AiOutlineLeft/></Link>
                        <Link href={props.lokasi.first_page_url} className="px-3 bg-gray-300 rounded-md">First</Link>

                        {page[0]!=null && page.map(page=>{
                            return <Link href={page.url} key={page.label} className={`${page.active && 'bg-gray-400 text-white px-2 py-0.5 rounded-md'} mx-1`}>{page.label}</Link>
                        })}
                        
                        <Link href={props.lokasi.last_page_url} className="px-3 bg-gray-300 rounded-md">Last</Link>
                        <Link href={props.lokasi.next_page_url}><AiOutlineRight/></Link>
                    </div>

                </div>
            </div>
        </AuthenticatedLayout>
    )
}

export default Index;