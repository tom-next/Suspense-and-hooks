import React from 'react'
import {runner} from '../runner/index'
const withAsync = fun => {
    class AsyncComponent extends React.Component {
        constructor(props) {
            super(props)
            this.state = {
                component: null
            }
            runner(() => {
                let component = fun(props)
                this.setState({
                    component,
                })
            })
        }
  
        render() {
            return this.state.component
        }
    }
    return AsyncComponent
}
export default withAsync