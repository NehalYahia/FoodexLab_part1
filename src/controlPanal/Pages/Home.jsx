import Navbar from "../Components/Navbar";
import SideNav from "../Components/SideNav";
function Home() {
    return (
        <div className="body ">
            {/*<Navbar />*/}
            <SideNav />
        </div>

    )
}
export default Home;




//import React from "react";
//import api from "../api/api";

//function Dashboard() {
   

//    return (
//        <div className="flex flex-col items-center mt-10">
//            <h1 className="text-2xl mb-4">Welcome to Dashboard 🎉</h1>
//            <button
//                onClick={handleLogout}
//                className="bg-red-500 text-white px-4 py-2 rounded"
//            >
//                Logout
//            </button>
//        </div>
//    );
//}

//export default Dashboard;
