import React from 'react'
import {
  BoxWrapper,
  ProfileBoxLeft,
  ProfileBoxRight, BoxContent
} from './styles/box'
import { AvatarBig } from '../../../styles/shared/avatar'
import Flag from 'react-world-flags'
import { BigPGreyBold, SmallP } from '../../../styles/typography/typography'
import { DATETIME_FORMAT } from '../../../config/constants'
import moment from 'moment-timezone'

export default function ProfileBox({ props, web }) {
  return (
    <>
      {
        props &&
        <BoxWrapper web={web}>
          <BoxContent flex>
            <ProfileBoxLeft>
              <AvatarBig url={props.picture}/>
            </ProfileBoxLeft>
            <ProfileBoxRight>
              <BigPGreyBold>{props.name}</BigPGreyBold>
              {
                props.header === "player" ?
                  <>
                  <SmallP space={props.flag && true}>
                    {
                      props.flag && <><Flag code={props.flagCode} height={10}
                      /> {props.flag}</>

                    }
                  </SmallP>
                  <SmallP>Hometown:{props.hometown ? props.hometown : 'unset'}</SmallP>
                </>
                  :
                  <>
                    <SmallP>
                      {props.role}
                    </SmallP>
                    <SmallP>Last Login:{props.lastLogin ? moment(props.lastLogin).format(DATETIME_FORMAT) : 'User never logged'}</SmallP>
                  </>
              }
            </ProfileBoxRight>
          </BoxContent>
        </BoxWrapper>
      }
    </>
  )
}