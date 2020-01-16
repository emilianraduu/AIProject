import styled from 'styled-components'
import {
  animationIn,
  boxShadow,
  colorBlack12, colorBlack60, colorPrimary,
  colorWhite, fontSizeNormal, fontSizeSmaller,
  radiusX0, radiusX2, secondaryTypeface, spacingO3, spacingO4, spacingX0,
  spacingX2, timeFast, spacingO1, spacingX1, colorBlack80, radiusX1
} from '../../../../styles/abstract/variables'

export const BoxWrapper = styled.div`
  background: ${colorWhite};
  box-shadow: ${boxShadow};
  border-radius: ${radiusX2};
  margin-bottom: 10px;
  margin-right: 10px;
  &:nth-child(n+2){
  }
  ${({ blackBox }) => blackBox && `
    background: ${colorBlack80};  
    padding: ${spacingO3};
    margin: ${spacingO4};
    border-radius: ${radiusX2};
    width:100%;
    margin-top:0;
  `}
  ${({ blackBoxMobile }) => blackBoxMobile && `
    background: ${colorBlack80};
    padding: ${spacingO3};
    border-radius: ${radiusX2};
  `}
  padding: 24px;
  ${({ web, full, large, bottomMargin, sticky }) => {
  let style = ''
  if (web) {
  style += `
      height: fit-content;
      min-width: 300px;
      width: 300px;
      // display: inline-block;
    
      border-radius: ${radiusX2};
      margin: 10px;
    
  `
 }
  if (large) style += 'width: 600px;'
  if (full) style += 'width: 100%'
  if (bottomMargin) style += 'margin-bottom: 50px;'
  if (sticky) { style += 'position:sticky; top:206px;' }
  return style
}
}
  
`
export const BoxExpand = styled.div`
   height: 0;
   padding: 0 ${spacingX2};
   overflow: hidden;
   border-top: 1px solid transparent;
   transition: all ${timeFast} ${animationIn};
   position: relative;
   &:after{
      content: '';
      position: absolute;
      width: 1px;
      height: 100%;
      background: ${colorBlack12};
      top: 0;
      left: 50%;
   }
   ${({ noMiddleBorder }) => noMiddleBorder && '&:after{display:none;}'}
  
   ${({ active, expanded }) => {
  if (active) {
 return `
    height: unset;
    border-top-color: ${colorBlack12};
    padding: ${spacingX2} 0;
    `
}
  if (expanded) {
return `
    height: unset;
    border-top-color: ${colorBlack12};
    padding: 0;
    padding-top: ${spacingX2};
  `
}
}}
`
export const BoxHeader = styled.div`
  display: flex;
  padding: ${spacingO1};
  padding-left:0px;
  margin-bottom:30px;
    ${(props) => {
  if (props.spaceBetween) {
    return 'justify-content: space-between;'
  }
}}
`

export const BoxContent = styled.div`
  // padding: ${spacingO1};
  padding-top: 0;
  ${({ flex }) => flex && `display:flex; padding-top: ${spacingX2}`}
  ${({ reports }) => reports && `display:flex; flex-direction:column; padding-top: ${spacingX2}`}
  ${({ blackBox }) => blackBox && `
    display:flex;
    flex-direction: column;
    padding-top: ${spacingX2};
    padding-left: ${spacingX2};
  `}
`

export const BoxInfo = styled.div`
  &:nth-child(n+2){
    margin-top: ${spacingO4};
  }
`

export const ContentText = styled.h5`
  font-size: ${fontSizeNormal};
  font-weight: bold;
  word-break: break-all;
  font-family: ${secondaryTypeface};
  ${({ noBold }) => noBold && 'font-weight:normal;'}
`
export const FlexContainer = styled.div`
  display:flex;
  & > * {
    align-self:center;
  }
   & img {
    border-radius: 100%;
    width: 16px;
    height: 16px;
    object-fit: cover;
   }
  h5 {
    padding-left:5px;
  }
`
export const ContentTextSmall = styled(ContentText)`
  font-size: ${fontSizeSmaller};
  font-weight: normal;
  display: flex;
  ${({ right }) => right && 'margin-right: 3px;'}
`

