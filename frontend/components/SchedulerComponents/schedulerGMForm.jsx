import React, { useState } from 'react';

const NextButton = ({ onNext }) => (
  <button onClick={onNext} className="btn-next fixed bottom-4 right-4">
    Next
  </button>
);


const Select = ({ options, value, onChange, className }) => (
  <select
    value={value}
    onChange={onChange}
    className={`form-select ${className} bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5`}
  >
    {options.map((option, index) => (
      <option key={index} value={option.value}>{option.label}</option>
    ))}
  </select>
);

const Input = ({ type, value, onChange, className, checked }) => (
  <input
    type={type}
    value={value}
    onChange={onChange}
    className={`form-input ${className} ${type === 'checkbox' ? 'form-checkbox' : 'border border-gray-300 p-2.5 rounded-lg'} w-full`}
    checked={checked}
  />
);


function MeetingForm() {
  const [meetingName, setMeetingName] = useState('');
  const [meetingDescription, setMeetingDescription] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedDay, setSelectedDay] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [numberOfParticipants, setNumberOfParticipants] = useState(1);
    const [continueCampaigns, setContinueCampaigns] = useState(false);
    const [currentStep, setCurrentStep] = useState(1);
  const nextStep = () => setCurrentStep(currentStep + 1);

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ].map(month => ({ value: month, label: month }));

  const daysInMonth = Array.from({ length: 31 }, (_, i) => ({ value: i + 1, label: i + 1 }));

  const hours = Array.from({ length: 24 }, (_, i) => {
    const time = `${i.toString().padStart(2, '0')}:00`;
    return { value: time, label: time };
  });

  const inputClassName = "character-stat"; // Replace with actual Tailwind CSS classes

  return (
    <div className="meeting-form">
      <h2 className="text-2xl font-bold mb-4">Set Your GM Availability</h2>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Game Name:</label>
        <Input type="text" value={meetingName} onChange={(e) => setMeetingName(e.target.value)} className={inputClassName} />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Description:</label>
        <Input type="text" value={meetingDescription} onChange={(e) => setMeetingDescription(e.target.value)} className={inputClassName} />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Month:</label>
        <Select options={months} value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)} className={inputClassName} />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Day:</label>
        <Select options={daysInMonth} value={selectedDay} onChange={(e) => setSelectedDay(e.target.value)} className={inputClassName} />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Start Time:</label>
        <Select options={hours} value={startTime} onChange={(e) => setStartTime(e.target.value)} className={inputClassName} />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">End Time:</label>
        <Select options={hours} value={endTime} onChange={(e) => setEndTime(e.target.value)} className={inputClassName} />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Number of Participants:</label>
        <Select
          options={[...Array(10).keys()].map(num => ({ value: num + 1, label: num + 1 }))}
          value={numberOfParticipants}
          onChange={(e) => setNumberOfParticipants(Number(e.target.value))}
          className={inputClassName}
        />
      </div>
      <div className="mb-4">
        <label className="flex items-center text-sm font-medium mb-2">
          Continue Campaigns Regardless of Player Attendance:
          <Input type="checkbox" checked={continueCampaigns} onChange={(e) => setContinueCampaigns(e.target.checked)} className="ml-2" />
        </label>
          </div>
          <NextButton onNext={nextStep} />
    </div>
  );
}

export default MeetingForm;