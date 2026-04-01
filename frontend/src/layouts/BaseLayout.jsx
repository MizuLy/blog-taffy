import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <div className="flex h-screen bg-black overflow-hidden">
      <div className="md:w-56 sm:w-24 lg:w-96">
        <Sidebar />
      </div>
      <div className="flex-1 flex justify-start p-6 overflow-auto ml-52">
        <div className="w-full max-w-2xl">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
