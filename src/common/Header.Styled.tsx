import styled from 'styled-components';
import { COLOR } from '../lib/palette';
import { FONT_SIZE, FONT_WEIGHT } from '../config/font';

export const HeaderWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  margin: 0;
  height: 5%;
`;

export const HeaderContents = styled.span`
  font-size: ${FONT_SIZE.EXTRA};
  color: ${COLOR.text.basicColor};
  font-weight: ${FONT_WEIGHT.SEMI_BOLD};
  text-align: center;
  word-break: keep-all;

  @media ${(props) => props.theme.mobileM} {
    padding: 0 1rem;
    font-size: ${FONT_SIZE.SEMI_LARGE};
  }
`;
