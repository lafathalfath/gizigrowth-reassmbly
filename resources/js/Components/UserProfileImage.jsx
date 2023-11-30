export default function UserProfileImage({src, className}) {
    const preventAction=(e)=>{
        e.preventDefault();
    }
    return (
        <img 
        src={`../../${src}`} 
        onContextMenu={preventAction}
        onDragStart={preventAction}
        onDrop={preventAction}
        alt="User Profile Image" className={`${className} rounded-full pointer-events-none`}/>
    );
}