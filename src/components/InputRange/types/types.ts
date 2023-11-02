type InputRangeProps = {
  value: number;
  count: number;
  onChange: (e: React.FormEvent<HTMLInputElement> | number) => void;
};

export default InputRangeProps;
