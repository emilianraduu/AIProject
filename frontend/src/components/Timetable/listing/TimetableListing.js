import React, {useContext, useEffect} from 'react'
import {TimetableContext} from '../TimetableContext'
import {
  applyStaffsFilter,
  changeStaffsPage,
  changeStaffsSort,
  clearStaffsFilters,
  getStaffs,
  removeStaffsFilter
} from '../TimetableActions'
import {BrowserView} from 'react-device-detect'
import StaffsListingWeb from './StaffsListingWeb'
import {AuthContext} from '../../Auth/AuthContext'
import {DEBOUNCE_MS} from '../../../config/constants'

export const STAFFS_LISTING_HEADERS = [
    {
        name: 'name',
        dbName: 'users_name',
        sortable: true
    },
    {
        name: 'email',
        dbName: 'email',
        sortable: false
    },
    {
        name: 'role',
        dbName: 'role',
        sortable: false
    },
    {
        name: 'date',
        dbName: 'users.createdAt',
        sortable: true
    }
];
export const STAFFS_FILTER_HEADERS = [];
export default function StaffsListing() {

    return (
        <>
            <BrowserView>
                <StaffsListingWeb
                />
            </BrowserView>
        </>
    )
}