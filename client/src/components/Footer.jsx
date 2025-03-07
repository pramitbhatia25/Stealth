import LogoDark from "../assets/bullrun-dark.png";

function Footer() {
    return <>
        <footer className="text-gray-400 w-full ">
            <div className=" mx-auto px-4 py-10 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="col-span-2">
                        <div className="py-[2px] text-purple-500 font-bold text-xl h-[50px] w-[170px]">
                            <img src={LogoDark} alt="Brand Logo" className="h-full w-full" />
                        </div>
                        <p className="mt-2 text-sm">
                            Our mission is to empower individuals worldwide with the knowledge and insights they need to navigate the world of crypto finance, making informed investing accessible to everyone.
                        </p>
                    </div>

                    <div className="col-span-1">
                        <h2 className="text-lg font-semibold">Quick Links</h2>
                        <ul className="mt-2 space-y-2">
                            <li>
                                <a
                                    href="https://bullrunai.vercel.app/"
                                    className="hover:underline transition"
                                >
                                    Home
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://www.linkedin.com/company/bullrunai/"
                                    className="hover:underline transition"
                                >
                                    LinkedIn
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="hover:underline transition"
                                >
                                    Support Us
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div className="col-span-1">
                        <h2 className="text-lg font-semibold">Contact Us</h2>
                        <p className="mt-2 text-sm">Email: pramitbhatia25@gmail.com</p>
                        <p className="text-sm">Phone: +1 470 430 3868</p>
                    </div>
                </div>

                <div className="border-t border-gray-700 mt-8 pt-4 text-left">
                    <p className="text-sm">
                        &copy; {new Date().getFullYear()} BullRun. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    </>
}

export default Footer;