import { useRouter } from 'next/router';
import styled from 'styled-components';

const StyledDiv = styled.div`
  background-color: #d9d9d9;
  color: black;
  text-align: center;
  padding: 40px 20px;
  position: relative;
  height: 100vh;

  @media (max-width: 768px) {
    padding: 20px 10px;
  }
`;

const StyledBanner = styled.div`
  background-color: black;
  color: white;
  padding: 20px;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  text-align: center;
`;

const StyledTextContainer = styled.div`
  color: #2F0213;
  margin-top: 80px;
`;

const StyledWelcomeText = styled.p`
  font-size: 16px;
  margin-bottom: 10px;
`;

const StyledMainText = styled.p`
  font-size: 24px;
  font-weight: bold;
`;

const StyledButtonContainer = styled.div`
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
  width: 25%;
  box-sizing: border-box;
`;

const CCID = () => {
  const router = useRouter();

  const handleCreateIDClick = () => {
    router.push('/uploadpage');
  };

  return (
    <StyledDiv>
      <StyledBanner>
        <h1 onClick={handleCreateIDClick}>hackathon!</h1>
        <h2>0.11.30</h2>
      </StyledBanner>
      <StyledTextContainer>
        <StyledWelcomeText>Welcome to Ceptor Club</StyledWelcomeText>
        <StyledMainText>Create D&D character and storyline onchain!</StyledMainText>
      </StyledTextContainer>
      <StyledButtonContainer>
        <StyledButton onClick={handleCreateIDClick}>Create ID</StyledButton>
        <StyledButton>Log-in</StyledButton>
      </StyledButtonContainer>
    </StyledDiv>
  );
};

export default CCID;
