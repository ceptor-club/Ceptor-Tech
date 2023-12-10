import React from 'react';

const Header = ({ text, style }) => <h2 style={style}>{text}</h2>;

const Rectangle = ({ text, style }) => <div style={style}>{text}</div>;

const TextBox = ({ text, style }) => <p style={style}>{text}</p>;

const Square = ({ label, imageSrc, altText, style, labelStyle }) => (
  <div style={style}>
    <p style={labelStyle}>{label}</p>
    <img src={imageSrc} alt={altText} />
  </div>
);

const ConfirmationButtonContainer = ({ onFindAnotherGame, onExport }) => (
  <div style={{ textAlign: 'center', margin: '20px 0' }}>
    <button onClick={onFindAnotherGame}>Find Another Game</button>
    <button onClick={onExport}>Export to Calendar</button>
  </div>
);

function SchedulerConfirmationPage({ onFindAnotherGame, onExport }) {
    const headerStyle = {
    textAlign: 'center',
    fontSize: '24px',
    fontWeight: 'bold',
    margin: '20px 0',
  };

  const rectangleStyle = {
    width: '200px',
    height: '100px',
    backgroundColor: 'lightgray',
    textAlign: 'center',
    lineHeight: '100px',
    margin: '0 auto',
  };

  const textBoxStyle = {
    width: '80%',
    margin: '20px auto',
    textAlign: 'center',
  };

  const squareContainerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
  };

  const squareStyle = {
    width: '100px',
    height: '100px',
    backgroundColor: 'lightblue',
    margin: '10px',
    textAlign: 'center',
    position: 'relative',
  };

  const labelStyle = {
    position: 'absolute',
    top: '-30px',
    left: 0,
    width: '100%',
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  };

  const squaresData = [
    { label: 'Your Ceptor', imageSrc: 'image1.jpg', altText: 'Image 1' },
    { label: 'Aire', imageSrc: 'image2.jpg', altText: 'Image 2' },
    { label: 'Vince', imageSrc: 'image3.jpg', altText: 'Image 3' },
    { label: 'Available', imageSrc: 'image4.jpg', altText: 'Image 4' },
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Header text="Confirmation" style={headerStyle} />
      <Rectangle text="Your Scheduled Game" style={rectangleStyle} />
      <TextBox text="You're ready to join the adventure!" style={textBoxStyle} />
      <div style={squareContainerStyle}>
        {squaresData.map((square, index) => (
          <Square
            key={index}
            label={square.label}
            imageSrc={square.imageSrc}
            altText={square.altText}
            style={squareStyle}
            labelStyle={labelStyle}
          />
        ))}
      </div>
      <ConfirmationButtonContainer onFindAnotherGame={onFindAnotherGame} onExport={onExport} />
    </div>
  );
}

export default SchedulerConfirmationPage;