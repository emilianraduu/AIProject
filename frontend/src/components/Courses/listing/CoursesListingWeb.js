import React from 'react'
import Paginator from '../../Global/Paginator/Paginator'
import _ from 'lodash'
import Table from '../../Global/Table/Table'
import {PageWrapperLeft, PageContent} from '../../../styles/shared/wrapper'
import {TOURNAMENT_LISTING_HEADERS} from './CoursesListing'
import {withRouter} from 'react-router-dom'
import EmptyData from '../../Global/EmptyData/EmptyData'
import {Loader} from '../../Global/InfiniteScroll'
import moment from 'moment-timezone'
import {DATE_FORMAT, DATETIME_FORMAT} from "../../../config/constants";
function CoursesListingWeb({courses, pagination, handlePagination, direction, orderBy, handleSort, loading}) {
    const countFestivals = 0
    const widthPercents = ['15', '15', '15', '15', '15', '15', '15']
    const data = []
    return (
        <PageContent type='web' flex>
            <PageWrapperLeft tournamentListing>
                {
                    courses && courses.length !== 0 && (
                        <>{
                            _.map(courses, (course) => {
                                const row = {
                                    name: course.name && course.name,
                                    description: course.description,
                                    available_from: course && moment(course.available_from).format(DATE_FORMAT),
                                    available_to: course && moment(course.available_to).format(DATE_FORMAT),
                                    duration: course.duration,
                                    no_courses: course && course.no_courses,
                                    no_seminars: course&&course.no_seminars,
                                    link: `/courses/${course.id_class}`
                                }
                                data.push(row)
                            })
                        }
                            <Table
                                headers={TOURNAMENT_LISTING_HEADERS}
                                data={data}
                                noHeader={countFestivals > 1}
                                widthPercents={widthPercents}
                                direction={direction}
                                orderBy={orderBy}
                                handleSort={handleSort}
                            />
                            {
                                pagination.pageCount > 1 &&
                                <Paginator pagination={pagination} handlePagination={handlePagination}/>
                            }
                        </>)
                }
                {
                    courses && courses.length === 0 &&
                    <EmptyData data={'There aren\'t any results.'}/>
                }
                {
                    loading && <Loader/>
                }
            </PageWrapperLeft>
        </PageContent>
    )
}

export default withRouter(CoursesListingWeb)
