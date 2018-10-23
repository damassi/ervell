import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Cookies from 'cookies-js';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

const Link = styled(NavLink)`
  display: block;
`;

export default class ProfileLinkUnlessCurrent extends Component {
  static propTypes = {
    name: PropTypes.string,
    value: PropTypes.string,
  }

  static defaultProps = {
    name: null,
    value: null,
  }

  setCookie = () => {
    const { name, value } = this.props;

    if (!name || !value) return;

    try {
      Cookies.set(name, value);
    } catch (err) {
      console.error(err);
    }
  }

  render() {
    const {
      name: _name, value: _value, ...rest
    } = this.props;

    return (
      <Link {...rest} onClick={this.setCookie} />
    );
  }
}
