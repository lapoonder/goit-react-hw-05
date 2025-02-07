import React from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import css from './NotFoundPage.module.css';

const NotFoundPage = () => {
  return (
    <>
      <div className="section">
        <div className={clsx('container')}>
          <p>Сторінку не знайдено!</p>
          <p className={clsx(css.linkToHomePage)}>
            <Link to="/">Повернутись на головну сторінку</Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default NotFoundPage;
