import React, { PropsWithChildren } from 'react'
import { connect } from 'react-redux'
import { RouteComponentProps } from "react-router-dom";

interface Params {}

type Props = PropsWithChildren<RouteComponentProps<Params>>
function Profile(props: Props) {
	return (
    <div>
<<<<<<< HEAD
      profile    
=======
			demo
>>>>>>> e42c19a7b7f68252d08b29a52d35eaeb031f06de
    </div>
  );
}

// test todo
export default connect()(Profile)