import React from 'react'
import Infinity from 'react-infinite-scroll-component'
import loaderMobile from '../../assets/loaderMobile.svg'
import { LoaderImage, LoaderWrapper } from '../../styles/shared/wrapper'

export function Loader () {
  return (
    <LoaderWrapper>
      <LoaderImage src={loaderMobile} />
    </LoaderWrapper>
  )
}

export default function InfiniteScroll ({ data, pagination, handlePagination, children }) {
  const { page, pageCount } = pagination
  return (
    <Infinity
      dataLength={data.length}
      next={() => handlePagination({ selected: page })}
      hasMore={page < pageCount}
      // loader={Loader()}
      style={{ overflow: 'hidden', height: 'fit-content', marginBottom: 20 }}
      refreshFunction={() => handlePagination({ selected: 0 })}
    >
      {children}
    </Infinity>
  )
}
