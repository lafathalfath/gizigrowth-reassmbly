import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import { useEffect, useState } from 'react';
import { FiChevronDown, FiChevronLeft } from 'react-icons/fi';


export default function AdminDashboard(props) {

    let aktivitas = props.activity;
    // aktivitas = aktivitas.reverse();
    if (aktivitas.length>=5) {
        aktivitas.slice(props.activity.length-6, props.activity.length-1);
    }
    useEffect(()=>{
        aktivitas.reverse();
    }, []);
    const [showActivity, setShowActivity] = useState(false);

    return (
        <AuthenticatedLayout
            user={props.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Admin Dashboard</h2>}
        >
            <Head title="Dashboard Admin" />
            
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 grid grid-cols-2 gap-3">
                    <Link href={route('lokasi')} className="bg-white overflow-hidden shadow-lg sm:rounded-lg m-1">
                        <div className="p-6 text-gray-900">
                            Manage Lokasi Table
                        </div>
                    </Link>
                    <Link href={route('daerah')} className="bg-white overflow-hidden shadow-lg sm:rounded-lg m-1">
                        <div className="p-6 text-gray-900">
                            Manage Daerah Table
                        </div>
                    </Link>
                    <Link href='/kasus_stunting' className="bg-white overflow-hidden shadow-lg sm:rounded-lg m-1">
                        <div className="p-6 text-gray-900">Atur Data Kasus Stunting</div>
                    </Link>
                    <Link href='/ketahanan_pangan' className="bg-white overflow-hidden shadow-lg sm:rounded-lg m-1">
                        <div className="p-6 text-gray-900">Atur Data Ketahanan Pangan</div>
                    </Link>
                </div>
                <div className='p-1 mt-5 max-w-7xl mx-auto sm:px-6 lg:px-8 flex flex-col items-center'>
                    <button 
                        className="p-6 w-full bg-white overflow-hidden shadow-lg rounded-lg flex items-center justify-between"
                        onClick={()=>setShowActivity(!showActivity)}
                    >
                        <div className="text-gray-900">Aktivitas</div>
                        {!showActivity ? <FiChevronLeft/> : <FiChevronDown/>}
                    </button>
                    {showActivity ? 
                        <div className='w-full px-5'>
                            {props.activity[0]!=null ? aktivitas.slice(0,5).map(item=>{
                                return <div key={item.id} className="w-full mt-2 text-gray-500 border border-b-black/25 flex items-center justify-between">
                                    <div>{item.activity_name}</div>
                                    <div>{item.created_at.substring(0,10)}</div>
                                </div>
                            }) 
                            : <div>belum ada aktivitas</div>}
                            <div className='w-full flex items-center justify-center'>
                                <Link href='/activity' className='text-center text-[#94c73f] hover:text-[#04904d]'>Lihat Semua</Link>
                            </div>
                        </div>
                        : ''
                    }
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
