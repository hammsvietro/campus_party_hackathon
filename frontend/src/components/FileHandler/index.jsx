import React, {useCallback, useState} from 'react'
import {useDropzone} from 'react-dropzone'
import { FiUpload } from 'react-icons/fi'

import './styles.css'

export default function MyDropzone({ fileHandler }) {

  const [selectedFileUrl, setSelectedFileUrl] = useState('');

  const onDrop = useCallback(acceptedFiles => {
    const file = acceptedFiles[0];
    const fileUrl = URL.createObjectURL(file);
    setSelectedFileUrl(fileUrl);
    fileHandler(file);

    console.log(acceptedFiles);
  }, [])
  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

  return (
    <div className="dropzone"{...getRootProps()}>
      <input {...getInputProps()} accept="image/*" />
      { 
        selectedFileUrl
          ? (
              <div className="inside">
                <img src={selectedFileUrl} alt="Point Image" />
              </div>
              )
          : (
            <div className="inside">
              <p>Foto ou Logo da Entidade</p>
              <FiUpload size={32} />
            </div>
            
          )
      }
    </div>
  )
}