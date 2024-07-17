import Select from 'react-select';
import useMoroccanCities from '../../hooks/useCountries';
import React from 'react';

export type SelectCityValue = {
    label: string;
    value: string;
}

interface SelectCityProps {
    value?: SelectCityValue;
    onChange: (value: SelectCityValue) => void;
}

const SelectCities: React.FC<SelectCityProps> = ({
    value,
    onChange
}) => {
    const { getAll } = useMoroccanCities();

    return (
        <>
            <Select
                isClearable
                placeholder="Anywhere"
                options={getAll()}
                value={value}
                onChange={(value) => onChange(value as SelectCityValue)}
            />
        </>
    )
}


export default SelectCities;