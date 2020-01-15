import React, {useContext, useState} from 'react'
import {Link, withRouter} from 'react-router-dom'
import {BrowserView, isMobile} from 'react-device-detect'
import {PageContent, WrapperAuth} from "../../styles/shared/wrapper";
import {Logo} from "../../styles/shared/logo";
import {PageTitle} from "../Global/Header/HeaderTopMob";
import {LabelAuth} from "../../styles/typography/typography";
import {AvatarAuth} from "../../styles/shared/avatar";
import {AT_ICON, KEY_SKELETON_ICON_ALT, USER_ICON} from "../../styles/abstract/variables";
import {LoginForm} from "../../styles/shared/form";
import {Input, InputWithIcon, InputWrapper, LoginError} from "../../styles/shared/input";
import {PrimaryButton} from "../../styles/shared/button";
import {ForgotPass, LinksWrapper, NewPlayer} from "../../styles/shared/links";
import {AuthContext} from "./AuthContext";
import {login} from "./AuthActions";

function LoginView({history}) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [focus, setFocus] = useState('')
    const authContext = useContext(AuthContext)
    const onSubmit = async (e) => {
        e.preventDefault()
        login(authContext, email, password, history)
    }
    const {errorLogin} = authContext.state
    return (
        <>
            <BrowserView>
                <PageContent type={'web'}>

                    <WrapperAuth>
                        <Logo web>
                            <Link to='./'>{PageTitle}</Link>
                        </Logo>
                        <LabelAuth center>Login</LabelAuth>
                        <AvatarAuth><i className={USER_ICON}/></AvatarAuth>
                        <LoginForm type={'web'} onSubmit={onSubmit}>
                            <InputWrapper web={!isMobile}>
                                <LabelAuth>EMAIL</LabelAuth>
                                <InputWithIcon focus={focus === 'email' && true}>
                                    <Input
                                        value={email}
                                        placeholder='email'
                                        onChange={(e) => setEmail(e.target.value)}
                                        onFocus={() => {
                                            setFocus('email')
                                        }} onBlur={(e) => {
                                        setFocus('none')
                                    }}
                                        login
                                    />
                                    <i className={AT_ICON}/>
                                </InputWithIcon>
                            </InputWrapper>
                            <InputWrapper web={!isMobile}>
                                <LabelAuth>PASSWORD</LabelAuth>
                                <InputWithIcon focus={focus === 'password' && true}>
                                    <Input
                                        value={password}
                                        placeholder='password'
                                        type='password'
                                        onFocus={() => {
                                            setFocus('password')
                                        }}
                                        onBlur={(e) => {
                                            setFocus('none')
                                        }}
                                        onChange={(e) => setPassword(e.target.value)}
                                        login
                                    />
                                    <i className={KEY_SKELETON_ICON_ALT}/>
                                </InputWithIcon>
                            </InputWrapper>

                            <InputWrapper web={!isMobile}>
                                {
                                    errorLogin && <LoginError>Invalid credentials</LoginError>
                                }
                                <PrimaryButton top type='submit'>Login</PrimaryButton>
                            </InputWrapper>
                            <LinksWrapper>
                                <Link to='./'> <ForgotPass>Forgot password?</ForgotPass> </Link>
                                <Link to='./register'> <NewPlayer><b>Register.</b></NewPlayer> </Link>
                            </LinksWrapper>
                        </LoginForm>

                    </WrapperAuth>
                </PageContent>
            </BrowserView>
        </>
    )
}

export default withRouter(LoginView)