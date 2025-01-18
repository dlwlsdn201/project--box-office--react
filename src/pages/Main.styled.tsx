import styled from 'styled-components';
import { COLOR } from '../lib/palette';
import { FONT_SIZE } from '../config/font';

export const Container = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-flow: column nowrap;
  gap: 1rem;
`;

export const TotalValueCardLayoutWrapper = styled.div`
  display: flex;
  gap: 1.5rem;
  width: 100%;
`;

export const MainSection = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 1rem;
`;

export const ContentWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.75em;
`;

export const ErrorContent = styled.div`
  color: ${COLOR.text.strongColor3};
  font-size: ${FONT_SIZE.MEDIUM};
`;
