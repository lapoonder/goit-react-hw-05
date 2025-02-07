import React, { useRef, useState, useEffect } from 'react';
import MovieList from '../../components/MovieList/MovieList.jsx';
import { useSearchParams } from 'react-router-dom';
import { queryResults } from '../../tmdb.js';
import clsx from 'clsx';
import css from './HomePage.module.css';

const HomePage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialSort = searchParams.get('period') || 'day'; // Если в URL нет параметра, используем "day"
  const [period, setPeriod] = useState(initialSort);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [movies, setMovies] = useState([]);
  const [tipeQuery, setTipeQuery] = useState('');
  const containerRef = useRef(null);

  const handleChangePeriod = trendPeriod => {
    setPeriod(trendPeriod);
    setTipeQuery('trending');
    setMovies([]);
  };

  const handleClick = evt => {
    const clickNav = evt.target;
    const activeElements = containerRef.current.querySelectorAll('.isActive');
    activeElements.forEach(el => el.classList.remove('isActive'));
    clickNav.classList.add('isActive');
    clickNav.dataset.key != period && handleChangePeriod(clickNav.dataset.key);
  };

  useEffect(() => {
    setSearchParams({ period }); // Обновляем URL при изменении сортировки
    const search = async () => {
      try {
        setError(false);
        setLoading(true);
        const data = await queryResults(period, '', 0, '', tipeQuery);
        setMovies(data.results);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    period && search();
  }, [period]);

  //При входе на страницу или возвращении выделяем текущий вариант сортировки
  useEffect(() => {
    const element = document.querySelector(`[data-key=${period}]`);
    element?.classList.add('isActive');
  }, []);

  return (
    <>
      <div className="section">
        <div className={clsx('container', css.trendContainer)}>
          <div className={clsx(css.searchTrand)}>
            <h2>Фільми в тренді за останній:</h2>
            <ul
              ref={containerRef}
              className={clsx(css.navTrand)}
              onClick={handleClick}
            >
              <li key="day" data-key="day" className={clsx(css.link)}>
                день
              </li>
              <li key="week" data-key="week" className={clsx(css.link)}>
                тиждень
              </li>
            </ul>
          </div>
        </div>
      </div>
      <MovieList
        error={error}
        movies={movies}
        loading={loading}
        tipeQuery={tipeQuery}
      />
    </>
  );
};

export default HomePage;
