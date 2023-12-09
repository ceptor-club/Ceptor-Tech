import React, { useState } from 'react';
import { useRouter } from 'next/router';

const UploadPage = () => {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [user, setUser] = useState('');

  const handleRoleSelection = (role) => {
    const userValue = role === 'Gamemaster' ? 'gm' : 'player';
    setUser(userValue);
    router.push(`/burnDie?username=${encodeURIComponent(username)}&user=${encodeURIComponent(userValue)}`);
  };

  return (
    <div className="bg-black min-h-screen flex flex-col justify-center items-center text-white">
      <div className="bg-black text-white py-4 px-2 text-center absolute top-0 left-0 right-0">
        <h1 className="cursor-pointer" onClick={() => handleRoleSelection('Gamemaster')}></h1>
      </div>
      <div className="text-center mt-4">
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
            className="bags-button font-nothing-you-could-do text-xl uppercase text-black py-4 px-6 m-2 rounded-lg cursor-pointer"
            onClick={() => handleRoleSelection('Gamemaster')}
          >
            Gamemaster
          </button>
          <button
            className="bags-button font-nothing-you-could-do text-xl uppercase text-black py-4 px-6 m-2 rounded-lg cursor-pointer"
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
