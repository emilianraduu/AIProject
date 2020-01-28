import styled from 'styled-components'
import {secondaryTypeface} from '../../../styles/abstract/variables'

export const TimeTable = styled.div`
    display: flex;
    font-family: ${secondaryTypeface};
    width: 100%;
    flex-direction: column;
`
export const WeekNames = styled.div`
    display:flex;
    background: #D3D3D3;
    padding: 10px;
    border-radius: 5px;
    justify-content: space-between;
`
export const TimeInvterval = styled.div`
`
export const Day = styled.div`
display:flex;
flex: 1;
`
export const Interval = styled.div`
display: flex;
flex:1;
padding: 35px;
color: #f1f1f1;
background: green;
margin: 5px;
border-radius: 5px;
align-items: center;
justify-content: center;
${({busy}) => busy && 'background-color: red;'}
`
export const IntervalRow = styled.div`
display: flex;
width: 100%;
justify-content: space-between;

`

export const Space = styled.div`
    padding: 25px 50px;
`

export const Box = styled.div`
display:flex;
flex: 1;
position: relative;
height: 90px;
align-items: center;
justify-content: center;
${({color}) => color && `background-color: ${color};border: 1px solid black;border-color: #C0C0C0;font-size: 20px;`}
`
export const OverlapBox = styled.div`
position: absolute;
height: 50px;
z-index: 100;
width: 200px;
left: 10px;
top:50px;
align-items: center;
justify-content: center;
border: 1px solid black;
border-color: Black;
font-size: 20px;
background-color:#FE6F5E;
`
