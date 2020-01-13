import React from 'react'
import {
  BoxContent, BoxExpand,
  BoxHeader,
  BoxHeaderLeft,
  BoxHeaderRight, BoxInfo,
  BoxLink,
  BoxWrapper, ContentText, ContentTextSmall,
  HeaderWithIcon, RoundedText
} from './styles/box'
import { BigPGreyBold, Overline, SmallPLink } from '../../../styles/typography/typography'
import _ from 'lodash'
import { NotificationWrapper, Tag, TagWrapper } from '../../../styles/shared/tag'
import { SecondaryButton, ButtonAction } from '../../../styles/shared/button'
import {
  colorBlack,
  colorDigital,
  colorFail,
  colorGreen,
  colorPrimary50,
  colorWarn
} from '../../../styles/abstract/variables'

export function renderSwitch({ prop = '', text, title, mobile, hidden, onChange, manualChange, isManualSitting }) {
  switch (prop) {
    case 'round':
      return (
        <>
          <Overline cap spaced>{title}</Overline>
          <ContentText><RoundedText>{text}</RoundedText></ContentText>
        </>
      )
    case 'status':
      return (
        <NotificationWrapper>
          {/* <Overline cap spaced>{title}</Overline> */}
          {/* <label style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ marginBottom: 10 }}>Make visible</span>
                <Switch onChange={onChange} checked={text !== 'hidden'} />
              </label> */}
          <div style={{ marginBottom: 20 }}>
            <Overline cap spaced>Status</Overline>
            <TagWrapper color={text}>

              <Tag status={text} space>
                {text}
              </Tag>
            </TagWrapper>
          </div>
          {text === 'hidden' && <ButtonAction onClick={() => onChange('announced')}>Show to users</ButtonAction>}
          {text === 'paused' && <>
            <ButtonAction onClick={() => onChange('live')} color={colorGreen}>Unpause tournament</ButtonAction>
            {
              isManualSitting ?
                <ButtonAction onClick={manualChange} color={colorBlack}>Turn off manual seating</ButtonAction>
                :
                <ButtonAction onClick={manualChange} color={colorDigital}>Turn on manual seating</ButtonAction>
            }
            <ButtonAction onClick={() => onChange('closed')} color={colorFail}>Close tournament</ButtonAction>

          </>}
          {text === 'announced' &&
          <>
            <ButtonAction onClick={() => onChange('live')} color={colorGreen}>Start tournament</ButtonAction>
            {
              isManualSitting ?
                <ButtonAction onClick={manualChange} color={colorBlack}>Turn off manual seating</ButtonAction>
                :
                <ButtonAction onClick={manualChange} color={colorDigital}>Turn on manual seating</ButtonAction>
            }
          </>}
          {
            text === 'live' &&
            <>
              <ButtonAction onClick={() => onChange('paused')} color={colorWarn}>Pause tournament</ButtonAction>
              {
                isManualSitting ?
                  <ButtonAction onClick={manualChange} color={colorBlack}>Turn off manual seating</ButtonAction>
                  :
                  <ButtonAction onClick={manualChange} color={colorDigital}>Turn on manual seating</ButtonAction>
              }
              <ButtonAction onClick={() => onChange('closed')} color={colorFail}>Close tournament</ButtonAction>

            </>
          }
          {/* <TagWrapper color={text}> */}

          {/* <Tag status={text} space>
                  {text}
                </Tag> */}
          {/* </TagWrapper> */}
          {/* <TagWrapper active={text === 'live' ? 'active' : 'non-active'} color={'live'}> */}
          {/*  <Tag status={'live'} space> */}
          {/*    Live */}
          {/*  </Tag> */}
          {/* </TagWrapper> */}
          {/* <TagWrapper active={text === 'closed' ? 'active' : 'non-active'} color={'closed'}> */}
          {/*  <Tag status={'closed'} space> */}
          {/*    closed */}
          {/*  </Tag> */}
          {/* </TagWrapper> */}
        </NotificationWrapper>
      )
    case 'other':
      return (
        <>

          <BoxExpand expanded>
            <Overline cap spaced>{title}</Overline>
            <ContentText>{text}</ContentText>
          </BoxExpand>
        </>
      )
    case 'notify-button':
      return (
        <>
          <div style={{ display: 'flex' }}>
            <ContentTextSmall right>{text}</ContentTextSmall>
          </div>
          <SecondaryButton full>{title}</SecondaryButton>
        </>
      )
    default:
      return (
        <>
          <Overline cap spaced>{title}</Overline>
          <ContentText>{text}</ContentText>
        </>
      )
  }
}

export default function InfoBox({ header, infos, web, mobile, openEditModal, type, bottomMargin, sticky, makeTournamentVisible, manualChange, isManualSitting, children, noEdit }) {
  if (header.id === 'tournamentDetails') {
    return (
      <BoxWrapper web={web}>
        <BoxHeader spaceBetween>
          <BoxHeaderLeft>
            <HeaderWithIcon flex>
              {
                header && (
                  <>
                    <i className={header.icon}/>
                    <BigPGreyBold>{header.title}</BigPGreyBold>
                  </>)
              }

            </HeaderWithIcon>
          </BoxHeaderLeft>
          <BoxHeaderRight>
            <BoxLink
              center onClick={() => {
              openEditModal({ value: type, icon: header.icon, title: header.title })
            }}
            >
              {/* <SmallPLink>EDIT</SmallPLink> */}
            </BoxLink>

          </BoxHeaderRight>
        </BoxHeader>
        <BoxContent>
          {
            infos &&
            <div>
              {
                <SecondaryButton
                  filled onClick={() => {
                  openEditModal({ value: type, icon: header.icon, title: header.title })
                }} tournament
                >Import
                </SecondaryButton>
              }
            </div>
          }

        </BoxContent>
      </BoxWrapper>
    )
  }
  return (
    <>
      <BoxWrapper web={web} bottomMargin={bottomMargin} sticky={sticky}>
        <BoxHeader spaceBetween>
          <BoxHeaderLeft>
            <HeaderWithIcon flex>
              {
                header && <>
                  <i className={header.icon}/>
                  <BigPGreyBold>{header.title}</BigPGreyBold>
                </>
              }

            </HeaderWithIcon>
          </BoxHeaderLeft>
          <BoxHeaderRight>
            {
              !noEdit &&
              <BoxLink
                center onClick={() => {
                openEditModal({ value: type, icon: header.icon, title: header.title })
              }}
              >
              <SmallPLink>EDIT</SmallPLink>
            </BoxLink>
            }
          </BoxHeaderRight>
        </BoxHeader>
        <BoxContent>
          {
            infos &&
            <div>
              {
                _.map(infos, (info, index) => {
                  return (
                    <BoxInfo key={index}>
                      <>
                        {
                          renderSwitch({
                            prop: info.prop,
                            text: info.text,
                            title: info.title,
                            hidden: info.hidden,
                            mobile,
                            manualChange, isManualSitting,
                            onChange: makeTournamentVisible
                          })
                        }
                      </>
                    </BoxInfo>
                  )
                })
              }
            </div>
          }
          {
            children
          }
        </BoxContent>
      </BoxWrapper>
    </>
  )
}
