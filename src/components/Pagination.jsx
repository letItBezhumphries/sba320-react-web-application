import React from 'react';
import { usePagination, DOTS } from '../hooks/usePaginate';

const Pagination = (props) => {
  const {
    onPageChange,
    totalCount,
    siblingCount = 1,
    currentPage,
    pageSize,
  } = props;

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  let lastPage = paginationRange[paginationRange.length - 1];

  return (
    <div className='pagination-container'>
      <button
        className='pagination-item'
        disabled={currentPage === 1 ? true : false}
        onClick={onPrevious}
      >
        <span>Prev</span>
      </button>
      {paginationRange.map((pageNumber) => {
        if (pageNumber === DOTS) {
          return <button className='pagination-item dots'>&#8230;</button>;
        }

        return (
          <button
            className='pagination-item'
            onClick={() => onPageChange(pageNumber)}
          >
            {pageNumber}
          </button>
        );
      })}
      <button
        className='pagination-item'
        disabled={currentPage === lastPage ? true : false}
        onClick={onNext}
      >
        <span className='arrow right'></span>
      </button>
    </div>
  );
};

export default Pagination;
