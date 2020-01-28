import React from 'react'
import Infinity from 'react-infinite-scroll-component'
import {LoaderWrapper} from '../../styles/shared/wrapper'
import LoaderImage from '../../assets/loader.svg'

export function Loader() {
    return (
        <LoaderWrapper>
            <img src={LoaderImage}/>
        </LoaderWrapper>
    )
}

export default function InfiniteScroll({data, pagination, handlePagination, children}) {
    const {page, pageCount} = pagination
    return (
        <Infinity
            dataLength={data.length}
            next={() => handlePagination({selected: page})}
            hasMore={page < pageCount}
            // loader={Loader()}
            style={{overflow: 'hidden', height: 'fit-content', marginBottom: 20}}
            refreshFunction={() => handlePagination({selected: 0})}
        >
            {children}
        </Infinity>
    )
}
