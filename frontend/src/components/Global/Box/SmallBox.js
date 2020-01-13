import React from 'react'
import {
  BoxWrapper,
  ProfileBoxLeft,
  ProfileBoxRight, BoxContent
} from './styles/box'
import { AvatarBig } from '../../../styles/shared/avatar'
import Flag from 'react-world-flags'
import { BigPGreyBold, SmallP } from '../../../styles/typography/typography'

export default function SmallBox ({ profile, web }) {
  return (
    <>
      {
        profile &&
        <BoxWrapper web={web}>
          <BoxContent flex>
            <ProfileBoxLeft>
              <AvatarBig />
            </ProfileBoxLeft>
            <ProfileBoxRight>
              <BigPGreyBold>{profile.name}</BigPGreyBold>
              <SmallP space={profile.flag && true}>
                {
                  profile.flag && <><Flag code={profile.flagCode} height={10}
                  /> {profile.flag}</>

                }
              </SmallP>
              <SmallP>Hometown:{profile.hometown ? profile.hometown : 'unset'}</SmallP>
            </ProfileBoxRight>
          </BoxContent>
        </BoxWrapper>
      }
    </>
  )
}
