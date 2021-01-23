import { InputWrapper, Input, Label } from "./styles";

const FormInput = ({ label, value, onChange }) => {
  return (
    <InputWrapper>
      <Label>{label}</Label>
      <Input
        type="text"
        className="form-control w-auto"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </InputWrapper>
  );
};

export default FormInput;
