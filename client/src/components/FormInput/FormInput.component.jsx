import { FormControl, FormLabel, Input } from "@chakra-ui/react";

const FormInput = ({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  name,
  ...rest
}) => {
  return (
    <FormControl my="15px">
      <FormLabel>{label}</FormLabel>
      <Input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        name={name}
        {...rest}
      />
    </FormControl>
  );
};

export default FormInput;
