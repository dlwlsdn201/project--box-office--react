//노마드코더 rendering Movies 영상
import styled from 'styled-components';
import { useQuery } from '@tanstack/react-query';
import { FONT_WEIGHT, FONT_SIZE } from '../../../config/font';
import { DEFAULT_BORDER_RADIUS_REM } from '../../../config/style';
import { COLOR } from '../../../lib/palette';
import { SharedDefaultSkeleton } from '../../../shared/ui';
import { FilterStore, IFilterStore } from '../../../zustand/filter';

const MovieCardContainer = styled.li`
  display: flex;
  gap: 2rem;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background: ${COLOR.sectionColor};
  color: ${COLOR.text.basicColor};
  border-radius: ${DEFAULT_BORDER_RADIUS_REM};

  &:hover {
    background: ${COLOR.hoverBackgroundColor};
    transition: background 0.3s;
  }

  & + & {
    margin-top: 0.1rem;
  }

  @media ${(props) => props.theme.mobile} {
    padding: 1.5rem;
    gap: 1.25rem;
  }
`;

const MovieLeftSideWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  width: 100%;

  @media ${(props) => props.theme.mobile} {
    gap: 1rem;
    justify-content: flex-start;
  }
`;

const MovieRightSideWrapper = styled.div`
  display: inherit;
  flex-flow: column wrap;
  justify-content: center;
  gap: 0.25rem;
  max-width: 12rem;
  align-items: flex-end;
  font-weight: ${FONT_WEIGHT.REGULAR};
  @media ${(props) => props.theme.tabletS} {
    font-size: ${FONT_SIZE.SEMI_SMALL};
  }

  @media ${(props) => props.theme.mobile} {
    font-size: ${FONT_SIZE.SMALL};
  }
`;

const RankWrapper = styled.div`
  display: flex;
  position: relative;
`;

const NewEntryFlagText = styled.h4<{ rankOldAndNew: 'NEW' | 'OLD' }>`
  position: absolute;
  top: -25%;
  left: -50%;
  align-self: flex-start;
  margin: 0;
  font-weight: ${FONT_WEIGHT.THIN};
  ${(props) => (props.rankOldAndNew === 'NEW' ? { color: COLOR['NewRankColor'] } : { color: COLOR['OldRankColor'] })}

  @media ${(props) => props.theme.mobile} {
    font-size: ${FONT_SIZE.SMALL};
    margin-right: 0.2rem;
    ${(props) => (props.rankOldAndNew === 'NEW' ? { color: COLOR['NewRankColor'] } : { color: COLOR['OldRankColor'] })}
  }
`;

const MovieRank = styled.span`
  font-size: ${FONT_SIZE.SEMI_LARGE};
  border-radius: 0.5rem;
  padding: 0.5rem;
  width: 1.25em;
  text-align: center;

  @media ${(props) => props.theme.tabletS} {
    .movie__rank {
      font-size: ${FONT_SIZE.LARGE};
      padding: 0.1rem;
    }
  }

  @media ${(props) => props.theme.mobile} {
    font-size: ${FONT_SIZE.MEDIUM};
    padding: 0.1rem;
  }
`;

const MovieTitle = styled.h2`
  flex: 1;
  min-width: 5rem;
  font-weight: ${FONT_WEIGHT.REGULAR};
  color: ${COLOR.text.basicColor};
  word-break: keep-all;

  @media ${(props) => props.theme.mobile} {
    font-size: ${FONT_SIZE.MEDIUM};
  }
`;

const InlineWrapper = styled.div`
  width: 100%;
  white-space: nowrap;
  display: flex;
  justify-content: space-between;
  gap: 0.75rem;
  @media ${(props) => props.theme.mobile} {
    gap: 0.5rem;
  }
`;

const Label = styled.div`
  display: inline-block;
`;

const Value = styled.div`
  text-align: right;
  width: 100%;
  gap: 0.5rem;
`;

export interface MovieItemProps {
  title: string;
  openDt: string;
  id: string;
  rank: string;
  rankOldAndNew: string;
  audiAcc: string;
  ref: React.ForwardedRef<HTMLLIElement>;
}

const NewEntryFlag = ({ rankOldAndNew }) =>
  rankOldAndNew === 'NEW' && <NewEntryFlagText rankOldAndNew={rankOldAndNew}>{'new'}</NewEntryFlagText>;

const MovieItem = ({ title, openDt, id, rank, rankOldAndNew, audiAcc, ref }) => {
  const { date, nation } = FilterStore<IFilterStore>((state) => state);
  const { isLoading } = useQuery({
    queryKey: ['movieData', date, nation],
    staleTime: 10 * 60 * 1000,
  });
  const formattedAudiAcc = audiAcc?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','); //천 단위 (,) 붙이는 코드
  return (
    <MovieCardContainer ref={ref}>
      <MovieLeftSideWrapper>
        <RankWrapper>
          <NewEntryFlag rankOldAndNew={rankOldAndNew} />
          <MovieRank>{rank}</MovieRank>
        </RankWrapper>
        <MovieTitle>
          <SharedDefaultSkeleton isLoading={isLoading}>{title}</SharedDefaultSkeleton>
        </MovieTitle>
      </MovieLeftSideWrapper>
      <MovieRightSideWrapper>
        <InlineWrapper>
          <Label>개봉일 :</Label>
          <Value>
            <SharedDefaultSkeleton isLoading={isLoading}>
              {openDt !== 'null' && openDt !== ' ' ? openDt : '-'}
            </SharedDefaultSkeleton>
          </Value>
        </InlineWrapper>
        <InlineWrapper>
          <Label>누적 관객 수 :</Label>
          <Value>
            <SharedDefaultSkeleton isLoading={isLoading}>{formattedAudiAcc ?? '-'}</SharedDefaultSkeleton>
          </Value>
          명
        </InlineWrapper>
      </MovieRightSideWrapper>
    </MovieCardContainer>
  );
};

export default MovieItem;
