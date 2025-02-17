import { Button, Input } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import "./index.css";
import { Layers, User } from "lucide-react";
import { RxHamburgerMenu } from "react-icons/rx";

export default function CustomNavbar({ isSidebarOpen, setIsSidebarOpen }) {
  const navigate = useNavigate();

  return (
    <div className="h-[10dvh] w-[100dvw] max-h-[60px] bg-white border-b border-gray-200 flex flex-row justify-between">

      <div className="w-fit flex flex-row">
        <div onClick={() => { setIsSidebarOpen(!isSidebarOpen) }} className="m-[1dvw] cursor-pointer h-fit flex justify-center items-center bg-[#0f0f0f] rounded-full px-[0.5dvw] py-2 my-auto transition-colors duration-200 ease-in-out">
          <RxHamburgerMenu className="w-[2dvw] min-w-[20px]" color={"white"} />
        </div>
        <div className="flex h-full flex-row cursor-pointer items-center justify-center pl-2"onClick={() => {navigate("/")}}>
          <Layers color="#9d0396" />
          <div className="text-xl text-black pl-1 tracking-tighter" >Stearn</div>
        </div>
      </div>

      <div className="h-full w-fit flex items-center justify-center">
        <div> 
          <Button size={"sm"} className="mx-[1dvw]" onClick={() => { navigate("/dashbaord") }}> 
            <User color="black" className="w-[1.5dvw] min-w-[20px]" />
              Sign In
          </Button>  
        </div>
      </div>
    </div>
  );
}