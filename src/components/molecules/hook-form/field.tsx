import { useFormContext } from 'react-hook-form';
import {
  FormControl, FormField, FormItem, FormLabel, FormMessage 
} from '@/components/shadcn/form';
import { Input } from '@/components/shadcn/input';
import { Textarea } from '@/components/shadcn/textarea';

// ----------------------------------------------------------------------

type Props = {
  field: 'input' | 'textarea' | 'datepicker';
  name: string;
  label?: string;
  helperText?: string;
  type?: string;
} & { [key: string]: unknown };

export function Field({ field = 'input', name = 'textField', label = 'Field', helperText, type, ...other }: Props) {
  const { control } = useFormContext();

  const RenderField = field === 'input' ? Input : Textarea;

  return (
    <FormField
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <RenderField {...field} name={name} type={type} {...other} />
          </FormControl>
          <FormMessage
          // helperText={error ? error?.message : helperText}
          />
        </FormItem>
      )}
    />
  );
}
