import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

export const checkAuth = function (ComposedComponent) {
  class Authenticate extends React.Component {
    componentWillMount() {
      if (this.props.isLoggedIn) {
        this.context.router.push('/');
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
      isLoggedIn: false,
    };
  }

  const mapDispatchToProps = (dispatch) => {
    return {};
  };

  return connect(mapStateToProps, mapDispatchToProps)(Authenticate);
}
