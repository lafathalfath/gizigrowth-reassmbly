import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { FiChevronDown, FiChevronLeft } from 'react-icons/fi';


export default function Dashboard(props) {
    const [showActivity, setShowActivity] = useState(false);
    console.log(props.download_history);
    let history = props.download_history;
    useEffect(()=>{
        history.reverse();
    }, []);
    // history = history;
    return (
        <AuthenticatedLayout
            user={props.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard" />

            <div className="pt-5">
                <div className="p-1 mt-5 max-w-7xl mx-auto sm:px-6 lg:px-8 flex flex-col items-center">
                    {/* <div className="bg-white overflow-hidden shadow-lg sm:rounded-lg m-1"> */}
                        <button 
                            className="p-6 w-full bg-white overflow-hidden shadow-lg rounded-lg flex items-center justify-between"
                            onClick={()=>setShowActivity(!showActivity)}
                        >
                            <div className="text-gray-900">Riwayat Unduhan</div>
                            {!showActivity ? <FiChevronLeft/> : <FiChevronDown/>}
                        </button>
                        {showActivity ? 
                            <div className='w-full px-5'>
                                {history[0]!=null ? history.slice(0,5).map(item=>{
                                    return <div key={item.id} className="w-full mt-2 text-gray-500 border border-b-black/25 flex items-center justify-between">
                                        <div>{item.dataset_name}</div>
                                        <div>{item.created_at.substring(0,10)}</div>
                                    </div>
                                }) 
                                : <div>Belum Ada Unduhan</div>}
                                <div className='w-full flex items-center justify-center'>
                                    <Link href='/download-history' className='text-center text-[#94c73f] hover:text-[#04904d]'>Lihat Semua</Link>
                                </div>
                            </div>
                            : ''
                        }
                    {/* </div> */}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
