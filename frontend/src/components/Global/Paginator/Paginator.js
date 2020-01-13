import React from 'react'
import ReactPaginate from 'react-paginate'
import { PaginatorWrapper } from './styles/paginator'
import { ANGLE_LEFT_ICON, ANGLE_RIGHT_ICON } from '../../../styles/abstract/variables'

export default function Paginator(props) {
  const { pagination, handlePagination } = props
  return (
    <PaginatorWrapper>
      <ReactPaginate
        previousLabel={<i className={ANGLE_LEFT_ICON}/>}
        nextLabel={<i className={ANGLE_RIGHT_ICON}/>}
        breakLabel={'...'}
        forcePage={pagination.page - 1}
        initialPage={pagination.page - 1}
        pageCount={pagination.pageCount}
        marginPagesDisplayed={1}
        pageRangeDisplayed={2}
        onPageChange={page => handlePagination(page)}
        containerClassName={'paginator-wrapper'}
      />
    </PaginatorWrapper>
  )
}