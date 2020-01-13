import styled from 'styled-components'
import {
  boxShadow,
  colorBlack80,
  fontSizeMedium,
  fontSizeNormal,
  radiusX1,
  spacingO3,
  spacingX0,
  spacingX2
} from '../../../styles/abstract/variables'
export const MobileChartContainer = styled.div`
  display:flex;
  flex-direction:column;
  box-shadow: ${boxShadow};
  border-radius:${radiusX1};
  width:calc(100vw - 32px);
  height: 400px;
  justify-content:center;
  font-size:${fontSizeNormal};
  &:nth-child(n+2){
    margin-top: ${spacingO3};
  }

`

export const WebChartTitle = styled.p`
  margin-top:8%;
  margin-bottom:3%;
  color:${colorBlack80};
  text-align:center;
  font-size: ${fontSizeMedium};
  font-weight:20px;
`
export const WebChartContainer = styled.div`
  display: flex;
  flex-direction:column;
  box-shadow: ${boxShadow};
  border-radius:${radiusX1};
  margin: ${spacingO3};
  height:410px;
  width:350px;
  justify-content:center;
  
  ${({table}) => table && `
    box-shadow:none;
    border:none;
    height:350px;
    width:290px;
    
    margin: ${spacingX0};
  `}
  ${({big})=> big && `width: 500px;`
  }
  
`
export const MobileChartTitle = styled.p`
  margin-top:5%;
  margin-bottom:3%;
  color:${colorBlack80};
  text-align:center;
  font-size: ${fontSizeMedium};
  font-weight:20px;
`

export const PlayerStatisticsContainer = styled.div`
  display:flex;
  width: 100%;
  justify-content: space-between;
  
  ${({mobile}) => mobile && `flex-direction:column;`}
`
export const BuyInValue = styled.a`
  font-size: ${fontSizeNormal};
  font-weight: bold;
`

export const EmptyDataWrapper = styled.div `
  display:flex;
  flex-direction:column;
  align-items: center;
  ${({table}) => table && `position:relative;`}
  ${({middle}) => middle &&  `width:100%;`}
  ${({tournament}) => tournament && `width:100%;`}
`
export const EmptyDataImage = styled.div`
 img {
  width:100%;
  height:100%;
 }

`
export const EmptyDataText = styled.div`
  padding-top:${spacingX2};
  padding-bottom:${spacingX2};
`