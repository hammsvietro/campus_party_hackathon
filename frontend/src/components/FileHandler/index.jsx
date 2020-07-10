import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { FiUpload } from 'react-icons/fi';

import './styles.css';

export function Dropzone({ onFileUploaded }) {
  const [selectedFileUrl, setSelectedFileUrl] = useState('');

  const onDrop = useCallback(acceptedFiles => {
    const file = acceptedFiles[0];
    const fileUrl = URL.createObjectURL(file);
    setSelectedFileUrl(fileUrl);
    onFileUploaded(file)
  }, [acceptedFiles]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({onDrop});

  return (
    <div className="dropzone" {...getRootProps()}>
      <input {...getInputProps()} accept="imaage/*" />

      { selectedFileUrl
          ? <img src={selectedFileUrl} alt="Point Image" /> 
          : (
            <p><FiUpload />Imagem do estabelecimento</p>
          )

      }
    </div>
  )
}