import React, { useState } from 'react';

const SubChoiceBox = ({ dayOfWeek, time, onClick, isSelected }) => (
  <div 
    onClick={onClick} 
    className={`border-2 ${isSelected ? 'border-yellow-300' : 'border-gray-800'} p-2 m-2 inline-block text-center bg-gray-800 opacity-50`}
  >
    <p>{dayOfWeek} {time}</p>
  </div>
);

function PlayerFlowPageTwo({ onPrevious, onNext }) {
  const [selectedSubChoice, setSelectedSubChoice] = useState(null);

  const subChoices = [
    {
      id: 1,
      dayOfWeek: 'Sunday',
      time: '2 - 5 pm CST',
    },
    {
      id: 2,
      dayOfWeek: 'Tuesday',
      time: '6 - 9 pm CST',
    },
    {
      id: 3,
      dayOfWeek: 'Thursday',
      time: '7 - 10 pm CST',
    },
  ];

  const handleSubChoiceSelect = (subChoiceId) => {
    setSelectedSubChoice(subChoiceId);
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
          dayOfWeek={subChoice.dayOfWeek}
          time={subChoice.time}
          onClick={() => handleSubChoiceSelect(subChoice.id)}
          isSelected={selectedSubChoice === subChoice.id}
        />
      ))}
      <button style={backButtonStyle} onClick={onPrevious}>Back</button>
      <button style={nextButtonStyle} onClick={onNext} disabled={!selectedSubChoice}>Next</button>
    </div>
  );
}

export default PlayerFlowPageTwo;