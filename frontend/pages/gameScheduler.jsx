import React, { useState } from 'react';
import Image from 'next/image';
import SchedulerPlayerFlowOne from '../components/SchedulerComponents/schedulerPlayerFlowOne';
import SchedulerPlayerFlowTwo from '../components/SchedulerComponents/schedulerPlayerFlowTwo';
import SchedulerPlayerFlowThree from '../components/SchedulerComponents/schedulerPlayerFlowThree';
import SchedulerPlayerConfirmed from '../components/SchedulerComponents/schedulerPlayerConfirmed';

const State = {
    chooseGM: 'chooseGM',
    chooseEvent: 'chooseEvent',
    confirmEvent: 'confirmEvent',
    eventConfirmed: 'eventConfirmed',
}

const initialState = State.chooseGM;

function GameScheduler() {
  const [currentStep, setCurrentStep] = useState(initialState);
  const [eventDate, setEventDate] = useState('');
  const [eventTime, setEventTime] = useState('');
  const [participants, setParticipants] = useState(1);
  const [eventConfirmed, setEventConfirmed] = useState(false);
  const [userChoices, setUserChoices] = useState({});

  const nextStep = (choices) => {
  setUserChoices(prevChoices => ({ ...prevChoices, ...choices }));
  switch (currentStep) {
    case State.chooseGM:
      setCurrentStep(State.chooseEvent);
      break;
    case State.chooseEvent:
      setCurrentStep(State.confirmEvent);
      break;
    case State.confirmEvent:
      setCurrentStep(State.eventConfirmed);
      break;
    default:
      break;
  }
};

  const prevStep = () => {
  switch (currentStep) {
    case State.chooseEvent:
      setCurrentStep(State.chooseGM);
      break;
    case State.confirmEvent:
      setCurrentStep(State.chooseEvent);
      break;
    case State.eventConfirmed:
      setCurrentStep(State.confirmEvent);
      break;
    default:
      break;
  }
};

  const confirmChoices = async () => {
    const response = await fetch('/api/endpoint', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userChoices),
    });
    const data = await response.json();
    // handle response
  };

  const getCurrentStepComponent = () => {
    switch (currentStep) {
      case State.chooseGM:
        return <SchedulerPlayerFlowOne onNext={nextStep} />;
      case State.chooseEvent:
        return <SchedulerPlayerFlowTwo onPrevious={prevStep} onNext={nextStep} />;
      case State.confirmEvent:
        return <SchedulerPlayerFlowThree onPrevious={prevStep} onNext={nextStep} eventDate={eventDate} eventTime={eventTime} />;
      case State.eventConfirmed:
        return <SchedulerPlayerConfirmed eventConfirmed={eventConfirmed} setEventConfirmed={setEventConfirmed} onConfirm={confirmChoices} userChoices={userChoices} />;
      default:
        return <div>Unknown step</div>;
    }
  };
    
    const resetToInitialState = () => {
    setCurrentStep(initialState);
    setEventDate('');
    setEventTime('');
    setParticipants(1);
    setEventConfirmed(false);
    setUserChoices({});
  };

  return (
    <div className='flex flex-col justify-center items-center'>
      <div className='fixed top-0 h-screen w-screen'>
        <Image
          src='/images/CREATE-midpage/midPageImage.png' // Replace with the path to your image
          alt='Background Image' // Replace with a description of the image
          layout='fill'
          objectFit='cover'
          quality={100}
          priority={true}
          className='-z-10'
        />
      </div>
      {getCurrentStepComponent()}
    </div>
  );
}

export default GameScheduler;