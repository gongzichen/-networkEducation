import React, { PropsWithChildren } from 'react'

import { connect } from 'react-redux'
import { RouteComponentProps } from 'react-router-dom'

interface Params {}
type Props = PropsWithChildren<RouteComponentProps<Params>>

function Detail(porps: Props) {
	return <div>detail</div>
}

export default connect()(Detail);