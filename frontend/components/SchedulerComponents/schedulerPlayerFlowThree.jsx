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

const ButtonContainer = ({ onPrevious, onNext }) => (
  <div style={{ textAlign: 'center', margin: '20px 0' }}>
    <button onClick={onPrevious}>Previous</button>
    <button onClick={onNext}>Confirm</button>
  </div>
);

function PlayerFlowStep3({ onPrevious, onNext, nameOfWorld }) {
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
  <div className="relative flex flex-col items-center pb-12">
    <Header text={nameOfWorld} style={headerStyle} />
    <Rectangle text="CeptorLand" style={rectangleStyle} />
    <TextBox text="Confirm your game" style={textBoxStyle} />
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
    <ButtonContainer onPrevious={onPrevious} onNext={onNext} />
  </div>
);
}

export default PlayerFlowStep3;