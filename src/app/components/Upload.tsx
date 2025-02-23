import React, { useState } from 'react';
import api from '../api/axios';

const Upload: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [response, setResponse] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    setFile(selectedFile || null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;
    setLoading(true);

    try {
      // Convert file to base64 before sending
      const base64Data = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = () => reject(reader.error);
        reader.readAsDataURL(file);
      });
      
      const response = await api.post('/api/upload', {
        image: base64Data,
        mimeType: file.type
      });
      
      setResponse(response.data.analysis);
    } catch (error) {
      console.error('Error uploading file:', error);
      setResponse('Error processing image');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="file-upload" className="block text-sm font-medium text-gray-700">
            Upload Image:
          </label>
          <input 
            type="file" 
            id="file-upload"
            accept="image/*"
            onChange={handleFileChange}
            className="mt-1 block w-full"
            aria-label="File upload input"
          />
        </div>
        <button 
          type="submit" 
          disabled={!file || loading}
          className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          {loading ? 'Processing...' : 'Analyze Image'}
        </button>
      </form>
      {response && (
        <div className="mt-4 p-4 bg-gray-100 rounded">
          <h3 className="font-medium">Analysis Result:</h3>
          <p className="mt-2">{response}</p>
        </div>
      )}
    </div>
  );
};

export default Upload;
