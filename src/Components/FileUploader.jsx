import React, { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { useState } from 'react';

const FileUploader = ({ onFileSelect }) => {
    const [file, setFile] = useState();
const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      onFileSelect(acceptedFiles[0]);
    }
  }, [onFileSelect]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div className="w-full gradient-border">
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        <div className="space-y-4 cursor-pointer"></div>
        <div className="mx-auto flex flex-col items-center justify-center">
            <img src="/icons/info.svg" alt="upload" className="size-20" />
            {file ?(
                <div></div>
            ):(
                <div><p className='text-lg text-gray-500 '>
                    <span
                    className='font-semibold'
                    >
                        click to upload

                    </span> or drag and drop
                    </p>
                    <p className='text-lg text-gray-500'>PDF (max 20mb)</p>
                </div>
            )}
        </div>
      </div>
    </div>
  )
}

export default FileUploader