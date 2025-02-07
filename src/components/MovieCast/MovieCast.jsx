import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { queryResults } from '../../tmdb.js';
import clsx from 'clsx';

import css from './MovieCast.module.css';

const MovieCast = () => {
  const { movieId } = useParams();
  const [actors, setActors] = useState();
  const [error, setError] = useState('');

  useEffect(() => {
    const search = async () => {
      try {
        const data = await queryResults('', '', 0, movieId, 'credits');
        setActors(data);
      } catch (error) {
        setError(error); // Тут будемо обробляти помилку
      }
    };
    search();
  }, [movieId]);

  return (
    <>
      {error && <p>{error}</p>}
      <ul className={clsx(css.actor_list)}>
        {actors?.cast.map(actor => {
          return (
            <li key={actor.id}>
              <img
                src={
                  !actor.profile_path
                    ? '/not_found.jpg'
                    : `https://image.tmdb.org/t/p/w500/${actor.profile_path}`
                }
                alt={actor.original_name}
                className={clsx(css.actor_info_img)}
              ></img>
              <div className={clsx(css.actor_info)}>
                <h3>{actor.name}</h3>
                <h4>Character: {actor.character}</h4>
              </div>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default MovieCast;
