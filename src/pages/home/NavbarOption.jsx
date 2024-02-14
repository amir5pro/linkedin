import "./NavbarOption.css"
function NavbarOption({Icon,Title,className}) {
  return (
   <div className={`navbarOption ${className}`}>
    {Icon && <Icon className="navbarOption__icon"/>} 
    <p className="navbarOption__title">{Title}</p>
   </div>
  )
}

export default NavbarOption