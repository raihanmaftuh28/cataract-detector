import Image from "next/image";

const Footer = () => {
  return (
    <div className="bg-[#2B2118] py-9">
      <div className="mr-[8rem] ml-[8rem] text-white text-xl font-roboto grid grid-cols-8">
        <div className="space-y-3 col-span-6">
          <p>
            Created by{" "}
            <span className="font-semibold">Raihan Fadhil Maftuh</span>
          </p>
          <p>Yogyakarta, April 2023</p>
        </div>
        <div className="space-y-3">
          <p>Follow Me</p>
          <div className="flex space-x-4">
            <a href="https://www.instagram.com/raihan_maftuhf/">
              <Image
                src={require("../../public/instagram.svg")}
                alt="instagram"
                className="hover:scale-125 transition delay-100 hover:cursor-pointer"
              />
            </a>
            <a href="https://www.linkedin.com/in/raihanfadhilmaftuh/">
              <Image
                src={require("../../public/LinkedIn.svg")}
                alt="instagram"
                className="hover:scale-125 transition delay-100 hover:cursor-pointer"
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
