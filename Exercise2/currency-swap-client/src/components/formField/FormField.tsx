import React from 'react';
import { Controller, Control } from 'react-hook-form';
import TextField from "@mui/material/TextField";

import { StyledMUIImg, StyledMUIMenuItem, StyledSelectedValue } from "../../styles/BaseComponent";

interface Option {
    value: string;
    label: string;
    image: string;
}

interface FormFieldProps {
    name: string;
    control: Control<any>;
    label: string;
    type: "select" | "number" | "text";
    options?: Option[];
    error?: string;
}

const FormField: React.FC<FormFieldProps> = ({ name, control, label, type, options, error }) => {
    const renderSelectedValue = (value: unknown) => {
        const selectedValue = value as string;
        const selectedOption = options?.find(option => option.value === selectedValue);

        return selectedOption ? (
            <StyledSelectedValue>
                {selectedOption.label}
                <StyledMUIImg src={selectedOption.image} alt={selectedOption.label} />
            </StyledSelectedValue>
        ) : null;
    };

    const renderOptions = () => {
        return options?.map((option, index) => (
            <StyledMUIMenuItem key={index} value={option.value}>
                {option.label}
                <StyledMUIImg src={option.image} alt={option.label} />
            </StyledMUIMenuItem>
        ));
    };

    return (
        <Controller
            name={name}
            control={control}
            render={({ field }) => (
                <TextField
                    {...field}
                    label={label}
                    variant="outlined"
                    select={type === "select"}
                    type={type === "number" ? "number" : "text"}
                    error={!!error}
                    helperText={error}
                    fullWidth
                    SelectProps={{
                        renderValue: renderSelectedValue
                    }}
                >
                    {type === "select" && renderOptions()}
                </TextField>
            )}
        />
    );
}

export default FormField;
