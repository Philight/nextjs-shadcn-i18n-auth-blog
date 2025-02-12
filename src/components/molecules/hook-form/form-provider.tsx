import React, { forwardRef } from 'react';
import { FormProvider as Form } from 'react-hook-form';

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
  methods: any;
  onSubmit?: VoidFunction;
  formProps?: any;
};

const FormProvider = forwardRef<HTMLSpanElement, Props>(({ children, onSubmit, methods, formProps }, ref) => (
  <Form {...methods}>
    <form onSubmit={onSubmit} ref={ref} {...formProps}>
      {children}
    </form>
  </Form>
));

export default FormProvider;
