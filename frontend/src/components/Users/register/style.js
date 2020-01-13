import styled from 'styled-components'
import { colorDigital } from '../../../styles/abstract/variables'
export const ReceiptWrapper = styled.div`
padding:20px;
overflow: scroll;
div {
  margin-top:5px;
  margin-bottom:5px;
}

`
export const ReceiptSecondWrapper = styled.div`
.backgroundIcon {
  background-color:#000;
  color:white;
  padding: 5px 10px 5px 10px;
  font-weight:bold;
  margin-right:15px;
}
`

export const ReceiptFestivalName = styled.div``
export const ReceiptStartTime = styled.div``
export const ReceiptTable = styled.div``
export const ReceiptSeat = styled.div``
export const ReceiptChipsCount = styled.div``
export const ReceiptSeparator = styled.div``
export const Separator = styled.div`
  width:100%;
  height:3px;
  background-color:#000;
  margin-top:10px;
  margin-bottom:10px;
`
export const ProfilePhoto = styled.img`
  border: 0;
  margin: 0;
  background: ${colorDigital};
  display: flex;
  width: 100%;
  height: 220px;
  ${({ profilePhoto }) => profilePhoto && `background: url(${profilePhoto};`}
`

export const AlertWrapper = styled.div`
  height: 100vh;
  width: 100vw;
  position: fixed;
  left: 0;
  display: flex;
  flex-flow: column;
  justify-content: center;
  top: 0;
  z-index: 15;
  background:rgba(255, 255, 255, 0.9); 
  overflow: scroll;
`

export const AlertBox = styled.div`
   align-self: center;
   display: flex;
   flex-flow: column;
   position:relative;
   width: fit-content;
    padding: 30px;
    text-align: left;
    background: #fff;
    border-radius: 10px;
    box-shadow: 0 20px 75px rgba(0, 0, 0, 0.13);
`

export const Receipt = styled.div`
  border:1px solid black;
  padding:20px;
  margin-top:20px;
  margin-bottom:20px;
`
