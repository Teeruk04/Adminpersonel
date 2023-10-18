import React from 'react';
import Pagination from 'react-bootstrap/Pagination';

function MyPagination({ currentPage, totalPages, onPageChange }) {
  let items = [];

  // สร้าง Pagination ด้วย loop
  for (let number = 1; number <= totalPages; number++) {
    items.push(
      <Pagination.Item
        key={number}
        active={number === currentPage}
        onClick={() => onPageChange(number)}
      >
        {number}
      </Pagination.Item>
    );
  }

  return (
    <div className="my-pagination">
      <Pagination>{items}</Pagination>
    </div>
  );
}

export default MyPagination;