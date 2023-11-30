import { Head, Link } from '@inertiajs/react';
import React, { useState } from "react";
import NavBar from './NavigationBar';
import ConfirmModal from '@/Components/ConfirmModal';
import { HiArrowRight } from 'react-icons/hi';
import { GrMap } from 'react-icons/gr';
import { BsRobot } from 'react-icons/bs';
import { VscGraph } from 'react-icons/vsc';

export default function Welcome({auth}) {
    const slides=[
        '../assets/images/carousel1.png',
        '../assets/images/carousel2.png',
        '../assets/images/carousel3.png',
        '../assets/images/carousel4.png',
        '../assets/images/carousel5.png'

    ]
    const [currentIndex, setCurrentIndex] = useState(0);
    const prevSlide=()=>{
        const isFirst = currentIndex === 0;
        const newIndex = isFirst ? slides.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
    }
    const nextSlide=()=>{
        const isLast = currentIndex == slides.length - 1;
        const newIndex = isLast ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    }
    setTimeout(()=>nextSlide(), 3000);

    return (
        <div>
            <Head title="Welcome" />
            <div className='fixed w-full z-50'>
                <NavBar user={auth.user}/>
            </div>
            <div className='pt-16 max-w-[100vw] h-[755px] bg-black relative'>
                <div 
                style={{ backgroundImage: `url(${slides[currentIndex]})` }} 
                className='w-full h-full bg-center bg-cover duration-500 text-white'>
                    <div className="w-full h-full bg-zinc-900/50 flex flex-col items-center justify-center gap-5">
                        <h1 className='text-4xl font-bold'>GiziGrowth</h1>
                        <div className="text-center text-lg">
                            Membangun Kesadaran tentang Stunting<br/> melalui Visualisasi Data Ketahanan Pangan
                        </div>
                        <Link href='/dataset' className='py-2 px-5 w-fit rounded-full text-white bg-[#94c73f] hover:bg-[#a4e75f] text-lg'>Masuk</Link>
                    </div>
                </div>
                <div className='absolute bottom-10 text-white flex items-center justify-center w-full'>
                    <div>
                        <button className='text-2xl' onClick={prevSlide}>❮</button>
                    </div>
                    <div className='mx-5 flex items-center justify-center gap-5'>
                        {slides.map(Index=>{
                            return <button 
                                key={Index}
                                className={`m-1 rounded-full ${currentIndex==Index ? 'w-3 h-3 bg-white' : 'w-2 h-2 bg-gray-300/50'}`}
                                onClick={()=>{
                                    setCurrentIndex(Index);
                                }}></button>
                        })}
                    </div>
                    <div>
                        <button className='text-2xl' onClick={nextSlide}>❯</button>
                    </div>
                </div>
            </div>
            <div className='pb-5 bg-white shadow-xl'>
                <h1 className='py-10 text-center text-2xl font-bold text-[#94c73f]'>Artikel</h1>
                <div className='w-full px-20 flex items-center justify-center gap-10'>
                    <div className="w-[250px] h-[300px] rounded-lg bg-white border border-gray-300 shadow-lg" flex flex-col items-center>
                        <img src="../uploads/1/articles/aaaa.png" alt="image" className='rounded-lg h-[50%]'/>
                        <div className='p-2 h-[50%] flex flex-col items-start justify-between'>
                            <div className='font-bold'>Data terbaru! Prevalensi stunting di Jabar menurun 4,3%, pencapaian target WHO semakin dekat</div>
                            <div className='text-xs text-zinc-500'>04 Agustus 2023</div>
                        </div>
                    </div>
                    <div className="w-[250px] h-[300px] rounded-lg bg-white border border-gray-300 shadow-lg flex flex-col items-center">
                        <img src="../uploads/1/articles/article2.png" alt="image" className='rounded-lg h-[50%]'/>
                        <div className='p-2 h-[50%] flex flex-col items-start justify-between'>
                            <div className='font-bold'>Pentingnya gizi seimbang bagi kesehatan</div>
                            <div className='text-xs text-zinc-500'>12 Oktober 2023</div>
                        </div>
                    </div>
                    <div className="w-[250px] h-[300px] rounded-lg bg-white border border-gray-300 shadow-lg flex flex-col items-center">
                        <img src="../uploads/1/articles/article3.png" alt="image" className='rounded-lg h-[50%]'/>
                        <div className='p-2 h-[50%] flex flex-col items-start justify-between'>
                            <div className='font-bold'>Peran wanita dalam meningkatkan ketahanan pangan rumah tangga</div>
                            <div className='text-xs text-zinc-500'>21 Agustus 2023</div>
                        </div>
                    </div>
                    <div className="w-[250px] h-[300px] rounded-lg bg-white border border-gray-300 shadow-lg flex flex-col items-center">
                        <img src="../uploads/1/articles/article4.png" alt="image" className='rounded-lg h-[50%]'/>
                        <div className='p-2 h-[50%] flex flex-col items-start justify-between'>
                            <div className='font-bold'>Pandemi COVID-19 dan dampaknya terhadap ketahanan pangan</div>
                            <div className='text-xs text-zinc-500'>11 September 2023</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='pb-5 shadow-xl'>
                <h1 className='py-10 text-center text-2xl font-bold text-[#94c73f]'>Layanan GiziGrowth</h1>
                <div className='w-full px-20 flex items-center justify-center gap-10'>
                    <div className="px-5 py-10 w-[250px] h-[300px] rounded-lg bg-white border border-gray-300 shadow-lg flex flex-col justify-between">
                        <div className='text-4xl font-bold'>100</div>
                        <div className='font-bold'>Total Dataset</div>
                        <div className='text-sm'>Kumpulan data berupa tabel yang dapat diolah lebih lanjut</div>
                        <Link href='/dataset' className='flex items-center gap-2 font-bold'>Lihat selengkapnya<HiArrowRight/></Link>
                    </div>
                    <div className="px-5 py-10 flex flex-col justify-between w-[250px] h-[300px] rounded-lg bg-white border border-gray-300 shadow-lg">
                        <GrMap className='text-5xl'/>
                        <div className='font-bold'>GPoint</div>
                        <div className='text-sm'>Pemetaan daerah dengan jumlah kasus stunting dan ketersediaan pangan.</div>
                        <Link href='/gpoint' className='flex items-center gap-2 font-bold'>Lihat selengkapnya<HiArrowRight/></Link>
                    </div>
                    <div className="px-5 py-10 flex flex-col justify-between w-[250px] h-[300px] rounded-lg bg-white border border-gray-300 shadow-lg">
                        <BsRobot className='text-5xl'/>
                        <div className='font-bold'>GiBot</div>
                        <div className='text-sm'>Tanya seputar kesehatan gizi dan pangan.</div>
                        <Link href='/gibot' className='flex items-center gap-2 font-bold'>Tanya GiBot<HiArrowRight/></Link>
                    </div>
                    <div className="px-5 py-10 flex flex-col justify-between w-[250px] h-[300px] rounded-lg bg-white border border-gray-300 shadow-lg">
                        <VscGraph className='text-5xl'/>
                        <div className='font-bold'>Infografik</div>
                        <div className='text-sm'>Informasi yang anda ingin ketahui disajikan dalam bentuk grafik agar mudah dipahami.</div>
                        <Link href='/gibot' className='flex items-center gap-2 font-bold'>Lihat Selengkapnya<HiArrowRight/></Link>
                    </div>
                </div>
            </div>

            <div className='p-20 pb-5 bg-[#04724d] text-white'>
                <div className='pb-10 text-center text-xl font-bold'>Hubungi Kami</div>
                <div className='flex items-start justify-between'>
                    <div>
                        <div className='pb-3 text-lg font-bold'>Kontak Kami</div>
                        <div>GiziGrowth - GG, 14022, Indenesia</div>
                        <div>+6282114022140</div>
                        <div>gizigrowth@company.co</div>
                    </div>
                    <div>
                        <div className='pb-3 text-lg font-bold'>Tentang Kami</div>
                        <div className='flex items-center justify-center gap-5'>
                            <div>
                                <Link href='/'>Beranda</Link><br />
                                <Link href='/dataset'>Dataset</Link><br />
                                <Link href='/gpoint'>GPoint</Link>
                            </div>
                            <div>
                                <Link href='/gbot'>GBot</Link><br />
                                <Link href='/about'>Tentang</Link><br />
                                <Link href='/contact'>Hubungi Kami</Link>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className='pb-3 text-lg font-bold'>Tentang Perusahaan Kami</div>
                        <div className='flex items-center justify-between gap-5'>
                            <img src="../assets/images/Inknovation.png" alt="" className='w-28'/>
                            <div>Inknovation merupakan <br /> sebuah tim yang berasal <br /> dari Sekolah Vokasi IPB <br /> University, Program Studi <br /> Teknologi Rekayasa <br /> Perangkat Lunak</div>
                        </div>
                    </div>
                </div>
                <div className='pt-10 text-center text-sm'>Copyright &copy; 2023 Inknoovation - GiziGrowth</div>
            </div>
        </div>
    );
}
