import { useState, useEffect } from "react";
import axios from "axios";
import Head from "next/head";
import Link from "next/link";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import Image from "next/image";
import PropagateLoader from "react-spinners/PropagateLoader";

const result = () => {
  const [classified, setClassified] = useState(null);
  const [image, setImage] = useState(null);

  useEffect(() => {
    const fetchClassify = async () => {
      try {
        const result = await axios.get("http://localhost:5000/classify");
        setClassified(await result);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchImage = async () => {
      try {
        const result = await axios.get("http://localhost:5000/get-image", {
          responseType: "blob",
        });
        const blob = result.data;
        setImage(blob);
      } catch (error) {
        console.log(error);
      }
    };

    fetchClassify();
    fetchImage();
  }, []);

  return (
    <>
      {!classified ? (
        <div className="py-[2rem] mr-[8rem] ml-[8rem] space-y-[17vh]  flex items-center justify-center h-[100vh] ">
          <PropagateLoader color={"#2B2118"} size={30} />
          <p className="font-outfit text-base font-bold -translate-x-4">
            Loading
          </p>
        </div>
      ) : (
        <div className="h-screen flex flex-col justify-between">
          <Head>
            <title>Cataract Detector</title>
            <meta name="description" content="Generated by create next app" />
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1"
            />
            <link rel="icon" href="/favicon.ico" />
          </Head>
          <Navbar />
          <div className="py-[2rem] mr-[8rem] ml-[8rem] space-y-5">
            <div className="font-outfit text-5xl font-bold ">
              Classified result
            </div>
          </div>

          <div className="py-[3rem] mr-[8rem] ml-[12rem] space-y-5 flex  mb-auto">
            <Image
              src={URL.createObjectURL(image)}
              alt="download image"
              width={300}
              height={300}
              className="rounded-[50px]"
            />
            <div className="ml-[5rem] w-[33rem] space-y-4">
              <p className="font-outfit text-5xl font-bold">
                {classified.data.result}
              </p>
              <p className="font-robot text-base ">{classified.data.message}</p>
              <div className="pt-6">
                <Link
                  href="/"
                  className="bg-[#2B2118] font-roboto text-white text-base w-fit  px-6 py-3  rounded-[30px] hover:cursor-pointer hover:bg-gray-200 hover:text-[#2B2118] transition delay-100 text-center"
                >
                  Take another test
                </Link>
              </div>
            </div>
          </div>
          {console.log(classified)}
          <Footer />
        </div>
      )}
    </>
  );
};

export default result;
