import Authenticated from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { useEffect } from 'react';

const DownloadHistory=(props)=>{
    let history = props.download_history;
    useEffect(()=>{
        history.reverse();
    }, []);
    let nomor = 1;
    return <Authenticated user={props.user}>
        <Head title='Aktivitas'/>
        <div className="p-5">
            <Link href='/admin/dashboard' className='m-2 py-1 px-4 bg-[#94c73f] hover:bg-[#74a71f] rounded-md text-white'>
                Kembali
            </Link>
            <table className='table mt-5 rounded-lg overflow-x-auto'>
                <thead>
                    <tr className='bg-white border rounded-lg shadow-lg'>
                        <th>No</th>
                        <th>Aktivitas</th>
                        <th>Tanggal</th>
                    </tr>
                </thead>
                <tbody>
                    {history[0]!=null ? history.map(item=>{
                        return <tr key={item.id} className='border-b-gray-300'>
                            <td>{nomor++}</td>
                            <td>{item.dataset_name}</td>
                            <td>{item.created_at.slice(0,10)}</td>
                        </tr>
                    })
                    : <tr>Tidak ada unduhan</tr>
                    }
                </tbody>
            </table>
        </div>
    </Authenticated>
}
export default DownloadHistory;