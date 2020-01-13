import React, { useCallback, useEffect } from 'react'
import {
  BoxContent,
  BoxHeader,
  BoxHeaderLeft,
  BoxWrapper,
  HeaderWithIcon
} from '../../Global/Box/styles/box'
import { BigPBold, BigPGreyBold } from '../../../styles/typography/typography'
import { SecondaryButtonDiv } from '../../../styles/shared/button'
import { FormItem } from '../../../styles/shared/form'
import {
  ATM_CARD_ICON,
  colorBlack12,
  radiusX2,
  colorFail
} from '../../../styles/abstract/variables'
// import 'react-html5-camera-photo/build/css/index.css'
import { AvatarBig } from '../../../styles/shared/avatar'
import { useDropzone } from 'react-dropzone'

export default function TournamentPlayerIDCard ({
  web,
  bottomMargin,
  onPhotoSubmit,
  identityImage,
  userId
}) {
  // const onImageUpload = e => {
  //   onPhotoSubmit({ userId, data: e.target.files[0] })
  // }
  useEffect(() => {
    document.onpaste = function (event) {
      var items = (event.clipboardData || event.originalEvent.clipboardData).items
      for (const index in items) {
        var item = items[index]
        if (item.kind === 'file') {
          // adds the file to your dropzone instance
        }
      }
    }
  }, [])
  const onDrop = useCallback(acceptedFiles => {
    onPhotoSubmit({ userId, data: acceptedFiles[0] })
  }, [])
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })
  return (
    <BoxWrapper id='myDropZone' web={web} bottomMargin={bottomMargin} {...getRootProps()}>
      <BoxHeader spaceBetween>
        <BoxHeaderLeft>
          <HeaderWithIcon flex>
            <i className={ATM_CARD_ICON} />
            <BigPGreyBold>Player ID</BigPGreyBold>
          </HeaderWithIcon>
        </BoxHeaderLeft>
      </BoxHeader>
      <BoxContent>
        <FormItem image fitContent>
          {identityImage && identityImage.mimeType === 'application/pdf' ? (
            <embed
              src={identityImage && identityImage.url}
              width='250'
              height='200'
              type='application/pdf'
            />
          ) : identityImage ? (
            <a href={identityImage && identityImage.url} target='_blank'>
              <img
                alt='identity image'
                src={identityImage.url}
                style={{
                  width: '250px',
                  marginBottom: 15,
                  alignSelf: 'center'
                }}
              />
            </a>
          ) : (
            <div style={{ height: 50, textAlign: 'center', color: colorFail, width: '100%' }}>
              <div>No ID photo uploaded</div>
              <div style={{ marginTop: 20 }}>Copy and paste a photo here</div>

            </div>
          )}
          <input
            type='file'
            name='profilePictureUpload'
            id='profilePictureUpload'
            {...getInputProps()}
          />

          {/* <LabelArrow htmlFor='profilePictureUpload'><i className={ARROW_UP_ICON}/> */}
          {/* </LabelArrow> */}
        </FormItem>
        {isDragActive && (
          <div
            style={{
              position: 'absolute',
              right: 0,
              top: 0,
              width: '100%',
              height: '100%',
              borderRadius: radiusX2,
              display: 'flex',
              background: colorBlack12,
              flexFlow: 'column',
              justifyContent: 'center'
            }}
          >
            <BigPBold drop>Drop the files here ...</BigPBold>
          </div>
        )}
      </BoxContent>
    </BoxWrapper>
  )
}
