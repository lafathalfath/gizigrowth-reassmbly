import { forwardRef, useEffect, useRef } from 'react';

export default forwardRef(function TextInput({ type = 'text', className = '', isFocused = false, ...props }, ref) {
    const input = ref ? ref : useRef();

    useEffect(() => {
        if (isFocused) {
            input.current.focus();
        }
    }, []);

    return (
        <input
            {...props}
            type={type}
            className={
                'border-gray-300 dark:border-gray-700 dark:bg-gray-0 dark:text-gray-700 focus:border-[#04724d] dark:focus:border-[#04724d] focus:ring-[#04724d] dark:focus:ring-[#04724d] rounded-md shadow-sm ' +
                className
            }
            ref={input}
        />
    );
});
