import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import React, { useState } from 'react';
import { Link, Head, router } from '@inertiajs/react';
import AddDaerah from './AddDaerah';
import { Inertia } from '@inertiajs/inertia';
import DangerButton from '@/Components/DangerButton';
import ConfirmModal from '@/Components/ConfirmModal';
import EditDaerah from './EditDaerah';
import { InertiaLink } from '@inertiajs/inertia-react';
import { AiFillDelete, AiFillEdit, AiOutlineLeft, AiOutlineRight, AiOutlineSearch } from 'react-icons/ai';

const Index = (props) =>{
    const [addButton, setAddButton] = useState();
    const handelAddBUtton=()=>{
        setAddButton(!addButton);
        document.getElementById('addFormModal').showModal();
    }

    const [editData, setEditData] = useState({
        id: '',
        nama_daerah: '',
        kabupaten_kota: '',
        provinsi: '',
        shape_length: '',
        shape_area: ''
    });
    const handleEditButton=(propItems)=>{
        setEditData({
            id: propItems.id,
            nama_daerah: propItems.nama_daerah,
            kabupaten_kota: propItems.kabupaten_kota,
            provinsi: propItems.provinsi, 
            shape_length: propItems.shape_length,
            shape_area: propItems.shape_area
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
        Inertia.delete(`/daerah/${itemId}`);
    }

    let page = [];
    let pageNum = 1;
    for (let i = 1; i < props.daerah.links.length-1; i++) {
        page.push(props.daerah.links[i]);
    }
    let noData = props.daerah.from;

    let searchEntry = '';
    const setSearchEntry=(e)=>searchEntry=e;

    return (
        <AuthenticatedLayout
            user={props.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Daerah</h2>}
        >
            <div className='p-5'>
                <Head title='tabel daerah' appName='GiziGrowth'/>
                <div>
                    <button onClick={handelAddBUtton} className='btn bg-[#04724d] hover:bg-[#94c73f] text-white hover:text-black'>Tambah Data +</button>

                    <dialog id='addFormModal' className='modal p-0 m-0 w-full h-full'>
                        <div className="modal-box m-0 p-0 w-full">
                            <AddDaerah />
                        </div>
                        <form method="dialog" className="modal-backdrop">
                            <button>close</button>
                        </form>
                    </dialog>

                    <dialog id='editFormModal' className='modal p-0 m-0 w-full h-full'>
                        <div className="modal-box m-0 p-0 w-full">
                            <EditDaerah dataProps={editData}/>
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
                                    onClick={()=>{Inertia.delete('/daerah')}}
                                >Delete</button>
                                <button className='btn' onClick={()=>document.getElementById('deleteAllModal').close()}>Cancel</button>
                            </div>
                        </div>
                        <form method="dialog" className="modal-backdrop">
                            <button>close</button>
                        </form>
                    </dialog>

                    <form className="mt-5 p-0 w-fit border border-gray-700 bg-white focus:border-[#04724d] focus:border-[#04724d] focus:ring-[#04724d] focus:ring-[#04724d] flex items-center shadow-sm rounded-md" onSubmit={()=>{
                            Inertia.get(`/daerah?search=${searchEntry}`);
                        }}>
                        <input type="search" name="search" id="searchData" className='h-8 pr-0 text-gray-700 border-none rounded-md focus:ring-white/0'
                            onChange={(searchEntry)=>setSearchEntry(searchEntry.target.value)}
                        />
                        <button className='p-1 m-1 bg-[#94c73f]/60 text-white hover:bg-[#b4e75f] rounded-md'><AiOutlineSearch className='fill-black'/></button>
                    </form>

                    <table className='table mt-5 rounded-lg overflow-x-auto'>
                        <thead> 
                            <tr className='bg-white border rounded-lg shadow-lg'>
                                <th>Nomor</th>
                                <th>Nama Daerah</th>
                                <th>Kabupaten/Kota</th>
                                <th>Provinsi</th>
                                <th>Shape Length</th>
                                <th>Shape Area</th>
                                <th>Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {props.daerah.data ? props.daerah.data.map(item => {
                                return(
                                    <tr key={item.id} className='border-b-gray-300'>
                                        <td>{noData++}</td>
                                        <td>{item.nama_daerah}</td>
                                        <td>{item.kabupaten_kota}</td>
                                        <td>{item.provinsi}</td>
                                        <td>{item.shape_length}</td>
                                        <td>{item.shape_area}</td>
                                        <td>
                                            <button onClick={()=>handleEditButton(item)} className='m-1 btn btn-sm btn-warning hover:bg-amber-500'>
                                                <AiFillEdit />
                                                Edit
                                            </button>
                                            <DangerButton 
                                                className='m-1 btn btn-sm bg-red-700 hover:bg-red-900 text-gray-200'
                                                // onClick={()=>handleDelete(item.id)}
                                                onClick={()=>openDeleteModal(item.id, item.nama_daerah)}
                                            >
                                                <AiFillDelete />
                                                Delete
                                            </DangerButton>
                                        </td>
                                    </tr>
                                ) 
                            }) : ''}
                        </tbody>
                    </table>
                    
                    <ConfirmModal 
                        isOpen={isDeleteModalOpen}
                        onClose={closeDeleteModal}
                        onDelete={handleDelete}
                        itemId={deleteItemId}
                        itemName={deleteItemName}
                    />


                    <div className="p-5 flex items-center justify-center gap-2">
                        <Link href={props.daerah.prev_page_url}><AiOutlineLeft/></Link>
                        <Link href={props.daerah.first_page_url} className="px-3 bg-gray-300 rounded-md">First</Link>

                        {page[0]!=null && page.map(page=>{
                            return <Link href={page.url} key={page.label} className={`${page.active && 'bg-gray-400 text-white px-2 py-0.5 rounded-md'} mx-1`}>{page.label}</Link>
                        })}
                        
                        <Link href={props.daerah.last_page_url} className="px-3 bg-gray-300 rounded-md">Last</Link>
                        <Link href={props.daerah.next_page_url}><AiOutlineRight/></Link>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}

export default Index;