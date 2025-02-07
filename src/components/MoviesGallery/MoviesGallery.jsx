import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { Link, useLocation } from 'react-router-dom';
import css from './MoviesGallery.module.css';

const MoviesGallery = ({ movies }) => {
  const location = useLocation();
  return (
    <ul className={clsx(css.imageList)}>
      {movies.map(movie => {
        return (
          <li key={movie.id}>
            <Link to={`/movies/${movie.id}`} state={location}>
              {movie.title}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

MoviesGallery.propTypes = {
  movies: PropTypes.array.isRequired,
};

export default MoviesGallery;
