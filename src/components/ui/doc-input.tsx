import React, { forwardRef } from 'react';
import { Input } from './input';

export type InputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'type'
> & {
  error?: boolean;
};

const DocNumberInput = forwardRef<HTMLInputElement, InputProps>(({ onChange, ...props }, ref) => {
  const formatCpfCnpj = (value: string) => {
    const cleanedValue = value.replace(/\D/g, '');

    if (cleanedValue.length <= 11) {
      return cleanedValue
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d{1,2})/, '$1-$2')
        .replace(/(-\d{2})\d+?$/, '$1');
    } else {
      return cleanedValue
        .replace(/(\d{2})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1/$2')
        .replace(/(\d{4})(\d)/, '$1-$2');
    }
  };

  return (
    <Input
      ref={ref}
      onChange={(e) => {
        const { value } = e.target;
        e.target.value = formatCpfCnpj(value);
        onChange && onChange(e);
      }}
      placeholder="CPF/CNPJ"
      {...props}
    />
  );
});
DocNumberInput.displayName = 'DocNumberInput'

export { DocNumberInput };

