import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Head from "next/head";
import Image from "next/image";
import Navbar from "../components/navbar";
import Footer from "../components/footer";

export default function Home() {
  const [file, setFile] = useState(null);
  const [upload, setUpload] = useState(false);
  const [message, setMessage] = useState(null);
  const { push } = useRouter();
  const inputHandler = useRef();

  const onDragHandler = (event) => {
    event.preventDefault();
  };

  const onDropHandler = (event) => {
    event.preventDefault();
    if (event.dataTransfer.files[0].type.startsWith("image/")) {
      setFile(event.dataTransfer.files);
      setUpload(true);
    } else {
    }
  };

  const onChangeHandler = (event) => {
    setFile(event.target.files);
    setUpload(true);
  };

  const submitHandler = async () => {
    if (upload) {
      const formData = new FormData();
      formData.append("file", file[0]);

      try {
        const response = await axios.post(
          "http://localhost:5000/upload-image",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        console.log(response);
      } catch (error) {
        console.log("error uploading image", error);
      }

      push("/result");
    } else {
      setMessage("No file to be send, please upload a file first!");
    }
  };

  return (
    <>
      <Head>
        <title>Cataract Detector</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <div className="py-[3rem] mr-[8rem] ml-[8rem] space-y-3">
        <div className="font-outfit text-5xl font-bold text-center">
          Cataract Classifier
        </div>
        <div className="italic font-roboto text-center text-base">
          Using CNN based model
        </div>
      </div>

      <div className="flex flex-col justify-center items-center w-fully space-y-[1rem] pb-12">
        <div className="bg-[#2B2118] w-[420px] h-[250px]  rounded-[50px] flex justify-center ">
          {!file ? (
            <div
              className="flex justify-center hover:cursor-pointer w-full"
              onDragOver={onDragHandler}
              onDrop={onDropHandler}
              onClick={() => inputHandler.current.click()}
            >
              <div className="flex flex-col justify-center items-center space-y-5 ">
                <Image
                  src={require("../../public/download.svg")}
                  alt="download image"
                  width={130}
                  height={130}
                />
                <div className="text-white font-roboto text-base">
                  Add or drop your image here (only 1 image)
                </div>
                <input
                  hidden
                  onChange={onChangeHandler}
                  type="file"
                  ref={inputHandler}
                  accept="image/png, image/webp, image/jpeg, image/jpg"
                ></input>
              </div>
            </div>
          ) : (
            <div
              className="text-white font-roboto font-semibold  flex items-center rounded-[50px] w-full justify-center hover:cursor-pointer"
              onDragOver={onDragHandler}
              onDrop={onDropHandler}
              onClick={() => inputHandler.current.click()}
            >
              {file[0].name}
              <input
                accept="image/png, image/webp, image/jpeg, image/jpg"
                hidden
                onChange={(event) => {
                  setFile(event.target.files);
                  setUpload(true);
                }}
                type="file"
                ref={inputHandler}
              ></input>
            </div>
          )}
        </div>
        <div className="font-roboto text-red-500 text-sm ">{message}</div>
        <div
          className="bg-[#2B2118] font-roboto text-white text-base w-fit  px-4 py-2 rounded-full hover:cursor-pointer hover:bg-gray-200 hover:text-[#2B2118] transition delay-100 text-center"
          onClick={submitHandler}
          href="/result"
        >
          {" "}
          Submit
        </div>
      </div>

      <Footer />
    </>
  );
}
