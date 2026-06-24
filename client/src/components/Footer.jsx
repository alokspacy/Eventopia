import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <footer className="px-6 md:px-16 lg:px-36 mt-40 w-full text-gray-300">
      <div className="flex flex-col md:flex-row justify-between w-full gap-10 border-b border-gray-500 pb-14">
        <div className="md:max-w-96">
          <img className="w-44 h-auto" src={assets.logo} alt="logo" />
          <p className="mt-6 text-sm">
            Eventopia is your ultimate premier platform to browse, select, and book tickets for your favorite cinematic experiences. Book seats in real-time, view live schedules, and complete transactions securely.
          </p>
          <div className="flex items-center gap-2 mt-4">
            <img
              src={assets.googlePlay}
              alt="google play"
              className="h-9 w-auto"
            />
            <img src={assets.appStore} alt="app store" className="h-9 w-auto" />
          </div>
        </div>
        <div className="flex-1 flex items-start md:justify-end gap-20 md:gap-40">
          <div>
            <h2 className="font-semibold mb-5">Company</h2>
            <ul className="text-sm space-y-2">
              <li>
                <a href="#">Home</a>
              </li>
              <li>
                <a href="#">About us</a>
              </li>
              <li>
                <a href="#">Contact us</a>
              </li>
              <li>
                <a href="#">Privacy policy</a>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="font-semibold mb-5">Get in touch</h2>
            <div className="text-sm space-y-2">
              <p>Contact: +91 935478XXXX</p>
              <p>Email: support@eventopia.com</p>
              <p>Address: Mumbai, India</p>
            </div>
          </div>
        </div>
      </div>
      <p className="pt-4 text-center text-sm pb-5 flex items-center justify-center gap-1.5 flex-wrap">
        Copyright 2026 © Eventopia By Alok Singh. All Rights Reserved. | Made with <span className="text-primary font-bold">❤️</span> by Alok Singh
      </p>
    </footer>
  );
};

export default Footer;
