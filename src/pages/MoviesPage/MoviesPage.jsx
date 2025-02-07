import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { useId } from 'react';
import { queryResults } from '../../tmdb.js';
import clsx from 'clsx';
import css from './MoviesPage.module.css';
import MovieList from '../../components/MovieList/MovieList.jsx';

const notify = () => toast('Please enter your text to search movies!');

const MoviesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchText = searchParams.get('searchText');
  const searchPage = Number(searchParams.get('searchPage'));
  const inputFieldId = useId();
  const inputFieldPageId = useId();
  const tipeQuery = 'search_movie';
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [movies, setMovies] = useState([]);
  const [totalPages, setTotalPages] = useState(0);

  // Функція для оновлення ключів
  const updateSearchParams = update => {
    // 1. Копіюємо існуючі параметри
    const updatedParams = new URLSearchParams(searchParams);
    // 2. Оновлюємо ключи
    Object.entries(update).forEach(([key, value]) => {
      updatedParams.set(key, value);
    });
    // 3. Застосовуємо зміни до URL
    setSearchParams(updatedParams);
  };

  const handleSubmit = evt => {
    evt.preventDefault();
    const form = evt.target;
    const searchText = form.elements.searchText.value;
    const searchPage = form.elements.page.value;
    if (searchText.trim() === '') {
      notify();
      return;
    }
    updateSearchParams({
      searchPage: searchPage,
      searchText: searchText,
    });
    setMovies([]);
    setTotalPages(0);
    form.reset();
  };

  const handleNextPage = nextPage => {
    updateSearchParams({
      searchPage: nextPage + 1,
    });
  };

  const handlePrevPage = prevPage => {
    updateSearchParams({
      searchPage: prevPage - 1,
    });
  };

  useEffect(() => {
    setMovies([]);
  }, []);

  useEffect(() => {
    const search = async () => {
      try {
        setError(false);
        setLoading(true);
        const data = await queryResults(
          '',
          searchText,
          searchPage,
          '',
          tipeQuery
        );
        setMovies(data.results);
        setTotalPages(data.total_pages);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    searchText && searchPage && search();
  }, [searchText, searchPage]);

  return (
    <>
      <div className="section">
        <div className={clsx('container', css.trendContainer)}>
          <form onSubmit={handleSubmit} className={clsx(css.searchForm)}>
            <input
              type="text"
              name="searchText"
              id={inputFieldId}
              autoComplete="off"
              autoFocus
              placeholder="Search movie"
            />
            <input type="hidden" name="page" id={inputFieldPageId} value="1" />
            <button type="submit">Search</button>
          </form>
          <Toaster
            containerStyle={{
              top: 60,
              left: 20,
              bottom: 20,
              right: 20,
            }}
            toastOptions={{
              className: ``,
              style: {
                border: '1px solid red',
                padding: '16px',
                color: '#713200',
              },
            }}
          />
        </div>
      </div>
      <MovieList
        error={error}
        totalPages={totalPages}
        page={searchPage}
        onClick={handleNextPage}
        onClickPrev={handlePrevPage}
        movies={movies}
        loading={loading}
        tipeQuery={tipeQuery}
      />
    </>
  );
};

export default MoviesPage;
