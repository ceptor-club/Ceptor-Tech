import React, { useState } from 'react';

const SubChoiceBox = ({ body, onClick }) => (
  <div onClick={onClick} className="border-2 border-white p-2 m-2 inline-block text-center">
    <p>{body}</p>
  </div>
);

function PlayerFlowPageTwo({ onPrevious, onNext }) {
  const [selectedSubChoice, setSelectedSubChoice] = useState(null);

  const subChoices = [
    {
      id: 1,
      body: 'Sunday 6 - 9 pm CST',
    },
    {
      id: 2,
      body: 'Tuesday 7 - 10 pm EST',
    },
    {
      id: 3,
      body: 'Thursday 4 - 7 pm PST',
    },
  ];

  const handleSubChoiceSelect = (subChoiceId) => {
    setSelectedSubChoice(subChoiceId);
  };

  const subChoiceBoxStyle = {
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

  const backButtonStyle = {
    position: 'absolute',
    bottom: '20px',
    left: '20px',
  };

  const nextButtonStyle = {
    position: 'absolute',
    bottom: '20px',
    right: '20px',
  };

  return (
    <div className="relative flex flex-col items-center pb-12">
      <h2>Choose When To Start Your Adventure</h2>
      {subChoices.map((subChoice) => (
        <SubChoiceBox
          key={subChoice.id}
          body={subChoice.body}
          onClick={() => handleSubChoiceSelect(subChoice.id)}
          style={subChoiceBoxStyle}
        />
      ))}
      <button style={backButtonStyle} onClick={onPrevious}>Back</button>
      {selectedSubChoice && (
        <button style={nextButtonStyle} onClick={() => onNext({ selectedTime: selectedSubChoice })}>Next</button>
      )}
    </div>
  );
}

export default PlayerFlowPageTwo;