import React from 'react'
import { BrowserView, MobileView } from 'react-device-detect'
import LoginView from './LoginView'

export default function Login() {
  return (
    <>
      <BrowserView>
        <LoginView type={'web'}/>
      </BrowserView>
      <MobileView>
        <LoginView type={'mobile'}/>
      </MobileView>
    </>
  )
}