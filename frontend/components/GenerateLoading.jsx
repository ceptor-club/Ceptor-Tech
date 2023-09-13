import { useState, useEffect } from "react";

const GenerateLoading = () => {

    return (
        <>
            <div className="flex flex-col items-center justify-center stats text-white md:3/6 h-[300px] p-16 mt-8">
                <div className="text-sm">Images Loading...</div>
                <progress min="0" max="100" value="44">44</progress>
            </div>
        </>
    );
}

export default GenerateLoading;