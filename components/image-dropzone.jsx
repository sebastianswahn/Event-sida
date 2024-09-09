"use client";

import { cn } from "@lib/utils";
import { useState } from "react";
import Dropzone from "react-dropzone";
import { Button } from "./ui/button";
import Image from "next/image";
import { ImageDown } from "lucide-react";

const MAX_FILE_SIZE = 10 * 1024 * 1024; //10MB

export const ImageDropzone = ({
  selectedImage,
  setSelectedImage,
  setImageError,
}) => {
  const [imageSrc, setImageSrc] = useState(selectedImage || "");
  const [isDragOver, setIsDragOver] = useState(false);

  const onDropAccepted = (acceptedFiles) => {
    console.log(acceptedFiles);
    setImageError("");
    const file = acceptedFiles[0];
    const reader = new FileReader();

    reader.onload = async (x) => {
      setImageSrc(x.target.result);
    };
    reader.readAsDataURL(file);
    setSelectedImage(file);
  };
  const onDropRejected = (fileRejections) => {
    console.log(fileRejections);
    setImageError(fileRejections[0].errors[0].message);
    setTimeout(() => {
      setImageError("");
    }, 4000);
    setIsDragOver(false);
  };

  return (
    <div className="flex justify-center items-center ">
      <div
        className={cn(
          " rounded-lg w-full xl:w-1/2 max-w-[800px] aspect-video bg-slate-500/10 ring-1 ring-slate-500/50 relative",
          isDragOver && "ring-blue-500/20 bg-blue-500/5"
        )}
      >
        <Dropzone
          maxFiles={1}
          maxSize={MAX_FILE_SIZE}
          multiple={false}
          onDragEnter={() => setIsDragOver(true)}
          onDragLeave={() => setIsDragOver(false)}
          onDropAccepted={onDropAccepted}
          onDropRejected={onDropRejected}
          accept={{
            "image/png": [".png"],
            "image/jpeg": [".jpeg"],
            "image/jpg": [".jpg"],
            "image/webp": [".webp"],
          }}
        >
          {({ getInputProps, getRootProps, open }) => (
            <div
              className={cn(
                "h-full w-full flex items-center justify-center text-center p-4 cursor-pointer",
                imageSrc && "invisible"
              )}
              {...getRootProps()}
            >
              <input {...getInputProps()} />
              <p className="p-1">
                Drag 'n' drop an image here, or click to select image
              </p>
              <ImageDown />
              <Button
                type="button"
                className={cn(
                  "absolute right-0 -bottom-12 xl:bottom-0 xl:-right-40 invisible pointer-events-none",
                  imageSrc && "visible pointer-events-auto"
                )}
              >
                change image
              </Button>
            </div>
          )}
        </Dropzone>
        {imageSrc && (
          <Image
            src={imageSrc}
            width={500}
            height={300}
            alt="event image"
            className="absolute inset-0 object-cover w-full h-full rounded-lg"
          />
        )}
      </div>
    </div>
  );
};
