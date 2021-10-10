import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import styles from './styles.module.css';

const Button = ({
  children,
  type,
  variation,
  className,
  fullWidth,
  loading,
  onClick,
}) => {
  const buttonClassNames = classNames(
    styles.button,
    className,
    styles[variation],
    fullWidth && styles.fullWidth,
  );

  const renderContent = () => {
    if (loading) {
      return 'Loading...';
    }

    return children;
  };

  return (
    <button
      type={type}
      className={buttonClassNames}
      disabled={loading}
      onClick={onClick}
    >
      {renderContent()}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  variation: PropTypes.oneOf(['primary']),
  className: PropTypes.string,
  fullWidth: PropTypes.bool,
  loading: PropTypes.bool,
  onClick: PropTypes.func,
};

Button.defaultProps = {
  type: 'button',
  variation: 'primary',
  className: null,
  fullWidth: false,
  loading: false,
  onClick: () => {},
};

export default Button;
