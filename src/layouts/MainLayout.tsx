import { Link, Outlet } from "react-router-dom"



const MainLayout = () =>{
    return (
        <div>
            <nav>
                <Link to="/">Home</Link>
                <Link to="/about">About</Link>
            </nav>
            <main>
                <Outlet/>
            </main>
        </div>
    )
}
export default MainLayout;