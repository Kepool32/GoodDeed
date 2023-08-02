
import { useState } from 'react';

// Пользовательский хук для обработки состояния полей формы
export const useFormInput = (initialValue: string) => {
    const [value, setValue] = useState(initialValue);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    };

    return {
        value,
        onChange: handleChange,
    };
};
