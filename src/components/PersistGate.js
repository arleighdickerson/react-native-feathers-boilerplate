// @flow
import React from 'react'; // eslint-disable-line import/no-unresolved
import type { Node } from 'react'; // eslint-disable-line import/no-unresolved

type Props = {
  children?: Node | Function, // eslint-disable-line
  loading?: Node,
  ready: Promise<any>,
  beforeLift: Function,
  afterLift: Function,
}

type State = {
  bootstrapped: boolean,
  subscribed: boolean,
}

export default class PersistGate extends React.PureComponent<Props, State> {
  static defaultProps = {
    loading:    null,
    beforeLift: null,
    afterLift:  null,
  }

  state = {
    bootstrapped: false,
    subscribed:   true,
  }

  componentDidMount() {
    if (!this.state.bootstrapped) {
      this.props.ready.then(() => {
        if (this.state.subscribed) {
          this.setState({ bootstrapped: true, subscribed: false });
        }
      });
    }
  }

  componentWillUpdate(nextProps: Props, nextState: State) {
    if (!this.state.bootstrapped && nextState.bootstrapped) {
      if (this.props.beforeLift) {
        this.props.beforeLift();
      }
    }
  }

  componentDidUpdate(prevProps: Props, prevState: State) {
    if (!prevState.bootstrapped && this.state.bootstrapped) {
      if (this.props.afterLift) {
        this.props.afterLift();
      }
    }
  }

  componentWillUnmount() {
    this.setState({ subscribed: false });
  }

  render() {
    return this.state.bootstrapped ? this.props.children : this.props.loading;
  }
}
