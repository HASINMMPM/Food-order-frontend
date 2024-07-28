import { FaFacebook,FaInstagram } from "react-icons/fa";

import logo from "/Logo.png";

import { Footer } from "flowbite-react";


const FooterComponent = () => {
  return (
    <div className="container mx-auto ">
      <div className="w-full bg-primary p-4 ">
        <div className="grid w-full justify-between sm:flex sm:justify-between md:flex md:grid-cols-1">
          <div>
            <img src={logo} alt="" className="w-32 h-32" />
          </div>
          <div className="grid grid-cols-1  gap-8 sm:mt-4 sm:grid-cols-2 sm:gap-16">
            <div>
              <h4 className="text-secondary font-semibold">We Available</h4>

              <ul>
                <li className="text-secondary" href="#">
                  Kochi
                </li>
                <li className="text-secondary" href="#">
                  thiruvananthapuram
                </li>
                <li className="text-secondary" href="#">
                  Malappuram
                </li>
                <li className="text-secondary" href="#">
                  calicut
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-secondary">Company</h4>
              <ul className="text-secondary">
                <li>About us</li>
                <li>Call us</li>
              </ul>
            </div>
          </div>
        </div>
        <Footer.Divider />
        <div className="w-full sm:flex sm:items-center sm:justify-between ">
          <Footer.Copyright className="text-secondary" href="#" by="Hungry Hub" year={2022} />
          <div className="mt-4 flex space-x-6 sm:mt-0 sm:justify-center">
            <span className="text-secondary text-xl hover:text-black cursor-pointer  duration-300"><FaFacebook/></span>
            <span className="text-secondary text-xl hover:text-black cursor-pointer  duration-300"><FaInstagram/></span>
          
          </div>
        </div>
      </div>
    </div>
  );
};

export default FooterComponent;
