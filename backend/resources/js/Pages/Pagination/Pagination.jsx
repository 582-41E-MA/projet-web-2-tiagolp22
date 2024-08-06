import React from 'react';
import './Pagination.css';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const pages = [];

    for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
    }

    return (
        <div className="pagination">
            <button
                className={`page-button ${currentPage === 1 ? 'disabled' : ''}`}
                disabled={currentPage === 1}
                onClick={() => onPageChange(currentPage - 1)}
            >
                &laquo;
            </button>
            {pages.map((page) => (
                <button
                    key={page}
                    className={`page-button ${page === currentPage ? 'active' : ''}`}
                    onClick={() => onPageChange(page)}
                >
                    {page}
                </button>
            ))}
            <button
                className={`page-button ${currentPage === totalPages ? 'disabled' : ''}`}
                disabled={currentPage === totalPages}
                onClick={() => onPageChange(currentPage + 1)}
            >
                &raquo;
            </button>
        </div>
    );
};

export default Pagination;
