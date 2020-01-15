import React from 'react'
import {
  PanelTop,
  PanelWrapper,
  PanelOrder,
  PanelElement,
  PanelHeader,
  PanelClose,
  PanelHead
} from './styles/filterMob'
import { withRouter } from 'react-router-dom'
import { SORT_AMOUNT_DOWN_ICON, TIMES_ICON } from '../../../styles/abstract/variables'

function OrderPanel ({ expanded, left, direction, orderBy, fields = [], handleSort, onClose }) {
    return (
      <>
        <PanelWrapper expanded={expanded} left={left}>
          <PanelHeader>
            <PanelHead>
              <i className={SORT_AMOUNT_DOWN_ICON}/>
              <span>Sort</span>
            </PanelHead>
            <PanelClose onClick={onClose}>
              <i className={TIMES_ICON}/>
            </PanelClose>
          </PanelHeader>
          <PanelTop>
            <PanelOrder active={direction === 'ASC'}>
              <label htmlFor={'ASC'}>ASC</label>
              <input
                id={'ASC'}
                type={'radio'}
                name={'ASC'}
                checked={direction === 'ASC' ? 'checked' : ''}
                onChange={() => handleSort([orderBy, 'ASC'])}
              />
            </PanelOrder>
            <PanelOrder active={direction === 'DESC'}>
              <label htmlFor={'DESC'}>DESC</label>
              <input
                id={'DESC'}
                type={'radio'}
                name={'DESC'}
                checked={direction === 'DESC' ? 'checked' : ''}
                onChange={() => handleSort([orderBy, 'DESC'])}
              />
            </PanelOrder>
          </PanelTop>
          {
            fields.map((field, index) => {
              return field.sortable && (
                <PanelElement key={index} active={field.dbName === orderBy}
                              onClick={() => handleSort([field.dbName, direction])}>
                  <>{field.name}</>
                </PanelElement>
              )
            })
          }
        </PanelWrapper>
      </>
    )
}

export default withRouter(OrderPanel)