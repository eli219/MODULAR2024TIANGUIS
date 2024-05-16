import styled from 'styled-components';

const StyledMenu = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  width: 100%;
  box-sizing: border-box;
  width: 250px;
  height: 984px;
  left: 20px;
  top: 20px;
  background: rgb(210,186,219);
  background: linear-gradient(90deg, rgba(210,186,219,1) 0%, rgba(172,136,181,1) 35%, rgba(147,172,203,1) 100%);  
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.25);
  border-radius: 50px;
`;

const StyledUl = styled.ul`
  list-style-type: none;
  width: 100%;
  margin: 0;
  padding: 0;
  & .logo{
    width:120px;
    margin-left:60px;
    margin-top:10px;
  }
`;

const StyledLi = styled.li`
  margin: 20px 0px;
  & .selected {
    color: #ffffff;
    width:200px;
    height:30px;
    margin-left:20px;
    border-radius: 10px;
    cursor:pointer;
    background: linear-gradient(70deg, #c6409a, #b03933);
    box-shadow: 0px 3px 5px 0px rgba(0, 0, 0, 0.25);
    &:hover {
      color: #ffffff;
      transform: scale(1.02);
    }
`;

export { StyledMenu, StyledUl, StyledLi };
