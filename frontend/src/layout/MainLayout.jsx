import { Outlet } from "react-router-dom"
import NavBar from "../components/headers/NavBar"

const MainLayout = () => {
  return (
    <main > 
       <NavBar/>
      <Outlet/>
      <footer>Footer</footer>
    </main>
  )
}

export default MainLayout
