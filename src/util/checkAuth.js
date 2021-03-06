import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

export const checkAuth = function (ComposedComponent) {
  class Authenticate extends React.Component {
    componentWillMount() {
      if (this.props.isLoggedIn) {
        this.context.router.push('/dashboard');
      }
    }

    componentWillUpdate(nextProps) {
      if (nextProps.isLoggedIn) {
        this.context.router.push('/dashboard');
      }
    }

    render() {
      return (
        <ComposedComponent {...this.props} />
      );
    }
  }

  Authenticate.propTypes = {
    isLoggedIn: PropTypes.bool.isRequired,
  };

  Authenticate.contextTypes = {
    router: PropTypes.object.isRequired,
  };

  function mapStateToProps(state) {
    return {
      isLoggedIn: state.auth.isLoggedIn,
    };
  }

  const mapDispatchToProps = (dispatch) => {
    return {};
  };

  return connect(mapStateToProps, mapDispatchToProps)(Authenticate);
}
