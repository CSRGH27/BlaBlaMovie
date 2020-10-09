import React from 'react'


const Pagination = ({ length, currentPage, onPageChange }) => {
    const itemsPerPage = 10;
    const pagesCount = Math.ceil(length / itemsPerPage)
    const page = [];
    console.log(currentPage);
    for (let i = 1; i < pagesCount; i++) {
        page.push(i)
    }
    return (
        <><div>
            <ul className="pagination">
                <li className="page-item disabled">
                    <button className="page-link"
                        disabled={currentPage === 1}
                        onClick={() => onPageChange(currentPage - 1)}>&laquo;</button>
                </li>
                {page.map((page) => (
                    <li key={page} className={"page-item " + (currentPage === page ? "active" : '')}>
                        <button
                            className="page-link"
                            onClick={() => onPageChange(page)}

                        >{page}</button>
                    </li>
                ))}

                <li className="page-item" >
                    <button className="page-link"
                        disabled={currentPage === pagesCount}
                        onClick={() => onPageChange(currentPage + 1)}>&raquo;</button>
                </li>
            </ul>
        </div></>
    );
}

export default Pagination;