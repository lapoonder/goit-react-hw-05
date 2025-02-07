import React, { useState, useEffect, Suspense } from 'react';
import { useParams, Link, Outlet, useLocation } from 'react-router-dom';
import { queryResults } from '../../tmdb.js';
import clsx from 'clsx';
import css from './MovieDetailsPage.module.css';

const MovieDetailsPage = () => {
  const location = useLocation();
  const backLinkHref = location.state ?? '/movies';
  const { movieId } = useParams();
  const [movie, setMovie] = useState();
  const [error, setError] = useState('');

  useEffect(() => {
    const search = async () => {
      try {
        const data = await queryResults('', '', 0, movieId, 'detail');
        setMovie(data);
      } catch (error) {
        setError(error);
      }
    };
    search();
  }, [movieId]);

  return (
    <>
      <div className="section">
        <div className={clsx('container', css.trendContainer)}>
          <p className={clsx(css.back_page)}>
            <Link to={backLinkHref}>Повернутись назад</Link>
          </p>
          {error && <p>{error}</p>}
          <div className={clsx(css.movie_info_container)}>
            <img
              src={`https://image.tmdb.org/t/p/w500/${movie?.poster_path}`}
              alt={movie?.original_title}
              className={clsx(css.movie_info_img)}
            ></img>
            <div className={clsx(css.movie_info)}>
              <h3>{`${movie?.original_title}
               (${movie?.release_date.slice(0, 4)})`}</h3>
              <p>Popularity: {`${movie?.popularity.toFixed(2)}`}</p>
              <h4>Overview</h4>
              <p>{movie?.overview}</p>
              <h4>Genres</h4>
              <p>{`${movie?.genres.map(gen => {
                return ' ' + gen.name;
              })}`}</p>
            </div>
          </div>
          <div className={clsx(css.more_movie_info)}>
            <p>Дізнатись більше про фільм</p>
            <ul className={clsx(css.more_movie_info_list)}>
              <li>
                <Link to="cast" state={backLinkHref}>
                  Актори
                </Link>
              </li>
              <li>
                <Link to="reviews" state={backLinkHref}>
                  Відгуки
                </Link>
              </li>
            </ul>
          </div>
          <Suspense fallback={<div>Завантаження інформації....</div>}>
            <Outlet />
          </Suspense>
        </div>
      </div>
    </>
  );
};

export default MovieDetailsPage;
