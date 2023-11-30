import ApplicationLogo from '@/Components/ApplicationLogo';
import NavLink from '@/Components/NavLink';
import { Link } from '@inertiajs/react';

export default function GeneralLayout(props) {
    return (
        // min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-gray-100 shadow-xl
        // min-h-screen bg-gray-100
        <div className='min-h-screen bg-gray-100'>
            <div className="w-full mx-auto px-4 sm:px-6 lg:px-40 h-16 flex items-center justify-between border border-solid border-b-gray-300 border-b-1 shadow shadow-md">
                <Link href="/">
                    <ApplicationLogo className="w-20 h-20 fill-current text-gray-500" />
                </Link>
                <div className='flex items-center justify-between gap-5'>
                    <div className='flex items-center justify-center gap-4'>
                        <NavLink href={route('home')} active={route().current('home')}>
                            Beranda
                        </NavLink>
                        <NavLink href={route('pemetaan')} active={route().current('pemetaan')}>
                            Pemetaan
                        </NavLink>
                        <div>About</div>
                        <div>Contact</div>
                    </div>
                    |
                    <div className="flex items-center justify-beetween">
                        {props.user ? (
                            <div>
                                <NavLink href={route('dashboard')} active={route().current('dashboard')}>
                                    Dashboard
                                </NavLink>
                            </div>
                        ):(
                            <div className='flex items-center'>
                                <Link
                                    href={route('login')}
                                    className="font-semibold text-gray-600 hover:text-gray-900 underline"
                                >
                                    Log in
                                </Link>
            
                                <Link
                                    href={route('register')}
                                    className="ml-4 font-semibold text-white hover:text-gray-900 dark:text-white dark:hover:text-white bg-gradient-to-r hover:bg-gradient-to-l from-[#94c73f] to-[#04724d] px-4 py-2 rounded-full flex items-center gap-2  duration-150 ease-in-out"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512" className='fill-white'>
                                        <path d="M217.9 105.9L340.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L217.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1L32 320c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM352 416l64 0c17.7 0 32-14.3 32-32l0-256c0-17.7-14.3-32-32-32l-64 0c-17.7 0-32-14.3-32-32s14.3-32 32-32l64 0c53 0 96 43 96 96l0 256c0 53-43 96-96 96l-64 0c-17.7 0-32-14.3-32-32s14.3-32 32-32z"/></svg>
                                    Register
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <main>
                {props.children}
            </main>
        </div>
    );
}
