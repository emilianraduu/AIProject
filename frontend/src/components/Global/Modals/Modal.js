import React from 'react'
import { isMobile } from 'react-device-detect'
import { PanelWrapper, PanelHeader, PanelHead, PanelContent, PanelClose } from '../Filter/styles/filterMob'
import { Overlay } from '../Trail/styles/trailMob'
import { TIMES_ICON } from '../../../styles/abstract/variables'

export default function Modal({ visible, title, icon, children, onClose, noHeaderBorder }) {
  return (
    <>
      <Overlay expanded={visible} onClick={() => onClose()} />
      <PanelWrapper web={!isMobile} right visible={!!visible}>
        <PanelHeader noBorder={noHeaderBorder}>
          <PanelHead>
            <i className={icon} />
            <span>{title}</span>
          </PanelHead>
          <PanelClose onClick={onClose}>
            <i className={TIMES_ICON} />
          </PanelClose>
        </PanelHeader>
        <PanelContent style={{ padding: noHeaderBorder ? 0 : 10 }} mobile={isMobile}>
          {children}
        </PanelContent>
      </PanelWrapper>
    </>
  )
}
