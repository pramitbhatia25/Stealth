function Footer() {
    return <>
        <footer className="bg-[#0f0f0f] w-full ">
            <div className=" mx-auto px-4 py-10 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* About Section */}
                    <div>
                        <h2 className="text-lg font-semibold text-white">About Us</h2>
                        <p className="mt-2 text-sm">
                            Our mission is to empower students around the world to learn and grow through project-based programming, making hands-on learning accessible to everyone
                        </p>
                    </div>

                    {/* Links Section */}
                    <div>
                        <h2 className="text-lg font-semibold text-white">Quick Links</h2>
                        <ul className="mt-2 space-y-2">
                            <li>
                                <a
                                    href="#"
                                    className="hover:underline hover:text-white transition"
                                >
                                    Home
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="hover:underline hover:text-white transition"
                                >
                                    LinkedIn
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="hover:underline hover:text-white transition"
                                >
                                    Support Us
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="hover:underline hover:text-white transition"
                                >
                                    Careers
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Section */}
                    <div>
                        <h2 className="text-lg font-semibold text-white">Contact Us</h2>
                        <p className="mt-2 text-sm">Email: pramitbhatia25@gmail.com</p>
                        <p className="text-sm">Phone: +1 470 430 3868</p>
                    </div>
                </div>

                <div className="border-t border-gray-700 mt-8 pt-4 text-center">
                    <p className="text-sm">
                        &copy; {new Date().getFullYear()} Kapstone. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    </>
}

export default Footer;