import React, { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import clsx from 'clsx';
import css from './App.module.css';
import Navigation from '../Navigation.jsx';
const HomePage = lazy(() => import('../../pages/HomePage/HomePage.jsx'));
const MoviesPage = lazy(() => import('../../pages/MoviesPage/MoviesPage.jsx'));
const MovieDetailsPage = lazy(() =>
  import('../../pages/MovieDetailsPage/MovieDetailsPage.jsx')
);
const NotFoundPage = lazy(() =>
  import('../../pages/NotFoundPage/NotFoundPage.jsx')
);
const MovieCast = lazy(() => import('../MovieCast/MovieCast.jsx'));
const MovieReviews = lazy(() => import('../MovieReviews/MovieReviews.jsx'));

const App = () => {
  return (
    <>
      <header className="header">
        <div className={clsx('container', css.header_container)}>
          <h1>GoIT React HW-05</h1>
          <p>сервіс пошуку фільмів</p>
        </div>
      </header>
      <main>
        <Navigation />
        <Suspense fallback={<div>Завантаження інформації....</div>}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/movies/" element={<MoviesPage />} />
            <Route path="/movies/:movieId" element={<MovieDetailsPage />}>
              <Route path="cast" element={<MovieCast />} />
              <Route path="reviews" element={<MovieReviews />} />
            </Route>
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </main>
      <footer className="footer"></footer>
    </>
  );
};

export default App;
