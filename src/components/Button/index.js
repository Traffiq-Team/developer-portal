import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import styles from './styles.module.css';

const Button = ({ children, type, variation }) => {
  const className = classNames(styles.button, styles[variation]);

  return (
    <button type={type} className={className}>
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  variation: PropTypes.oneOf(['primary']),
};

Button.defaultProps = {
  type: 'button',
  variation: 'primary',
};

export default Button;
