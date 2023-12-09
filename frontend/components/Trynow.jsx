import React from "react";

const Trynow = () => {
  return (
    <a href="#create">
    <button
            id="trynow" type="button"
            onClick={(e) => (e.target.className = "hidden")}
            className="relative bottom-50 m-auto h-50 w-400 rounded-full bg-red-700 text-black font-medium p-4 dark:bg-red-600 border-2 border-black text-xl hover:bg-[#F87171] hover:text-white transition-all duration-500 mt-3">
            TRY NOW
    </button>
    </a>
    
  );
};

export default Trynow;
