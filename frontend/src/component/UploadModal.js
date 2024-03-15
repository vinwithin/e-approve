import React from 'react'

const UploadModal = ({ onClose }) => {
    const handleClose = () => {
        onClose(); // Call onClose function passed from parent component
      };
  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen">
        <div className="relative bg-white w-1/3 p-8 rounded-lg shadow-lg">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-800">Upload Successful</h2>
           
          </div>
          <p className="text-gray-700 mt-4">Your file has been successfully uploaded.</p>
          <button type="submit" onClick={handleClose} className="py-2 px-2  border border-transparent rounded-md shadow-sm text-sm font-medium bg-yellow-400 text-white hover:text-gray-700">Tutup</button>
        </div>
      </div>
      
    </div>
  )
}

export default UploadModal;
