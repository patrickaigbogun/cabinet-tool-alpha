'use client';

import { useCallback, useState } from "react";
import { UserFileStore } from "../types/objects";
import { handleFileUpload } from "../actions/server/uploadFile";
import { getUserIdFromCookie } from "../actions/server/actions";



export default function CabinetPage() {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle');

  const handleClick = useCallback(() => {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.multiple = true;
    fileInput.onchange = (e) => {
      const target = e.target as HTMLInputElement;
      try {
        if (target.files) {
          console.log('Selected files:', target.files);
        }
      } catch (error) {
        console.log(error)
      }
    };
    fileInput.click();
  }, []);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => setIsDragging(false);

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    console.log('Dropped files');
    setIsDragging(false);
    setUploadStatus('uploading');

    const file = e.dataTransfer.files[0];
    const userFileStore: UserFileStore = {
      file,
      name: file.name,
      size: file.size,
      type: file.type,
      lastModified: file.lastModified
    };

    try {
      // Get user ID from the server action
      const userId = await getUserIdFromCookie();
      const result = await handleFileUpload(userFileStore, userId);
      
      if (result.success) {
        setUploadStatus('success');
      } else {
        setUploadStatus('error');
      }
    } catch (error) {
      console.error('Upload error:', error);
      setUploadStatus('error');
    }
  };

  return (
    <div
      id="drop-target"
      className={`${isDragging ? 'border-purple-400 bg-purple-950/10 animate-pulse duration-75' : 'border-gray-400'} flex items-center justify-center border-2 border-dashed rounded-lg p-4 text-white text-center h-72`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={handleClick}
    >
      <p className="text-base">
        Drag and drop files here or click to upload
      </p>
      {uploadStatus === 'uploading' && <p>Uploading...</p>}
      {uploadStatus === 'success' && <p>Upload complete!</p>}
      {uploadStatus === 'error' && <p>Upload failed</p>}
    </div>
  );
}