export const ContentTextSmallBold = styled(ContentTextSmall)`
  font-weight: bold;
`

export const RoundedText = styled.div`
  color: ${colorPrimary};
  padding: 4px;
  font-size: ${fontSizeSmaller};
  margin: ${spacingX0} 0;
  border-radius: 50%;
  border: 1px solid ${colorPrimary};
  display: flex;
  width: fit-content;
  justify-content: center;
`

export const BoxHeaderLeft = styled.div`
  display:flex;
  
`

export const BoxHeaderRight = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  align-self: flex-start;
  & > * {
    flex: 1;
  }
`

export const BoxLink = styled.div`
  ${({ center }) => center && `display: flex;
  flex-flow:column;
  justify-content: center;`
}
  & > a {
    color: ${colorPrimary}
    font-size: ${fontSizeSmaller};
    text-decoration: none;
  }
`

export const HeaderWithIcon = styled.div`
  align-self: center;
  margin-left: ${spacingX2};
  white-space: nowrap;
  ${({ flex }) => flex && `
    display:flex;
    justify-content: space-between;
    & * {
       align-self: center;
       color: ${colorBlack60};
     }
     margin-left: 0;`}
     
  ${({ title }) => title && 'margin-left: 0;'}`

export const BoxElement = styled.div`
  align-self: center;
  white-space: nowrap;
  width: 100%;
  & > * {
    display: flex;
  }
  padding: 0 ${spacingX2};
  ${({ flex }) => flex && 'flex-basis: 50%;'}
`
export const ProfileBoxLeft = styled.div`
  margin-right: ${spacingX2};
  display: flex;
  ${({ small }) => small && `margin-right:${spacingX0}`}
`
export const ProfileBoxRight = styled.div`
  display:flex;
  flex-direction:column;
  justify-content: center;
`

export const ReportsBoxHeader = styled.div`
  display:flex;
  justify-conent: space-arround;
`
export const ReportsBoxHeaderLeft = styled.div`
  margin-right: ${spacingX2};
`
export const ReportsBoxHeaderRight = styled.div`
  display:flex;
  flex-direction:column;
  padding-top: 8px;
`
export const ReportsBoxContentWrapper = styled.div`
  display:flex;
  flex-direction:column;
`
export const ReportsBoxContent = styled.div`
  display:flex;
  justify-content: space-between;
  padding:2px;
  ${({ cashFlow }) => cashFlow && `
    border-bottom: 1px solid ${colorBlack12};
    
  `}
`
export const BlackBoxHeader = styled.div`
  display: flex;
  color:white;
  p {
    color:white;
  }
  align-items: center;
  ${({ mobile }) => mobile && `
    flex-direction:column;
    align-items: flex-start;
    padding-bottom:${spacingX2};
  `}
`
export const BlackBoxHeaderItem = styled.div`
  padding-left:${spacingX1};
  display:flex;
`
export const BlackBoxContent = styled.div`
  padding: ${spacingO1};
  display:flex;
  padding-left: ${spacingX2};
  justify-content: space-between;
  width: 100%;
  ${({ mobile }) => mobile && `
    flex-direction:column;
    align-items:flex-start;
    padding:0;
  `}
`
export const BlackBoxContentDetails = styled.div`
  display:flex;
  flex-direction:column;
  padding-left: ${spacingX2};
    p {
    color:${colorWhite};
  }
  ${({ mobile }) => mobile && `
    flex-direction:row;
    align-items:center;
  `}
`
export const BlackBoxContentItem = styled.div`
  display:flex;
  
  ${({ mobile }) => mobile && `
    padding-bottom:${spacingX2};
  `}
`

export const BlackBoxAvatar = styled.div`
  width: 48px;
  height: 48px;
  background: linear-gradient(315deg, #279252, #41bf74);
  border-radius: 50%;
  transition: all 0.5s;
  box-shadow: ${boxShadow};
  ${({ mobile }) => mobile && `
    width:28px;
    height:28px;
  `}
`

export const BlackBoxAvatarImage = styled.div`
  width: 24px;
  height: 24px;
  background-repeat:no-repeat;
  margin:${spacingO3};
  ${({ mobile }) => mobile && `
    margin:${spacingX0};
    
  `}
`
