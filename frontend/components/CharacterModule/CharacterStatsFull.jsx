import React, { useContext, useEffect, useState } from 'react';
import { CharacterContext } from './CharacterContext';

export const CharacterStatsFull = () => {
    const { characterData } = useContext(CharacterContext);
    const [fullCharacterData, setFullCharacterData] = useState(characterData);

    useEffect(() => {
        setFullCharacterData(characterData);
    }, [characterData]);

    return (
        <div>
            <h2>Full Character Stats</h2>
            {Object.entries(fullCharacterData).map(([key, value]) => (
                <div key={key}>
                    <strong>{key}:</strong> {value}
                </div>
            ))}
        </div>
    );
};