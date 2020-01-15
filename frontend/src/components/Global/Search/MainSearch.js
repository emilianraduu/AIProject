import React, {useState} from 'react'
import { MainSearchWrapper, MainSearchInput, MainSearchIcon } from "../../../styles/shared/search";
import { SEARCH_ICON } from '../../../styles/abstract/variables'

export default function MainSearch (props) {
  const [active, setActive] = useState(false);
  return (
    <MainSearchWrapper>
      <MainSearchInput placeholder={'Search...'}
                       onFocus={() => setActive(true)}
                       onBlur={() => setActive(false)}
      />
      <MainSearchIcon active={active} onClick={() => {}}>
        <i className={SEARCH_ICON}/>
      </MainSearchIcon>
    </MainSearchWrapper>
  )
}