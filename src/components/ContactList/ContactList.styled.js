import styled from 'styled-components';

export const List = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(420px, 1fr));
  grid-template-rows: auto;
  gap: 20px;
  margin: 0;
  padding: 20px;
`;

export const ListItem = styled.li`
  display: flex;
  gap: 10px;
  justify-content: space-between;
`;

export const Button = styled.button`
  width: 150px;
  border-radius: 5px;
  border: none;
  background-color: #fff;
  transition: all 250ms linear;
  :hover,
  :focus {
    background-color: #74ebd5;
    transform: scale(1.1);
  }
`;

export const Line = styled.p`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 5px;
`;
