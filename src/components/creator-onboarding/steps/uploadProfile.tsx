import useGlobalStore from '@/hooks/store/useGlobalStore';
import React, { useState } from 'react';
import { IoIosCloseCircleOutline } from 'react-icons/io';
const UploadProfile = () => {
  const { setUserInfo } = useGlobalStore();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onload = () => {
        const base64String = reader.result as string;
        setUserInfo({ profileImage: base64String });
      };
      reader.readAsDataURL(file);
    }
  };
  return (
    <>
      <label
        htmlFor='profile'
        className='block text-sm font-medium leading-6 text-gray-900'
      >
        Upload Your profile picture
        <div className='text-[12px] text-gray-500'>
          It will be visible to your audience.
        </div>
      </label>
      <div className='mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10'>
        <div className='text-center'>
          {selectedFile ? (
            <div className='relative'>
              <img
                src={URL.createObjectURL(selectedFile)}
                alt='Selected profile'
                className='object-cover'
              />
              <div className='absolute top-[-10px] right-[-10px] text-white'>
                <IoIosCloseCircleOutline
                  size={30}
                  color='black'
                  className='cursor-pointer'
                  onClick={() => {
                    setSelectedFile(null);
                    setUserInfo({ profileImage: '' });
                  }}
                />
              </div>
            </div>
          ) : (
            <>
              <svg
                className='mx-auto h-12 w-12 text-gray-300'
                viewBox='0 0 24 24'
                fill='currentColor'
                aria-hidden='true'
              >
                <path
                  fillRule='evenodd'
                  d='M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z'
                  clipRule='evenodd'
                />
              </svg>
              <div className='mt-4 flex text-sm leading-6 text-gray-600'>
                <label
                  htmlFor='file-upload'
                  className='relative cursor-pointer rounded-md font-semibold text-indigo-600 hover:text-indigo-500'
                >
                  <span>Upload a file</span>
                  <input
                    id='file-upload'
                    name='file-upload'
                    type='file'
                    className='sr-only'
                    onChange={handleFileChange}
                  />
                </label>
                <p className='pl-1'>or drag and drop</p>
              </div>
              <p className='text-xs leading-5 text-gray-600'>
                PNG, JPG, GIF up to 10MB
              </p>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default UploadProfile;
