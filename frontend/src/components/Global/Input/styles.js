import styled from 'styled-components'
import { colorFail, colorPrimary80, colorPrimary, colorFail80, fontSizeNormal, fontSizeSmaller } from '../../../styles/abstract/variables'
export const FieldError = styled.div`
    color:${colorFail};
    font-size:12px;
    position: absolute;
    bottom: -12px;
    left:0;
`

export const UnderlineInput = styled.input`
    border:none;
    outline:none;
    height:35px;
    font-size:${fontSizeNormal};
    border-bottom:2px solid ${colorPrimary80};
    transition: border-bottom 0.2s ease-in;
    text-align:center;
    width:100%;
    &:focus{

        border-bottom:2px solid ${colorPrimary};
        ${({ error }) => error && `border-bottom: 2px solid ${colorFail};`}
    }
    ${({ error }) => error && `border-bottom: 2px solid ${colorFail80};`}
`
export const UnderlineInputIcon = styled.div`
    position: absolute;
    left: 5px;
    top: 10px;
`
export const UnderlineInputWrapper = styled.div`
    position: relative;
`
export const UnderlineInputError = styled.div`
    position:absolute;
    font-size:${fontSizeSmaller};
    bottom:-10px;
    left:0;
    z-index:1;
    color:${colorFail};
`
export const UnderlineInputSeparator = styled.div`
    height:40px;
    border-bottom:1px solid #ccc;
    margin:0 10px;
    flex:1;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: ${fontSizeNormal};
`
