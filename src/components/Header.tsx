import React from 'react';
import styled from 'styled-components';

export default function Header() {
  return (
    <HeaderContainer>
      <ProjectName>Culture.map()</ProjectName>
      <TeamName>순이와 아이들</TeamName>
    </HeaderContainer>
  );
}

const HeaderContainer = styled.div`
  background-color: #242c44;
  color: white;
  height: 50px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
const ProjectName = styled.div`
  font-size: 25px;
`;
const TeamName = styled.div`
  font-size: 15px;
`;