import React, { useState } from 'react';
import { useRouter } from 'next/router';

const UploadPage = () => {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [pfp, setPfp] = useState(null);
  const [validationMessage, setValidationMessage] = useState('');

  const handlePfpChange = (event) => {
    setPfp(URL.createObjectURL(event.target.files[0])); // Store the image URL
  };

  const handleRoleSelection = (role) => {
    if (!pfp && !username) {
      setValidationMessage('Please upload your PFP and enter your username');
    } else if (!pfp) {
      setValidationMessage('Please upload your PFP');
    } else if (!username) {
      setValidationMessage('Please enter your username');
    } else {
      const userValue = role === 'Gamemaster' ? 'gm' : 'player'; // Updated this line
      router.push(`/burnDie?username=${encodeURIComponent(username)}&user=${encodeURIComponent(userValue)}&pfp=${encodeURIComponent(pfp)}`);
    }
  };

  const handleValidationMessageClose = () => {
    setValidationMessage('');
  };

  return (
    <div className="bg-black min-h-screen flex flex-col justify-center items-center text-white">
      <div className="mt-4 text-center font-nothing-you-could-do">
        <label htmlFor="photo-upload" className="cursor-pointer text-white">
          Upload PFP
        </label>
        <input
          type="file"
          id="photo-upload"
          className="hidden"
          accept="image/*"
          onChange={handlePfpChange}
        />
      </div>
      {pfp && (
        <div className="mt-4 text-center">
          <img
            src={pfp}
            alt="Uploaded PFP"
            className="rounded-full w-32 h-32 mx-auto"
          />
        </div>
      )}
      <div className="mt-4 text-center">
        <input
          type="text"
          placeholder="Enter username"
          className="border-2 border-white rounded-lg p-2 m-4 w-64 text-center text-black"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className="text-center">
        <p className="text-white font-oswald text-xl mb-4">Choose your role</p>
        <div className="flex flex-col items-center">
          <button
            className="bg-yellow-500 font-nothing-you-could-do text-xl uppercase text-black py-4 px-6 m-2 rounded-lg cursor-pointer"
            onClick={() => handleRoleSelection('Gamemaster')}
          >
            Gamemaster
          </button>
          <button
            className="bg-yellow-500 font-nothing-you-could-do text-xl uppercase text-black py-4 px-6 m-2 rounded-lg cursor-pointer"
            onClick={() => handleRoleSelection('Player')}
          >
            Player
          </button>
        </div>
      </div>
      {validationMessage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-4 rounded-lg text-center relative">
            <button onClick={handleValidationMessageClose} className="absolute top-2 right-2 text-black text-lg font-bold cursor-pointer">×</button>
            <p className="text-black font-oswald">{validationMessage}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadPage;
