import React, { useState } from 'react';
import { useRouter } from 'next/router';

const UploadPage = () => {
  const router = useRouter();
  const [username, setUsername] = useState('');

  const handleRoleSelection = (role) => {
    router.push(`/burnDie?username=${encodeURIComponent(username)}&role=${encodeURIComponent(role)}`);
  };

  return (
    <div className="bg-gray-200 min-h-screen flex flex-col justify-center items-center">
      <div className="bg-black text-white py-4 px-2 text-center absolute top-0 left-0 right-0">
        <h1 className="cursor-pointer" onClick={() => handleRoleSelection('Gamemaster')}>hackathon!</h1>
        <h2>0.11.30</h2>
      </div>
      <div className="bg-gray-200 text-center">
        <p className="text-2xl text-black font-bold mb-4">Welcome to Ceptor Club</p>
        <p className="text-4xl text-black font-bold mb-8">Create D&D character and storyline onchain!</p>
      </div>
      <div className="bg-gray-200 text-center">
        <label htmlFor="photo-upload" className="cursor-pointer">Upload Photo</label>
        <input type="file" id="photo-upload" className="hidden" accept="image/*" />
        <input
          type="text"
          placeholder="Enter username"
          className="border-2 border-black rounded-lg p-2 m-4 w-64 text-center text-black"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <p className="text-black font-bold text-xl mb-4">Choose your role!</p>
        <div className="flex flex-col items-center">
          <button
            className="bg-black text-white p-4 m-2 rounded-lg font-bold text-xl w-64 cursor-pointer hover:bg-opacity-90"
            onClick={() => handleRoleSelection('Gamemaster')}
          >
            Gamemaster
          </button>
          <button
            className="bg-black text-white p-4 m-2 rounded-lg font-bold text-xl w-64 cursor-pointer hover:bg-opacity-90"
            onClick={() => handleRoleSelection('Player')}
          >
            Player
          </button>
        </div>
      </div>
    </div>
  );
};

export default UploadPage;
