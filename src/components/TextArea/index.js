import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './styles.module.css';

const TextArea = ({
  placeholder,
  onChange,
  value,
  label,
  fullWidth,
  className,
}) => {
  return (
    <span>
      {label && <label className={styles.label}>{label}</label>}
      <textarea
        className={classNames(
          styles.input,
          className,
          fullWidth && styles.fullWidth,
        )}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        value={value}
      />
    </span>
  );
};

TextArea.propTypes = {
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.string,
  label: PropTypes.string,
  fullWidth: PropTypes.bool,
  className: PropTypes.string,
};

TextArea.defaultProps = {
  placeholder: '',
  onChange: () => {},
  value: '',
  label: '',
  fullWidth: false,
  className: null,
};

export default TextArea;
