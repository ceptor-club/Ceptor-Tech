import React, { useState } from 'react';

const ChoiceBox = ({ gameMasterID, nameOfWorld, worldDescription, onClick, isSelected }) => (
  <div 
    onClick={onClick} 
    className={`border-2 ${isSelected ? 'border-yellow-300' : 'border-gray-800'} p-2 m-2 inline-block text-center w-1/3 bg-gray-800 opacity-50`}
  >
    <h2>{gameMasterID}</h2>
    <p>{nameOfWorld}</p>
    <p>{worldDescription}</p>
  </div>
);

function PlayerFlowPageOne({ onNext }) {
  const [selectedChoice, setSelectedChoice] = useState(null);
  const choices = [
    {
      id: 1,
      gameMasterID: 'Jason A.',
      nameOfWorld: 'CeptorLand',
      worldDescription: 'A mystical world of enchanted forests and ancient ruins, where magic is as common as the air we breathe.',
    },
    {
      id: 2,
      gameMasterID: 'Jason D.',
      nameOfWorld: 'Legends of Moria',
      worldDescription: 'A realm of towering mountains and deep mines, where dwarves and dragons vie for control of precious gems.',
    },
  ];

  const handleChoiceSelect = (choiceId) => {
    setSelectedChoice(choiceId);
  };

  const nextButtonStyle = {
    position: 'absolute',
    bottom: '20px',
    right: '20px',
  };

return (
  <div className="relative flex flex-col items-center pb-12">
    <h1>Choose a GameMaster</h1>
    {choices.map((choice) => (
      <ChoiceBox
        key={choice.id}
        gameMasterID={choice.gameMasterID}
        nameOfWorld={choice.nameOfWorld}
        worldDescription={choice.worldDescription}
        onClick={() => handleChoiceSelect(choice.id)}
        isSelected={selectedChoice === choice.id}
      />
    ))}
    {selectedChoice && (
      <button style={nextButtonStyle} onClick={() => onNext({ selectedGameMaster: selectedChoice })}>Next</button>
    )}
  </div>
);

}

export default PlayerFlowPageOne;