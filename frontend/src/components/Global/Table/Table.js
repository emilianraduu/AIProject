import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import {
  TableWrapper,
  TableHeader,
  TableRow,
  TableCell,
  TableFilter,
  TableSubHeader,
  EditWrapper
} from './styles/table'
import _ from 'lodash'
import { Tag, TagWrapper } from '../../../styles/shared/tag'
import { Overline } from '../../../styles/typography/typography'
import { ContentText, FlexContainer } from '../Box/styles/box'
import Flag from 'react-world-flags'
import { AvatarSmall } from '../../../styles/shared/avatar'
import { ARROW_DOWN_ICON, ARROW_UP_ICON, colorFail } from '../../../styles/abstract/variables'
import { PrimaryButton, SecondaryButton } from '../../../styles/shared/button'

export function renderSwitch ({ row, prop = '', text, title, mobile, dbName, buttons, id, history }) {
  switch (prop) {
    case 'fee':
      return (
        <>
          <Overline cap>{title}</Overline>
          <ContentText>{text}</ContentText>
        </>
      )
    case 'id photo':
      return (
        <>
          <Overline cap style={{ color: !row.hasId ? colorFail : 'black', fontWeight: row.hasId ? 'normal' : 'bold' }}>{row.hasId ? 'Uploaded' : 'No id uploaded'}</Overline>
          <ContentText>{text}</ContentText>
        </>
      )
    case 'prizes':
      return (
        <>
          <Overline cap>{title}</Overline>
          <ContentText>{text}</ContentText>
        </>
      )
    case 'wins':
      return (
        <>
          <Overline cap>{title}</Overline>
          <ContentText>{text}</ContentText>
        </>
      )
    case 'buy-in':
      return (
        <>
          <Overline cap>{title}</Overline>
          <ContentText>{text}</ContentText>
        </>
      )
    case 'chips':
      return (
        <>
          <Overline cap>{title}</Overline>
          <ContentText>{text}</ContentText>
        </>
      )
    case 'name':
      if (['firstName', 'users_name'].includes(dbName)) {
        return (
          <>
            <FlexContainer>
              <AvatarSmall
                url={text.url}
              />
              <ContentText noBold>{text.text}</ContentText>
            </FlexContainer>
          </>
        )
      } else {
        return (
          <>
            <Overline cap>{title}</Overline>
            <ContentText noBold>{text}</ContentText>
          </>
        )
      }

    case 'game time':
      return (
        <>
          <Overline cap>{title}</Overline>
          <ContentText>{text}</ContentText>

        </>
      )
    case 'country':
      return (
        <FlexContainer>
          {text.flag &&
            (
              <>
                <Flag code={text.flagCode} />
                <ContentText noBold>
                  {text.flag}
                </ContentText>
              </>
            )}
        </FlexContainer>
      )

    case 'actions':
      return (
        <SecondaryButton onClick={() => { history.push(`/users/register/${id}`) }}>Register</SecondaryButton>
      )
    default:
      return (
        <>
          <Overline cap>{title}</Overline>
          <ContentText noBold>{text}</ContentText>
        </>
      )
  }
}

function Table ({ direction, orderBy, handleSort, subHeader, headers, widthPercents, noHeader, data, children, match, history }) {
  const handleSortClick = (header) => {
    if (header === orderBy) {
      if (direction === 'DESC') {
        handleSort([header, 'ASC'])
      } else {
        handleSort([header, 'DESC'])
      }
    } else {
      handleSort([header, 'DESC'])
    }
  }
  return (
    <TableWrapper>
      <TableHeader hide={noHeader}>
        {
          _.map(headers, (header, index) => {
            return (
              !header.hidden &&
                <TableCell
                  key={index}
                  header
                  widthBasis={widthPercents[index]}
                >
                  <TableFilter
                    sortable={header.sortable}
                    onClick={() => header.sortable && handleSortClick(header.dbName)}
                    active={orderBy === header.dbName}
                  >
                    {header.name}
                    {orderBy === header.dbName &&
                      <i className={direction === 'DESC' ? ARROW_DOWN_ICON : ARROW_UP_ICON} />}
                  </TableFilter>
                </TableCell>
            )
          })
        }
      </TableHeader>
      {subHeader &&
        <TableSubHeader>
          {subHeader}
        </TableSubHeader>}
      {
        _.map(data, (row, index) => {
          return (
            <div key={index} style={{ position: 'relative' }}>
              <WithLink to={row.link}>
                <TableRow key={index}>
                  {_.map(headers, (header, index) => {
                    return (

                      <TableCell
                        key={index}
                        widthBasis={widthPercents[index]}
                      >
                        {
                          // header.name === 'status' ? <TagWrapper><Tag space desktop status={row[header.name]}>{row[header.name]}</Tag></TagWrapper>:row[header.name]
                          renderSwitch({
                            history: history,
                            row,
                            id: row.id,
                            prop: header.name,
                            dbName: header.dbName,
                            text: row[header.name]
                          })
                        }
                      </TableCell>
                    )
                  })}
                </TableRow>
              </WithLink>
              {
                children
              }
            </div>
          )
        })
      }
    </TableWrapper>
  )
}
export default withRouter(Table)
const WithLink = ({ children, to, key }) => {
  if (to) {
    return <Link to={to}>{children}</Link>
  } else {
    return <div >{children}</div>
  }
}
