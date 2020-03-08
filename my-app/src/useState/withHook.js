import React from "react"
import runner from '../callbackRunner/index'

export const withHook = func => {
  class HookComponent extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        component: null
      }
      this.mounted = false
      runner(() => {
        const component = func(props)
        if (this.mounted) {
          this.setState({
            component
          })
        } else {
          this.state = {
            component
          }
        }
      })
    }

    componentDidMount() {
      this.mounted = true
    }

    componentWillUnmount() {
      this.mounted = false
    }

    render() {
      return this.state.component
    }
  }

  return HookComponent
}

