import React from 'react';
import styled from 'styled-components';

const StyledLogo = styled.div`
  border: 1px solid black; 
  padding: 20px;
  width: 140px;
`

const Logo = () => {
  return (
    <StyledLogo>
      30 days of...
    </StyledLogo>
  )
}

export default Logo;
