import React, { useEffect, useState } from 'react'
import {
  BoxContent,
  BoxHeader,
  BoxHeaderLeft,
  BoxWrapper,
  HeaderWithIcon
} from '../../Global/Box/styles/box'
import {
  BigPGreyBold,
  Label,
  ProfileImage
} from '../../../styles/typography/typography'
import { SecondaryButtonDiv } from '../../../styles/shared/button'
import { FormItem } from '../../../styles/shared/form'
import Resizer from 'react-image-file-resizer'
import { USER_ICON } from '../../../styles/abstract/variables'
import Camera from 'react-html5-camera-photo'
import 'react-html5-camera-photo/build/css/index.css'

export default function TournamentPlayerProfilePhoto (
  {
    web,
    bottomMargin,
    onPhotoSubmit,
    profileImage,
    userId
  }) {
  const dataURLtoFile = (dataurl, filename) => {
    var arr = dataurl.split(',')
    var mime = arr[0].match(/:(.*?);/)[1]
    var bstr = atob(arr[1])
    var n = bstr.length
    var u8arr = new Uint8Array(n)
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n)
    }
    return new File([u8arr], filename, { type: mime })
  }

  const [photo, setPhoto] = useState()
  const [isCameraEnable, setCameraEnable] = useState(false)

  const onImageUpload = data => {
    onPhotoSubmit({ userId, data: dataURLtoFile(data, 'file') })
    setPhoto(data)
  }
  useEffect(() => {
    setCameraEnable(true)
    profileImage && profileImage.url && setPhoto(profileImage.url)
    return undefined
  }, [profileImage])

  return (
    <BoxWrapper web={web} bottomMargin={bottomMargin}>
      <BoxHeader spaceBetween>
        <BoxHeaderLeft>
          <HeaderWithIcon flex>
            <i className={USER_ICON} />
            <BigPGreyBold>Player photo</BigPGreyBold>
          </HeaderWithIcon>
        </BoxHeaderLeft>
      </BoxHeader>
      <BoxContent>
        <FormItem image>
          {photo ? (
            <div>
              <img
                src={photo}
                style={{
                  width: '250px',
                  marginBottom: 15,
                  alignSelf: 'center'
                }}
              />
              <SecondaryButtonDiv onClick={() => {
                setCameraEnable(true)
                setPhoto()
              }}
              >
                  Take another photo
              </SecondaryButtonDiv>
            </div>
          )
            : isCameraEnable &&
              <Camera
                style={{ width: '250px' }}
                sizeFactor={0.6}
                onTakePhoto={dataUri => {
                  onImageUpload(dataUri)
                }}
              />}
        </FormItem>
      </BoxContent>
    </BoxWrapper>
  )
}
