import { useState } from 'react';

const FileUpload = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [summary,setSummary]=useState('');

  const handleFileChange = (e) => {
    setSelectedFiles([...selectedFiles, ...e.target.files]);
  };

  const handleUpload = () => {
    const formData = new FormData();
    for (const file of selectedFiles) {
      formData.append('pdfFiles', file);
    }

    fetch('http://localhost:3000/upload', {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        setSummary(data?.summary)
      })
      .catch((error) => {
        console.error('Error uploading files: ', error);
      });
  };

  return (
    <div className="mx-auto mt-10 p-6 border rounded-lg bg-gray-400 mb-6 shadow-lg">
      <h2 className="text-2xl font-semibold mb-4">Upload files</h2>

      <div className="mb-4">
        <input
          type="file"
          multiple
          onChange={handleFileChange}
          accept=".pdf"
          className="hidden"
          id="fileInput"
        />
        <label
          htmlFor="fileInput"
          className="w-full bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded cursor-pointer"
        >
          Select PDF Files
        </label>
      </div>

      {selectedFiles.length > 0 && (
        <div className="mb-4">
          <p className="font-semibold">Selected Files:</p>
          <ul className="list-disc list-inside">
            {selectedFiles.map((file, index) => (
              <li key={index}>{file.name}</li>
            ))}
          </ul>
        </div>
      )}

      <button
        onClick={handleUpload}
        className="w-full bg-green-500 hover:bg-green-700 text-white py-2 px-4 rounded"
      >
        Upload
      </button>
      <div>
        {summary}
      </div>
    </div>
  );
};

export  {FileUpload};
