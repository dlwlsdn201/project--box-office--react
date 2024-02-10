import React, { useState, useCallback, useEffect } from 'react';
import axios from 'axios';
import Header from './common/Header';
import Footer from './common/Footer';
import Movie from './components/Movie';
import Conditions from './components/Conditions';
import GlobalStyles from './GlobalStyles';
import styled from 'styled-components';
import palette from './lib/palette';
import dayjs from 'dayjs';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { mainAtom } from './recoil/app';

const Container = styled.div``;

const LoaderWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin: 3rem auto;
  height: 10rem;
`;

const MainWrapper = styled.section`
  border-top: 1px solid ${palette['fontStrongColor']};
  border-bottom: 1px solid ${palette['fontStrongColor']};
  height: auto;
`;

const App = () => {
  const [mainData, setMainData] = useRecoilState(mainAtom);
  // or
  const { loading, error, movies, date, nation, posters, names } = useRecoilValue(mainAtom);
  const setState = useSetRecoilState(mainAtom);

  interface movie {
    movieNm: string;
    openDt: string;
  }

  const updateState = (nextValues: { [key: string]: unknown }) => setState((prev) => ({ ...prev, ...nextValues }));

  const getMovies = async (DATE: string) => {
    try {
      // setMovies(null);
      // setLoading(true);
      updateState({
        movies: null,
        loading: true,
      });
      const {
        data: {
          boxOfficeResult: { dailyBoxOfficeList },
        },
      } = await axios.get(
        `https://www.kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json?key=4010de0e4173634fe5b671b20aea7c21&targetDt=${DATE}&repNationCd=${nation}`,
      );
      updateState({ movies: dailyBoxOfficeList });
      // setMovies(dailyBoxOfficeList);

      // dailyBoxOfficeList = [{rnum:'', rank:'', rankOldAndNew:'', movieNm: '원더우먼'}]
      // titles = ['원더우먼', '화양연화','조제','소울','도굴', ...]
      const TitleAndDates = dailyBoxOfficeList.map((movie: movie) => ({
        name: movie.movieNm,
        date: movie.openDt,
      }));

      // GetPosterImg();
      console.log(`TitleAndDates: ${TitleAndDates}`);
    } catch (e) {
      updateState({ error: true });
      console.log('에러 원인:', e);
    }
    updateState({ loading: false });
  };

  const DateHandler = useCallback((e): void => {
    let inputDate = '';
    inputDate = e.target.value;
    if (inputDate.length === 8 || parseInt(inputDate) || inputDate === '') {
      updateState({ date: e.target.value });
    } else {
      alert('숫자 형식으로 입력해주세요!');
      updateState({ date: '' });
    }
  }, []);

  const validateDate = (inputDate: string): boolean => {
    let result: boolean = false;
    try {
      const [Year, Month, Day] = [
        Number(inputDate.slice(0, 4)),
        Number(inputDate.slice(4, 6)),
        Number(inputDate.slice(6)),
      ];

      if (0 < Month && Month < 13 && 0 < Day && Day < 32) {
        const date = dayjs(`${Year}-${Month}-${Day}`).format('YYYY-MM-DD');
        const monthRange = dayjs(date).daysInMonth();

        if (Day <= monthRange) {
          result = true;
        } else {
          alert('유효하지 않은 일자입니다.');
          throw Error('유효하지 않은 일자입니다.');
        }
      } else {
        alert('유효하지 않은 날짜입니다.');
        throw Error('유효하지 않은 날짜입니다.');
      }
    } catch (error) {
      console.log('Error:', error);
    }

    return result;
  };

  const SearchExcute = useCallback(
    (e): void => {
      if (date.length === 8 && validateDate(date) && nation !== null) getMovies(date);
      else if (date.length !== 8) alert('입력하신 날짜를 확인해주세요.');
      else if (nation === null) alert('검색할 국가를 선택해주세요.');
    },
    [date, nation],
  );

  const NationHandler = useCallback((e): void => {
    const {
      target: {
        attributes: {
          value: { value },
        },
      },
    } = e;
    let Nation = value === 'K' ? updateState({ nation: 'K' }) : updateState({ nation: 'F' });
    return Nation;
  }, []);

  const setInitDate = (): void => {
    const yesterday: string = dayjs().subtract(1, 'day').format('YYYYMMDD');
    updateState({ date: yesterday });
  };

  useEffect(() => {
    setInitDate();
  }, []);

  interface movieObj {
    movieNm: string;
    movieCd: string;
    openDt: string;
    rank: string;
    rankOldAndNew: string;
    audiAcc: string;
  }

  return (
    <Container>
      <GlobalStyles />
      <Header />
      <Conditions
        date={date}
        nation={nation}
        dateHandler={DateHandler}
        nationHandler={NationHandler}
        SearchExcute={SearchExcute}
      />
      <MainWrapper>
        {movies ? (
          <div className="movies">
            {movies.map((movie: movieObj) => (
              <Movie
                title={movie?.movieNm}
                id={movie?.movieCd}
                key={movie?.movieCd}
                openDt={movie?.openDt}
                rank={movie?.rank}
                rankOldAndNew={movie?.rankOldAndNew}
                audiAcc={movie?.audiAcc}
              />
            ))}
          </div>
        ) : loading ? (
          <LoaderWrapper>데이터를 불러오는 중..</LoaderWrapper>
        ) : (
          <LoaderWrapper>검색 조건을 설정해주세요.</LoaderWrapper>
        )}
      </MainWrapper>

      <Footer />
    </Container>
  );
};

export default App;
