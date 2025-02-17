import { Briefcase, Sliders, Activity, BellRing, BrainCog, CircleHelp } from "lucide-react";

const features = [
    {
        title: "Comprehensive Project Marketplace",
        description:
            "Seach for project ideas from fellow students & startup founders. Alternatively, network, find and contribute to real-world projects sourced directly from Companies.",
        icon: <Briefcase size={30} color="lime" />,
    },
    {
        title: "Automated Project Sourcing For Instructors",
        description:
            "Effortlessly search for the projects you need and utilize our automated sourcing tools to connect with potential sponsors and companies.",
        icon: <BrainCog size={30} color="lime" />,
    },
    {
        title: "Project Management Suite - For Instructors & Students",
        description:
            "We provide industry-standard tools such as Kanban Boards, Sprint Management, One-Click Meetings, Project Deadlines & Analytics tools to assist in AGILE Software Development.",
        icon: <Activity size={30} color="lime" />,
    },
    {
        title: "Resources To Keep Up-To-Date On Tech News & Job opportunities",
        description:
            "Students can find new job roles on the opportunities page (refreshed daily!), as well as create notifications to apply as soon as new Job Postings are available.",
        icon: <BellRing size={30} color="lime" />,
    },
    {
        title: "AI-Assisted Student-Project Matching",
        description:
            "Our Classroom LMS provides AI-enabled Student Project Matching based on Student Interests. Use our AI Chatbot to search and find the best projects for your students.",
        icon: <Sliders size={30} color="lime" />,
    },
    {
        title: "Forum To Post Ideas & Find Teammates To Work Together",
        description:
            "Students can post ideas and discover find collaborators to work together with. Use AI to find your perfect co-founder / teammate and create lasting networks!",
        icon: <CircleHelp size={30} color="lime" />,
    },
];


export default features;