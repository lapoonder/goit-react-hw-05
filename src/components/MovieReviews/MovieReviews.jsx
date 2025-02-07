import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { queryResults } from '../../tmdb.js';
import clsx from 'clsx';
import css from './MovieReviews.module.css';

const MovieReviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState();
  const [error, setError] = useState(false);

  useEffect(() => {
    const search = async () => {
      try {
        const data = await queryResults('', '', 1, movieId, 'reviews');
        setReviews(data);
      } catch (error) {
        setError(true);
      }
    };
    search();
  }, [movieId]);

  return (
    <>
      {error && <p className={clsx(css.review_error)}>{error}</p>}
      {reviews?.total_results == 0 && (
        <p className={clsx(css.review_error)}>
          Ще не має відгуків до цього фільму!
        </p>
      )}
      <ul className={clsx(css.review_list)}>
        {reviews?.results.map(review => {
          return (
            <li key={review.id}>
              <h3>{review.author}</h3>
              <p>rating: {review.author_details.rating}</p>
              <p>{review.content}</p>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default MovieReviews;
