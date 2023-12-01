import React, { useState, useEffect, useCallback } from 'react';
import Vector2 from '../public/images/CREATE-hero/Vector2.png';
import Image from 'next/image';

export default function PDFParser({ setPdfData, pdfData, setError }) {
  const [pdf, setPdf] = useState(null);

  const handlePDFChange = (e) => {
    if (!e.target.files) return;
    const file = e.target.files[0];
    setPdf(file);
  };

  useEffect(() => {
    const handleUpload = async () => {
      if (!pdf) return;
      const body = new FormData();
      body.set('file', pdf);
      try {
        const res = await fetch('/api/PDFParser', {
          method: 'POST',
          body: body,
        });
        // console.log("raw res parse dpf: ", res);
        const data = await res.json();
        // console.log("data: ", data);
        if (data.error) {
          setError(data.error);
          return;
        }
        setPdfData(data);
      } catch (error) {
        console.log('error: ', error);
        setError(error);
      }
    };

    if (pdf) {
      setError(null);
      handleUpload();
    }
  }, [pdf, setError, setPdfData]);

  return (
    <div className={` ${oswald.className} relative h-64 w-72 grid ${!pdf}`}>
      <Image
        src='../public/images/CREATE-hero/Vector2.png'
        alt='background image'
        className='mt-6 h-96 w-68 bg-contain bg-no-repeat cursor-pointer'
        onClick={() => document.getElementById('dropzone-file').click()}
      />

      <input
        onChange={handlePDFChange}
        id='dropzone-file'
        type='file'
        className='hidden'
      />

      <div className='absolute inset-x-0 top-12 left-20 text-4xl cursor-pointer'>
        <p onClick={() => document.getElementById('dropzone-file').click()}>
          <strong>FEED A</strong>
        </p>
      </div>

      <div className='absolute inset-x-0 top-24 left-16 text-4xl cursor-pointer'>
        <p onClick={() => document.getElementById('dropzone-file').click()}>
          character
        </p>
      </div>

      <div className='absolute inset-x-0 top-36 left-24 text-4xl cursor-pointer'>
        <p onClick={() => document.getElementById('dropzone-file').click()}>
          sheet
        </p>
      </div>

      <div className='absolute inset-x-0 top-48 left-20 text-4xl cursor-pointer'>
        <p onClick={() => document.getElementById('dropzone-file').click()}>
          TO THE
        </p>
      </div>

      <div className='absolute inset-x-0 top-60 left-16 text-4xl cursor-pointer'>
        <p onClick={() => document.getElementById('dropzone-file').click()}>
          CREATOR
        </p>
      </div>

      <div className='absolute inset-x-0 top-72 left-10 cursor-pointer'>
        <p onClick={() => document.getElementById('dropzone-file').click()}>
          & lets see what you look like
        </p>
      </div>

      <div className='absolute inset-x-0 top-80 left-14 text-sm cursor-pointer'>
        <p onClick={() => document.getElementById('dropzone-file').click()}>
          UPLOAD OR DRAG HERE
        </p>
      </div>
    </div>
  );
}
