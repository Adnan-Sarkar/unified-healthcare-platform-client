"use client";

import Image from "next/image";
import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { SxProps } from "@mui/system";
import { Controller, useFormContext } from "react-hook-form";
import uploadIcon from "@/assets/upload.svg"

type FileUploaderProps = {
  name: string;
  label?: string;
  sx?: SxProps;
};

const FileUploader = ({ name, label }: FileUploaderProps) => {
  const { control } = useFormContext();

  const convertFileToUrl = (file: File) => URL.createObjectURL(file);
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value }, fieldState: { error } }) => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const onDrop = useCallback(
          (acceptedFiles: File[]) => {
            onChange(acceptedFiles[0]);
          },
          [onChange]
        );

        // eslint-disable-next-line react-hooks/rules-of-hooks
        const { getRootProps, getInputProps } = useDropzone({ onDrop });

        return (
          <div
            {...getRootProps()}
            className="text-12-regular flex cursor-pointer flex-col items-center justify-center gap-3 rounded-md border border-dashed border-dark-500 bg-dark-400 p-5"
          >
            <input {...getInputProps()} />
            {value ? (
              <Image
                src={convertFileToUrl(value)}
                width={200}
                height={200}
                alt="uploaded image"
                className="max-h-[400px] overflow-hidden object-cover"
              />
            ) : (
              <>
                <Image
                  src={uploadIcon}
                  width={40}
                  height={40}
                  alt="upload"
                />
                <div className="flex flex-col justify-center gap-2 text-center text-dark-600">
                  <p className="text-14-regular">
                    <span className="text-green-500">Click to upload </span>
                    or drag and drop
                  </p>
                </div>
              </>
            )}
            {error && <p className="text-red-500 text-sm">{error.message}</p>}
          </div>
        );
      }}
    />
  );
};

export default FileUploader;
