import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";
import UserList from "../components/UserList";

export default function MainLayout() {
  return (
    <div className="flex h-screen bg-black overflow-hidden">
      <div className="md:w-56 sm:w-24 lg:w-96">
        <Sidebar />
      </div>
      <div className="flex-1 flex justify-center p-6 overflow-auto mr-64">
        <div className="w-full max-w-2xl">
          <Outlet />
        </div>
      </div>
      <div className="w-64 shrink-0 overflow-auto fixed top-0 right-0">
        <UserList />
      </div>
    </div>
  );
}
