import React, { useState } from 'react';

const SubChoiceBox = ({ id, date, startTime, onClick, isSelected }) => (
  <div 
    onClick={onClick} 
    className={`border-2 ${isSelected ? 'border-yellow-300' : 'border-gray-800'} p-2 m-2 block text-center bg-gray-800 opacity-50`}
  >
    <p>{date} {startTime}</p>
  </div>
);

function PlayerFlowPageTwo({ onPrevious, onNext }) {
  const [selectedSubChoice, setSelectedSubChoice] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedStartTime, setSelectedStartTime] = useState(null);

  const subChoices = [
    {
      id: 1,
      date: 'December 17, 2024',
      startTime: '4:00 PM',
    },
    {
      id: 2,
      date: 'April 17, 2024',
      startTime: '10:00 AM',
    },
    {
      id: 3,
      date: 'June 9, 2024',
      startTime: '2:00 AM',
    },
  ];

  const handleSubChoiceSelect = (id, date, startTime) => {
    setSelectedSubChoice(id);
    setSelectedDate(date);
    setSelectedStartTime(startTime);
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
    <div>
      <h2>Choose When To Start Your Adventure</h2>
      <div style={{ position: 'relative' }} className="flex flex-col items-center pb-12">
        <div style={{ marginBottom: '40px' }}>
          {subChoices.map((subChoice) => (
            <SubChoiceBox
              key={subChoice.id}
              id={subChoice.id}
              date={subChoice.date}
              startTime={subChoice.startTime}
              onClick={() => handleSubChoiceSelect(subChoice.id, subChoice.date, subChoice.startTime)}
              isSelected={selectedSubChoice === subChoice.id}
            />
          ))}
        </div>
        <div>
          <button style={backButtonStyle} onClick={onPrevious}>Back</button>
          <button style={nextButtonStyle} onClick={() => onNext({ selectedSubChoice, selectedDate, selectedStartTime })} disabled={!selectedSubChoice}>Next</button>
        </div>
      </div>
    </div>
  );
}

export default PlayerFlowPageTwo;