import { keyframes } from 'styled-components';

const fadeInUp = keyframes`
  from {
    transform: translate(-10px, 0px);
    opacity:0;
  to {
    transform: translate(0px, 0px);
    opacity:1;
  };
`;

export default fadeInUp;
