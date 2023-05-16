import styled from "styled-components";

export const HomeContainer = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  form{
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 3.5rem;
  }
`;


export const Start = styled.button`
  width: 100%;
  border: none;
  padding: 1rem;
  border: 8px;
  box-shadow: none;

  display: flex;
  align-items: center;
  justify-content: center;

  gap: 0.5rem;
  font-weight: bold;

  color: ${props=>props.theme['gray-100']};
  background-color: ${props=>props.theme['green-500']};
  cursor: pointer;

  &:not(:disabled):hover{
    background-color: ${props=>props.theme['green-700']};
    transition: 0.3s;
  }
  &:disabled{
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

export const Stop = styled.button`
  width: 100%;
  border: none;
  padding: 1rem;
  border: 8px;
  box-shadow: none;

  display: flex;
  align-items: center;
  justify-content: center;

  gap: 0.5rem;
  font-weight: bold;

  color: ${props=>props.theme['gray-100']};
  background-color: ${props=>props.theme['red-500']};
  cursor: pointer;

  &:not(:disabled):hover{
    background-color: ${props=>props.theme['red-700']};
    transition: 0.3s;
  }
  &:disabled{
    opacity: 0.7;
    cursor: not-allowed;
  }
`;