import React from "react";
import styled from "styled-components";

const StyledInput = styled.input`
  && {
    border-radius: 5px;
    height: 57px;
    width: 100%;
    padding: 16px 18px;
    border: 1px solid var(--color-gray2) !important;
    margin-bottom: 10px;
  }
`;
const StyledError = styled.p`
  font-family: var(--font-family-SUITE-Regular);
  color: var(--color-secondary5);
  font-size: 1.8rem;
  line-height: 140%;
  letter-spacing: -2%;
  margin-left: 18px;
  margin-bottom: 10px;
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
          {/* {<StyledError>{field.error || "\u00A0"}</StyledError>} */}
          {field.error && <StyledError>{field.error}</StyledError>}
        </div>
      ))}
    </div>
  );
}

export default SettingsForm;
