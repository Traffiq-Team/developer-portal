import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import styles from './styles.module.css';

const Input = ({ type, placeholder, onChange, value, label }) => {
  return (
    <Fragment>
      {label && <label className={styles.label}>{label}</label>}
      <input
        className={styles.input}
        type={type}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        value={value}
      />
    </Fragment>
  );
};

Input.propTypes = {
  type: PropTypes.oneOf(['text', 'url', 'password', 'number']),
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.string,
  label: PropTypes.string,
};

Input.defaultProps = {
  type: 'text',
  placeholder: '',
  onChange: () => {},
  value: '',
  label: '',
};

export default Input;
