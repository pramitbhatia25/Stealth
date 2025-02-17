import { Avatar, Skeleton } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";

function SkeletonProjects({ isSidebarOpen, data }) {

    const navigate = useNavigate()
    
    const handleProjectClick = (projectId) => {
        navigate(`/projects/${projectId}`);
    };

    return <>
        {data.length != 0 ?
            <div className="h-full w-full flex flex-wrap gap-5 p-4">
                {data
                    .map((project) => (
                        <div key={project.name} className={`w-[90dvw] ${isSidebarOpen ? "md:w-[25dvw]" : "md:w-[20dvw]"
                                    } md:max-w-[350px] md:min-w-[250px] `}>
                            <div
                                className={`h-[30dvh] max-h-[200px] flex flex-col items-center space-y-2 bg-black/30 rounded-lg overflow-hidden`}
                            >
                                <div className="h-full w-full hover:scale-[1.1] hover:cursor-pointer transition-transform duration-300 ease-in-out"
                                onClick={() => {handleProjectClick(project.id)}}                                
                                >
                                    <img
                                        src={`https://kapstoneimages.blob.core.windows.net/images/${project.id}.jpg`}
                                        alt={project.name}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </div>
                            <div
                                className={` ${isSidebarOpen ? "md:w-[25dvw]" : "md:w-[20dvw]"
                                    } md:max-w-[350px] text-white py-2 flex flex-row flex-wrap`}
                            >
                                <div className="flex flex-col w-[85%]">
                                    <h3 className="hover:cursor-pointer w-full font-semibold text-sm flex flex-wrap"
                                    onClick={() => {handleProjectClick(project.id)}}  >
                                        {project.name}
                                    </h3>
                                    <p className="text-xs text-gray-400">@{project.userName}</p>
                                </div>
                            </div>
                        </div>
                    ))}
            </div>

            :
            <div className="h-full w-full flex flex-wrap gap-5 p-4">
                {["", "", "", "", "", "", "", "", "", "", "", ""].map((project) => (
                        <div key={project.name}>
                            <Skeleton
                                className={`h-[30dvh] max-h-[200px] w-[90dvw] ${isSidebarOpen ? "md:w-[25dvw]" : "md:w-[20dvw]"
                                    } md:max-w-[350px] md:min-w-[250px] flex flex-col items-center space-y-2 bg-black/30 rounded-lg overflow-hidden`}
                            >
                            </Skeleton>
                            <Skeleton
                                className={`w-[95dvw] ${isSidebarOpen ? "md:w-[25dvw]" : "md:w-[20dvw]"
                                    } md:max-w-[350px] text-white my-2 flex flex-row flex-wrap rounded-lg`}
                            >
                                <div className="flex flex-col w-[85%]">
                                    <h3 className="hover:cursor-pointer w-full font-semibold text-sm flex flex-wrap">
                                        {project.name}
                                    </h3>
                                    <p className="text-xs text-gray-400">@{project.userName}</p>
                                </div>
                            </Skeleton>
                        </div>
                    ))}
            </div>
        }


    </>
}

export default SkeletonProjects;