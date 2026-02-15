import { Input } from '@/components/ui/input';
import { TextInputProps } from "react-native";

export type NumberInputProps = Omit<TextInputProps, 'value' | 'onChangeText'> & {
  value: number;
  onChange: (value: number) => void;
}

export function NumberInput({ value, onChange, ...props }: NumberInputProps) {
  return (
    <Input
      {...props}
      keyboardType="numeric"
      value={value.toString()}
      onChangeText={(text) => onChange(parseInt(text) || 0)}
    />
  );
}