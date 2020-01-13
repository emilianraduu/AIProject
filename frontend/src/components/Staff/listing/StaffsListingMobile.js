import React from 'react'
import { PageContent } from '../../../styles/shared/wrapper'
import InfiniteScroll, { Loader } from '../../Global/InfiniteScroll'
import StaffsBox from '../StaffsBox'
import { Link } from 'react-router-dom'
import { SecondaryButton } from '../../../styles/shared/button'
import EmptyData from '../../Global/EmptyData/EmptyData'

export default function StaffsListingMobile({ staffs, pagination, handlePagination, loading }) {
  return (
    <PageContent>
      <InfiniteScroll data={staffs} pagination={pagination} handlePagination={handlePagination}>
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 10 }}>
          <Link to={`/staff/create`}>
            <SecondaryButton mobile>Add
              staff</SecondaryButton>
          </Link>
        </div>
        {
          staffs.length !== 0 &&
          staffs.map((staff, index) => {
            return (
              <StaffsBox staff={staff} key={index}/>
            )
          })
        }
        {
          loading && <Loader/>
        }
      </InfiniteScroll>
      {
        !loading && staffs.length === 0 &&
        <EmptyData data={'No staff yet'}/>
      }
    </PageContent>
  )
}
