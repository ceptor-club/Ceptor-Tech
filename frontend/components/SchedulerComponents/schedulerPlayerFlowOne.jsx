import React, { useState } from 'react';

const ChoiceBox = ({ title, subtitle, description, onClick }) => (
  <div onClick={onClick} className="border-2 border-white p-2 m-2 inline-block text-center">
    <h2>{title}</h2>
    <p>{subtitle}</p>
    <p>{description}</p>
  </div>
);

function PlayerFlowPageOne({ onNext }) {
  const [selectedChoice, setSelectedChoice] = useState(null);

  const choices = [
    {
      id: 1,
      title: 'Jason A.',
      subtitle: 'CeptorLand',
      description: 'Lorem ipsum, lorem ipsum lorem ispum.',
    },
    {
      id: 2,
      title: 'Jason D.',
      subtitle: 'Legends of Moria',
      description: 'Lorem ipsum, lorem ipsum lorem ispum.',
    },
  ];

  const handleChoiceSelect = (choiceId) => {
    setSelectedChoice(choiceId);
  };

  const choiceBoxStyle = {
  '@media (min-width: 640px)': {
    textAlign: 'center',
  },
  '@media (min-width: 768px)': {
    textAlign: 'center',
  },
  border: '2px solid white',
  padding: '10px',
  margin: '10px',
  display: 'inline-block',
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
        title={choice.title}
        subtitle={choice.subtitle}
        description={choice.description}
        onClick={() => handleChoiceSelect(choice.id)}
        style={choiceBoxStyle}
      />
    ))}
    {selectedChoice && (
      <button style={nextButtonStyle} onClick={() => onNext({ selectedGameMaster: selectedChoice })}>Next</button>
    )}
  </div>
);

}

export default PlayerFlowPageOne;