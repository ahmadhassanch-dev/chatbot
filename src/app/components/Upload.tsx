import React, { useState } from 'react';
import api from '../api/axios';

const Upload: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [response, setResponse] = useState<string>('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    setFile(selectedFile || null);
  };

  const handleUpload = async () => {
    if (!file) return;
    
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await api.post('/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setResponse(res.data.message);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  return (
    <div>
      <label htmlFor="file-upload">Upload File:</label>
      <input 
        type="file" 
        id="file-upload"
        onChange={handleFileChange}
        aria-label="File upload input"
      />
      <button onClick={handleUpload}>Upload</button>
      {response && <p>Response: {response}</p>}
    </div>
  );
};

export default Upload;
