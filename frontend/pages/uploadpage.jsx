import React from 'react';
import styled from 'styled-components';

const StyledUploadPhoto = styled.div`
  cursor: pointer;
`;

const StyledSignUpContainer = styled.div`
  background-color: #d9d9d9;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;

  @media (max-width: 768px) {
    padding: 20px 10px;
  }
`;

const StyledPhotoUpload = styled.div`
  cursor: pointer;
`;

const StyledUsernameInput = styled.input`
  border: 2px solid black;
  border-radius: 8px;
  padding: 10px;
  margin: 20px 0;
  width: 25%;
  text-align: center;

  &:hover::placeholder {
    color: transparent;
  }

  &:focus {
    outline: none;
  }
`;

const StyledRoleText = styled.p`
  font-weight: bold;
  font-size: 18px;
  margin: 10px 0;
`;

const StyledButtonsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
`;

const StyledButton = styled.button`
  background-color: #2F0213;
  color: white;
  padding: 15px;
  margin: 5px;
  border-radius: 8px;
  font-size: 18px;
  width: 100%;
  box-sizing: border-box;
`;

const UploadPage = () => {
  return (
    <StyledSignUpContainer>
      <StyledPhotoUpload>
        <label htmlFor="photo-upload">Upload Photo</label>
        <input type="file" id="photo-upload" accept="image/*" />
      </StyledPhotoUpload>
      <StyledUsernameInput type="text" placeholder="enter username" />
      <StyledRoleText>Choose your role!</StyledRoleText>
      <StyledButtonsContainer>
        <StyledButton>Gamemaster</StyledButton>
        <StyledButton>Player</StyledButton>
      </StyledButtonsContainer>
    </StyledSignUpContainer>
  );
};

export default UploadPage;
