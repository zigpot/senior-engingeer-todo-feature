import React, { useState } from 'react';
import './Checkbox.css';

interface CheckboxProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  className?: string;
}

const Checkbox: React.FC<CheckboxProps> = ({ checked = false, onChange, className }) => {
  const [isChecked, setIsChecked] = useState(checked);

  const handleChange = () => {
    const newCheckedState = !isChecked;
    setIsChecked(newCheckedState);
    if (onChange) {
      onChange(newCheckedState);
    }
  };

  return (
    <input
      type="checkbox"
      checked={isChecked}
      onChange={handleChange}
      className={className}
    />
  );
};

export default Checkbox;
