import React from 'react'
import { PageContent } from '../../../../styles/shared/wrapper'
import InfiniteScroll, { Loader } from '../../../Global/InfiniteScroll'
import TournamentNotificationsBox from './TournamentNotificationsBox'
import EmptyData from '../../../Global/EmptyData/EmptyData'
import {Link} from 'react-router-dom'
import { SecondaryButton } from '../../../../styles/shared/button'

export default function TournamentNotificationsListingMobile({ notifications, pagination, handlePagination, loading, tournament }) {
  return (<InfiniteScroll data={notifications} pagination={pagination} handlePagination={handlePagination}>
      <PageContent>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 10 }}>
          <Link to={`/tournaments/${tournament.id}/notifications/create`}>
            <SecondaryButton mobile>Add
              Notificatiion</SecondaryButton>
          </Link>
        </div>
          {
            notifications.length !== 0 &&
            notifications.map((notification, index) => {
              return (
                <TournamentNotificationsBox
                  notification={notification} key={index}
                />
              )
            })
          }
        {
          notifications.length === 0 && !loading && <EmptyData data={'No notifications at the moment'}/>
        }
        {
          loading && <Loader/>
        }
        
      </PageContent>
    </InfiniteScroll>
  )
}
