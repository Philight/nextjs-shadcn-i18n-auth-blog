import { Field } from './field';

type Props = any;

export default function StyledField({ fieldType, style, ...rest }: Props) {
  const customStyles = { ...style };

  switch (fieldType) {
    case 'text':
      return <Field {...rest} style={customStyles} />;

    default:
      return null;
  }
}
