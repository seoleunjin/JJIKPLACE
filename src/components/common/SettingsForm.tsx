import React from "react";
import styled from "styled-components";

const StyledInput = styled.input`
  border-radius: 5px;
  height: 57px;
  width: 100%;
  padding: 16px 18px;
  border: 1px solid var(--color-gray2) !important;
`;

interface FieldProps {
  name: string;
  label: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}
interface SettingsFormProps {
  fields: FieldProps[];
}

function SettingsForm({ fields }: SettingsFormProps) {
  return (
    <div>
      {fields.map((field) => (
        <div key={field.name}>
          <StyledInput
            type={field.type}
            name={field.name}
            placeholder={field.label}
            value={field.value}
            onChange={field.onChange}
          />
          {field.error && <p style={{ color: "red" }}>{field.error}</p>}
        </div>
      ))}
    </div>
  );
}

export default SettingsForm;
