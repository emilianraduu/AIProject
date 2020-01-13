import React from 'react'
import { Route } from 'react-router-dom'
import DetailsStep from './DetailsStep'
import FestivalStep from './FestivalStep'
import PrizesStep from './PrizesStep'
import BlindsStep from './BlindsStep'
import FeeStep from './FeeStep'
import TablesStep from './TablesStep'
import ImportStep from './ImportStep'

export default ({ match }) => {
  return (
    <>
      <Route exact path={`${match.url}/fee`} component={FeeStep} />
      <Route exact path={`${match.url}/blinds`} component={BlindsStep} />
      <Route exact path={`${match.url}/prizes`} component={PrizesStep} />
      <Route exact path={`${match.url}/festival`} component={FestivalStep} />
      <Route exact path={`${match.url}/import`} component={ImportStep} />
      <Route exact path={`${match.url}/table`} component={TablesStep} />
      <Route exact path={`${match.url}`} component={DetailsStep} />
    </>
  )
}
