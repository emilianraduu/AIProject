import React from 'react'
import Paginator from '../../Global/Paginator/Paginator'
import _ from 'lodash'
import Table from '../../Global/Table/Table'
import {PageWrapperLeft, PageContent} from '../../../styles/shared/wrapper'
import {TOURNAMENT_LISTING_HEADERS} from './RoomsListing'
import {withRouter} from 'react-router-dom'
import EmptyData from '../../Global/EmptyData/EmptyData'
import {Loader} from '../../Global/InfiniteScroll'
import moment from 'moment-timezone'
import {DATE_FORMAT, DATETIME_FORMAT} from "../../../config/constants";
function RoomsListingWeb({rooms, loading}) {
    return (
        <PageContent type='web' flex>
            <PageWrapperLeft tournamentListing>
                {
                    !rooms || rooms.length === 0 &&
                    <EmptyData data={'There aren\'t any rooms.'}/>
                }
                {
                    loading && <Loader/>
                }
            </PageWrapperLeft>
        </PageContent>
    )
}

export default withRouter(RoomsListingWeb)
