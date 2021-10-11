import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './styles.module.css';

const Input = ({
  type,
  placeholder,
  onChange,
  value,
  label,
  fullWidth,
  className,
  buttonAfter,
  disabled,
  required,
}) => {
  return (
    <div>
      {label && (
        <label className={styles.label}>
          {label} {required && <span className={styles.required}>*</span>}
        </label>
      )}
      <span className={styles.inputGroup}>
        <input
          className={classNames(
            styles.input,
            className,
            fullWidth && styles.fullWidth,
            disabled && styles.disabled,
          )}
          type={type}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          value={value}
          disabled={disabled}
        />
        {buttonAfter}
      </span>
    </div>
  );
};

Input.propTypes = {
  type: PropTypes.oneOf(['text', 'url', 'password', 'number']),
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.string,
  label: PropTypes.string,
  fullWidth: PropTypes.bool,
  className: PropTypes.string,
  buttonAfter: PropTypes.element,
  disabled: PropTypes.bool,
  required: PropTypes.bool,
};

Input.defaultProps = {
  type: 'text',
  placeholder: '',
  onChange: () => {},
  value: '',
  label: '',
  fullWidth: false,
  className: null,
  buttonAfter: null,
  disabled: false,
  required: false,
};

export default Input;
