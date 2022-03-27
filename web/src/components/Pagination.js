import React, { useState } from 'react';
import { Row, Col } from 'reactstrap';
import PaginationComponent from "react-reactstrap-pagination";

const Pagination = (props) => {
    const [selectedPage, setPage] = useState(props.page || 1);

    const handleSelected = (selectedPage) => {
        setPage(selectedPage);
        props.handleChangePage(selectedPage);
    }

    if (props.totalPages === 0) {
        return <></>;
    }

    let firstEntry = (selectedPage - 1) * props.pageLimit + 1;
    let lastEntry = selectedPage * props.pageLimit;
    if (lastEntry > props.totalPages) lastEntry = props.totalPages;

    return (
        <Row className="pagination-wrapper justify-content-end align-items-center mt-4 mx-1">
            <Col className="col-6 col-sm-12 col-lg-6">
                <span className="pagination-label">
                    Showing {firstEntry} to {lastEntry} out of {props.totalPages} entries
                </span>
            </Col>
            <Col className="col-6 col-sm-12 col-lg-6">
                <PaginationComponent
                    totalItems={parseInt(props.totalPages)}
                    pageSize={parseInt(props.pageLimit)}
                    onSelect={handleSelected}
                    defaultActivePage={selectedPage}
                    firstPageText="&#8249;"
                    previousPageText="&#8606;"
                    nextPageText="&#8608;"
                    lastPageText="&#8250;"
                />
            </Col>
        </Row>
    );
};

export default Pagination;