import React from 'react';
import PropTypes from 'prop-types';
import { MagnifyingGlass } from 'react-loader-spinner';
import MoviesGallery from '../MoviesGallery/MoviesGallery.jsx';
import LoadMoreBtn from '../LoadMoreBtn/LoadMoreBtn.jsx';

const ViewerListMovies = ({
  error,
  totalPages,
  page,
  onClick,
  onClickPrev,
  movies,
  loading,
  tipeQuery,
}) => {
  return (
    <>
      <div className="section">
        <div className="container">
          {error && (
            <p>Whoops, something went wrong! Please try reloading this page!</p>
          )}
          {Object.keys(movies).length > 0 && <MoviesGallery movies={movies} />}
          {tipeQuery == 'search_movie' && page > 1 && (
            <LoadMoreBtn page={page} onClick={onClickPrev}>
              Prev page
            </LoadMoreBtn>
          )}
          {tipeQuery == 'search_movie' && totalPages > page && (
            <LoadMoreBtn page={page} onClick={onClick}>
              Next page
            </LoadMoreBtn>
          )}
          {loading && (
            <MagnifyingGlass
              visible={true}
              height="80"
              width="80"
              ariaLabel="magnifying-glass-loading"
              wrapperStyle={{ margin: 'auto', display: 'block' }}
              wrapperClass="magnifying-glass-wrapper"
              glassColor="#c0efff"
              color="#e15b64"
            />
          )}
        </div>
      </div>
    </>
  );
};

ViewerListMovies.propTypes = {
  error: PropTypes.bool.isRequired,
  totalPages: PropTypes.number,
  page: PropTypes.number,
  onClick: PropTypes.func,
  onClickPrev: PropTypes.func,
  movies: PropTypes.array,
  loading: PropTypes.bool.isRequired,
  tipeQuery: PropTypes.string.isRequired,
};

export default ViewerListMovies;
