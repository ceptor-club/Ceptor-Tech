import React, { useState } from 'react';


const HamburgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative z-20 block h-6 w-6 top-3 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-white"
      >
        <span className={`${isOpen ? 'hidden' : 'block'}`}>
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </span>
        <span className={`${isOpen ? 'block' : 'hidden'}`}>
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </span>
      </button>

      <div className={`${isOpen ? 'block' : 'hidden'} relative top-0 left-0 right-0 bottom-1 bg-red-900 z-10`}>
        <div className="p-4">
          <p className="block text-black">Menu Item 1</p>
          <p className="text-black">Menu Item 2</p>
          <p className="text-black">Menu Item 3</p>
        </div>
        
      </div>
    </div>
  );
};

export default HamburgerMenu;
