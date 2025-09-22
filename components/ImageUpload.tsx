import React, { useState, useRef, useCallback } from 'react';
import { CameraIcon } from './icons/CameraIcon';
import { UploadIcon } from './icons/UploadIcon';

interface ImageUploadProps {
  onImageChange: (image: { mimeType: string; data: string } | null) => void;
  t: (key: any) => string;
}

const fileToBase64 = (file: File): Promise<{ mimeType: string; data: string }> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      const base64Data = result.split(',')[1];
      resolve({ mimeType: file.type, data: base64Data });
    };
    reader.onerror = error => reject(error);
    reader.readAsDataURL(file);
  });
};

export const ImageUpload: React.FC<ImageUploadProps> = ({ onImageChange, t }) => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [showCamera, setShowCamera] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        const { mimeType, data } = await fileToBase64(file);
        setImagePreview(URL.createObjectURL(file));
        onImageChange({ mimeType, data });
      } catch (error) {
        console.error("Error reading file:", error);
        // Handle error (e.g., show a notification)
      }
    }
  };

  const openCamera = useCallback(async () => {
    try {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
        streamRef.current = stream;
        setShowCamera(true);
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } else {
        console.error("getUserMedia not supported");
      }
    } catch (err) {
      console.error("Error accessing camera:", err);
    }
  }, []);
  
  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
    }
    setShowCamera(false);
  }, []);

  const capturePhoto = useCallback(() => {
    if (videoRef.current) {
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const context = canvas.getContext('2d');
      if (context) {
        context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL('image/jpeg');
        const base64Data = dataUrl.split(',')[1];
        onImageChange({ mimeType: 'image/jpeg', data: base64Data });
        setImagePreview(dataUrl);
      }
      stopCamera();
    }
  }, [onImageChange, stopCamera]);

  const handleRemoveImage = () => {
    setImagePreview(null);
    onImageChange(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="p-4 bg-gray-50 rounded-lg border border-dashed border-gray-300">
      <h4 className="font-semibold text-gray-800">{t('uploadCropImage')}</h4>
      <p className="text-sm text-gray-500 mb-4">{t('uploadCropImageDesc')}</p>
      
      {imagePreview ? (
        <div className="text-center">
            <img src={imagePreview} alt="Crop Preview" className="mx-auto max-h-48 rounded-lg shadow-sm" />
            <button onClick={handleRemoveImage} className="mt-2 text-sm font-medium text-red-600 hover:text-red-800">
                {t('removeImage')}
            </button>
        </div>
      ) : (
        <div className="flex items-center justify-center space-x-4">
          <button type="button" onClick={openCamera} className="flex-1 inline-flex items-center justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
            <CameraIcon className="w-5 h-5 mr-2" /> {t('useCamera')}
          </button>
          <span className="text-gray-500">{t('or')}</span>
          <button type="button" onClick={() => fileInputRef.current?.click()} className="flex-1 inline-flex items-center justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
             <UploadIcon className="w-5 h-5 mr-2" /> {t('uploadFile')}
          </button>
          <input type="file" accept="image/*" ref={fileInputRef} onChange={handleFileChange} className="hidden" />
        </div>
      )}
      
      {showCamera && (
         <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
           <div className="bg-white p-4 rounded-lg shadow-xl max-w-xl w-full">
             <video ref={videoRef} autoPlay playsInline className="w-full rounded" />
             <div className="mt-4 flex justify-center space-x-4">
                <button onClick={capturePhoto} className="px-6 py-2 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700">{t('capture')}</button>
                <button onClick={stopCamera} className="px-6 py-2 bg-gray-200 text-gray-800 font-semibold rounded-lg hover:bg-gray-300">{t('clear')}</button>
             </div>
           </div>
         </div>
      )}
    </div>
  );
};
