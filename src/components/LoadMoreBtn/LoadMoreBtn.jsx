import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import css from './LoadMoreBtn.module.css';

const LoadMoreBtn = ({ children, page, onClick }) => {
  return (
    <button
      className={clsx(css.loadMoreBtn)}
      onClick={() => {
        onClick(page);
      }}
    >
      {children}
    </button>
  );
};

LoadMoreBtn.propTypes = {
  children: PropTypes.string.isRequired,
  page: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default LoadMoreBtn;
