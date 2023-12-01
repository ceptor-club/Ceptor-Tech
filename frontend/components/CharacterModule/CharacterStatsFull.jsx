import React, { useContext, useEffect, useState } from 'react';
import { CharacterContext } from './CharacterContext';

export const CharacterStatsFull = () => {
    const { characterData } = useContext(CharacterContext);
    const [fullCharacterData, setFullCharacterData] = useState(characterData);

    useEffect(() => {
        setFullCharacterData(characterData);
    }, [characterData]);

    return (
        <div className="flex flex-col items-center bg-black mt-8">
            <h2 className='text-4xl mb-4'>Full Character Stats</h2>
            {Object.entries(fullCharacterData).map(([key, value]) => (
                <div key={key} className="text-center text-white">
                    <strong>{key}:</strong> {value}
                </div>
            ))}
        </div>
    );
};