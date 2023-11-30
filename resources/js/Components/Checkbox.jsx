export default function Checkbox({ className = '', ...props }) {
    return (
        <input
            {...props}
            type="checkbox"
            className={
                'rounded dark:bg-gray-100 shadow-sm  ' +
                className
            }
        />
    );
}
