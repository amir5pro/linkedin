
import {Outlet} from "react-router-dom"


function RootLayout() {
  return (
    <div className='layout'>
    <Outlet/>
      
    </div>
  )
}

export default RootLayout