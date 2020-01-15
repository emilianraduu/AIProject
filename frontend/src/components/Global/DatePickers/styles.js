import styled from 'styled-components'
import {
  radiusX0,
  secondaryTypeface,
  colorWhite02,
  colorBlack60,
  spacingO1,
  colorFail80,
  spacingO3,
  colorPrimary,
  radiusX3,
  boxShadow,
  colorBlack12, colorWhite
} from '../../../styles/abstract/variables'

export const DatePickerWrapper = styled.div`
  display:flex;
  ${({ end }) => end && `align-self:flex-end;`}

  & .react-datepicker-wrapper {
    width:100%;
    
    display:flex;
    & .react-datepicker__input-container
    {
      display:flex;
      width: 100%;
      & input{
        width: 100%;
        border-radius: ${radiusX0};
        appearance: none;
        border: none;
        padding: ${spacingO1} ${spacingO3};
        font-family: ${secondaryTypeface};
        font-size: 16px;
        background: ${colorWhite};
        color: ${colorBlack60};
        outline: none;
        &:disabled {
          background: hsl(0,0%,95%);
        }
        box-sizing:border-box;
        width:100%;
        height: 41px;
        ${({ web }) => web && `height:30px;`}
        border: 1px solid ${colorBlack12};
        ${({ error }) => error && `border-bottom:1px solid ${colorFail80};`}
        &:focus {
          outline: none;
          ${({ error }) => error && `border-bottom:1px solid ${colorFail80};`}
        }
        &:hover{
          border: 1px solid ${colorBlack12};
          ${({ error }) => error && `border-bottom:1px solid ${colorFail80};`}
        }
        
        ${({ filter }) => filter && `
        
        border:none;
        &:hover { 
          border : none;
        }
        &:focus{
          border:none;
        }
         `}
      }
    }
  }

  & .react-datepicker{
    display:flex;
    width: 100%;
  }
  ${({ filter }) => filter && `width:100%;`}
`
export const DatePickerCustomStyle = styled.div`
  
  margin-top:70px;
  margin-left:25px;
  .react-datepicker-popper {
    z-index:4;
    ${({ rightAlignment }) => rightAlignment && ` left: initial !important; right: 0;`}
  }
  .react-datepicker{
    font-family : ${secondaryTypeface};
    border-radius: ${radiusX3};
    box-shadow: ${boxShadow};
    border:0px;
    padding:20px;
  }
  .react-datepicker__header{
    background : white;
    border: 0px;
  }
  
  .react-datepicker__navigation  {
      border: solid ${colorPrimary};
      border-width: 0 2px 2px 0;
      display: inline-block;
      padding: 2px;
      top: 33px;
      height: 8px;
      width: 8px;
      outline:none;
      display:none;
    }
    .react-datepicker__header__dropdown{
      font-weight:bold;
    }
  .react-datepicker__navigation--previous {
      transform: rotate(135deg);
      left: 28px;
   }
  .react-datepicker__navigation--next {
    transform: rotate(-45deg);
    right: 28px;
  }
  .react-datepicker__day-names{
    margin-top:15px;
    font-weight: bold;
  }
  .react-datepicker__day{
    border-radius : 3.3rem;
    
  }
  .react-datepicker__day:hover{
    border-radius : 3.3rem;
    background-color : ${colorPrimary};
    color:white;
  }
  
  .react-datepicker__day--in-range{
    border-radius : 3.3rem;
    background : ${colorPrimary};
  }
  .react-datepicker__day--selected{
    border-radius : 3.3rem;
    background : ${colorPrimary};
  }
  .react-datepicker__time-container {
    border:none;
  }
  
  .react-datepicker__year-read-view {
    margin-top: 7px;
    span {
      top:2px;
    }
    .react-datepicker__year-read-view--down-arrow {
      border: solid ${colorPrimary};
      border-width: 0 2px 2px 0;
      display: inline-block;
      padding: 1px;
      top: 33px;
      height: 4px;
      width: 4px;
      outline:none;
      transform: rotate(45deg);
      position: inherit;
      :before {
        border: none;
      }
    }
    }
    .react-datepicker__year-dropdown, .react-datepicker__month-dropdown, .react-datepicker__month-year-dropdown{
       width: 41%;
       left: 28%;
       top: 41px;
       background-color:${colorWhite};
       box-shadow:${boxShadow};
       border:none;
    }
    .react-datepicker__navigation--years-upcoming{
      transform: rotate(-135deg);
      top:0;
      outline:none;
    }
    .react-datepicker__navigation--years-previous{
      transform: rotate(45deg);
      top:0;
      outline:none;
    }
    .react-datepicker__year-option--selected{
      color:${colorPrimary};
    }
    .react-datepicker__year-option--selected:hover {
      color:${colorWhite};
    }
    .react-datepicker__year-option: hover {
      background-color:${colorPrimary};
      color:${colorWhite};
    }
    .react-datepicker__month-read-view{
      margin-top: 7px;
      span {
        top:2px;
      }
      .react-datepicker__month-read-view--down-arrow{
        border: solid ${colorPrimary};
        border-width: 0 2px 2px 0;
        display: inline-block;
        padding: 1px;
        top: 33px;
        height: 4px;
        width: 4px;
        outline:none;
        transform: rotate(45deg);
        position: inherit;
        :before {
          border: none;
        }
      }
    }
    .react-datepicker__month-dropdown {
      width: 41%;
       left: 28%;
       top: 41px;
       background-color:${colorWhite};
       box-shadow:${boxShadow};
       border:none;
    }
    .react-datepicker__month-option--selected{
       color:${colorPrimary};
       :hover {
       color:${colorWhite};
       }
    }
    
    .react-datepicker__month-option: hover {
      background-color:${colorPrimary};
      color:${colorWhite};
    }
  ${({ addTournament }) => addTournament && `
    margin:0;
    width:100%;
    .react-datepicker-popper {
      max-width: 360px;
      z-index:4;
    }
    .react-datepicker__navigation--previous {
      left: 37px;
   }
    .react-datepicker__navigation--next--with-time:not(.react-datepicker__navigation--next--with-today-button) {
      right: 116px;
   }
   .react-datepicker-popper[data-placement^="bottom"] .react-datepicker__triangle::before {
     border-bottom-color: white;
    }
    .react-datepicker-popper[data-placement^="bottom"] .react-datepicker__triangle {
      border-bottom-color: white;
    }
   `}
   .react-datepicker__time-container .react-datepicker__time .react-datepicker__time-box {
      width:95px;
   }
   .react-datepicker__current-month{
    display:none;
   }
   
   ${({ addStaff }) => addStaff && `
    margin:0; 
    width:100%;
    .react-datepicker{
      padding:10px;
    }
    .react-datepicker__current-month{
      margin-top:12px;
    }
    .react-datepicker-popper[data-placement^="bottom"] .react-datepicker__triangle::before {
      border-bottom-color: white;
    }
    .react-datepicker-popper[data-placement^="bottom"] .react-datepicker__triangle {
      border-bottom-color: white;
    }
   `}
   
    ${({ mobile }) => mobile && `
    .react-datepicker{
      padding:8px;
    }   
    .react-datepicker-popper{
      transform: translate3d(-9px, -250px, 0px) !important;
      max-width: 290px;
      z-index:4;
    }
    .react-datepicker__navigation--previous {
      top:20px;
      left:21px;
      outline:none;
   }
     .react-datepicker__navigation--next--with-time:not(.react-datepicker__navigation--next--with-today-button) {
      top:20px;
      right:87px;
      outline:none;
   }
    .react-datepicker__time-container .react-datepicker__time .react-datepicker__time-box {
        width:70px;
    }
    .react-datepicker__month{
      margin:0.2rem;
    }
    .react-datepicker__day-name, .react-datepicker__day, .react-datepicker__time-name {
      margin:0.05rem;
    }
   `}
   ${({ filtersMobile }) => filtersMobile && `
    margin:0; 
    width:100%;
    .react-datepicker__input-container {
      width:100%;
    }
    .react-datepicker__input-container input{
      border: none;
      height:40px;
    }
    .react-datepicker{	
      font-size: 0.8rem;
      width: 320px;
    }
     
    .react-datepicker__portal .react-datepicker__current-month, .react-datepicker__portal .react-datepicker-time__header {
      font-size: 1rem;
    }
    .react-datepicker__month{
      margin:0;
    }
    .react-datepicker__portal .react-datepicker__day-name, .react-datepicker__portal .react-datepicker__day, .react-datepicker__portal .react-datepicker__time-name {
      width:1.8rem;
    }
    
    .react-datepicker__time-container {
        font-size: 0.8rem;
    }
    .react-datepicker__time-container {
        width: 60px;
    }
    
    .react-datepicker__header--time {
        padding-left: 0px;
    }
    .react-datepicker__time-container .react-datepicker__time .react-datepicker__time-box {
        width: 59px;
    }
    .react-datepicker__portal .react-datepicker__navigation {
      border: solid ${colorPrimary};
      border-width: 0 2px 2px 0;
      display: inline-block;
      padding: 2px;
      top: 33px;
      height: 8px;
      width: 8px;
      outline:none;
      display:none;
    }
    .react-datepicker__portal .react-datepicker__navigation--next {
      right:74px;
    }
    .react-datepicker-popper[data-placement^="bottom"] .react-datepicker__triangle::before {
      border-bottom-color: white;
    }
    .react-datepicker-popper[data-placement^="bottom"] .react-datepicker__triangle {
      border-bottom-color: white;
    }
   `}
   & .react-datepicker-popper{
   
  }
   
`

export const TimePickerWrapper = styled.div`
    outline: none;
    height:45px;
    .react-datepicker-wrapper, .react-datepicker__input-container {
        height:100%;
        width:100%;
        input {
            border: 3px solid ${colorWhite02};
            font-family: ${secondaryTypeface};
            border-radius: ${radiusX0};
            font-size: 16px;
            color: ${colorBlack60};
            height:100%;
            width:100%;
            box-sizing:border-box;
        }
    }
`
