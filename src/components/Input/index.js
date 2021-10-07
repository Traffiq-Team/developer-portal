import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './styles.module.css';

const Input = ({ type, placeholder, onChange, value, label, fullWidth }) => {
  return (
    <span>
      {label && <label className={styles.label}>{label}</label>}
      <input
        className={classNames(styles.input, fullWidth && styles.fullWidth)}
        type={type}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        value={value}
      />
    </span>
  );
};

Input.propTypes = {
  type: PropTypes.oneOf(['text', 'url', 'password', 'number']),
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.string,
  label: PropTypes.string,
  fullWidth: PropTypes.bool,
};

Input.defaultProps = {
  type: 'text',
  placeholder: '',
  onChange: () => {},
  value: '',
  label: '',
  fullWidth: false,
};

export default Input;
