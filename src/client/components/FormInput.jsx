import React from 'react';

export const FormInput = ({ label, type = 'text', id, placeholder, onChange }) => {
  return (
    <div className="mb-3">
      <label htmlFor={id} className="form-label">
        {label}
      </label>
      <input
        type={type}
        className="form-control"
        name={id}
        id={id}
        placeholder={placeholder}
        onChange={onChange}
      />
    </div>
  );
};
