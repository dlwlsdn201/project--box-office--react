import { FONT_SIZE } from '@shared/config/font';
import { COLOR } from '@shared/config/palette';
import { RESPONSIVE_MEDIA_QUERY } from '@shared/config/responsive';
import styled from 'styled-components';

export const TotalValueCardLayoutWrapper = styled.div`
  display: flex;
  width: 100%;
  gap: 0.75rem;

  @media ${RESPONSIVE_MEDIA_QUERY.desktop} {
    padding: 0 10rem;
  }
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
