import styled from 'styled-components';
const breakpoints = {
  small: '576px',
  medium: '768px',
  large: '992px',
};
const StyledHome = styled.div`
  display: flex;
  height: 950px;
  padding: 20px;
  box-sizing: border-box;
  flex-direction: column;
  background: white;

  @media (max-width: ${breakpoints.medium}) {
    height: auto;
  }
`;

const StyledLogin = styled.div`
  background: linear-gradient(90deg, rgba(210,186,219,1) 0%, rgba(172,136,181,1) 35%, rgba(147,172,203,1) 100%);
  width: 600px;
  height: 700px;
  margin-left: 570px;
  margin-top: 70px;
  border-radius: 15px;

  @media (max-width: ${breakpoints.large}) {
    width: 100%;
    margin-left: 0;
    border-radius: 0;
    height: auto;
  }

  @media (max-width: ${breakpoints.medium}) {
    margin-left: 20px;
    margin-right: 20px;
  }

  .logo {
    width: 120px;
    margin-left: 40px;
    margin-top: 10px;
  }
`;

const StyledTitle = styled.div`
  margin-left: 190px;
  margin-top: -60px;

  @media (max-width: ${breakpoints.medium}) {
    margin-left: 0;
    margin-top: 0;
  }
`;

const StyledInput = styled.div`
  margin-left: 100px;
  margin-top: 60px;

  @media (max-width: ${breakpoints.medium}) {
    margin-left: 0;
    margin-top: 20px;
  }
`;

const StyledButton = styled.div`
  margin-left: 100px;
  margin-top:20px;
  

  @media (max-width: ${breakpoints.medium}) {
    margin-left: 0;
    margin-top: 20px;
  }
`;

export { StyledHome,StyledLogin,StyledTitle,StyledInput,StyledButton };