import {
  Alert,
  Button,
  CustomInput,
  FormFeedback,
  FormGroup,
  Input,
  Label
} from 'reactstrap';
import {
  Form as FormComponent,
  Formik as FormikComponent,
  useFormikContext,
  useField,
  validateYupSchema,
  yupToFormErrors,
  ErrorMessage
} from 'formik';
import { useApp } from '../hooks';
import { Fragment } from 'react';

// Formik almost passes context to the validations, it even uses
// `validateYupSchema` internally, but never passes it a context.
// This is basically an exact copy of how validation is handled
// internally but passes context from props
export const Formik = (props) => {
  const { context: ctx = {}, validationSchema, ...rest } = props;
  const app = useApp();
  return (
    <FormikComponent
      validate={(values) => {
        const context = {
          ...ctx,
          app,
          params: {
            ...ctx.params,
            provider: 'client'
          },
          data: values
        };
        try {
          validateYupSchema(values, validationSchema, true, { context });
          return {};
        } catch (error) {
          return yupToFormErrors(error);
        }
      }}
      {...rest}
    />
  );
};

export const Form = FormComponent;

const getValidation = ({ error = null, touched = null }) => {
  const invalid = !!error && !!touched;
  // const valid = !invalid;
  // return { valid, invalid };
  return { invalid };
};

const isDisabled = (isSubmitting, disabled) => {
  return typeof disabled === 'undefined' ? isSubmitting : disabled;
};

export const useFieldProps = ({ disabled, ...props }) => {
  const [field, meta] = useField(props);
  const validation = getValidation(meta);
  const { isSubmitting } = useFormikContext();
  return {
    ...field,
    ...validation,
    ...props,
    disabled: isDisabled(isSubmitting, disabled)
  };
};

// export function DatePicker({
//   onChange,
//   onBlur,
//   name,
//   options,
//   value,
//   ...rest
// }) {
//   const opts = {
//     mode: 'single',
//     ...options
//   };

//   const createEvent = (dates) => {
//     const value = opts.mode === 'single' ? dates[0] : dates;
//     return { target: { name, value } };
//   };

//   const handleChange = (dates) => {
//     if (onChange) {
//       return onChange(createEvent(dates));
//     }
//   };

//   const handleBlur = (dates) => {
//     if (onBlur) {
//       return onBlur(createEvent(dates));
//     }
//   };

//   return (
//     <Flatpickr
//       options={opts}
//       onChange={handleChange}
//       onClose={handleBlur}
//       value={value}
//       render={({ defaultValue }, ref) => {
//         return <Input {...rest} defaultValue={defaultValue} innerRef={ref} />;
//       }}
//     />
//   );
// }

const components = {
  // date: DatePicker,
  radio: CustomInput,
};

export const Field = (props) => {
  if (components[props.type]) {
    const Component = components[props.type];
    return <Component {...props} />;
  }
  return <Input {...props} />;
};

export const FormField = (_props) => {
  const props = useFieldProps(_props);
  if (components[props.type]) {
    const Component = components[props.type];
    return <Component {...props} />;
  }
  return <Input {...props} />;
};

const getStringMessages = (error, separator) => {
  if (!error) {
    return '';
  }

  if (typeof error === 'string') {
    return error;
  }

  if (Array.isArray(error)) {
    return error
      .map((error) => getStringMessages(error, separator))
      .filter(Boolean)
      .join(separator);
  }

  return Object.values(error)
    .map((error) => getStringMessages(error, separator))
    .filter(Boolean)
    .join(separator);
};

export const FormError = ({ name, style = {}, detached, ...props }) => {
  return (
    <ErrorMessage
      name={name}
      render={(msg) => {
        let messages = getStringMessages(msg, ' | ');
        messages = messages.split(' | ').map((message, index) => {
          return (
            <Fragment key={message + index}>
              <span>{message}</span>
              {index !== messages.length - 1 && <br />}
            </Fragment>
          );
        });
        if (detached) {
          return (
            <div className="position-relative">
              <div className="is-invalid"></div>
              <FormFeedback {...props}>{messages}</FormFeedback>
            </div>
          );
        }
        return <FormFeedback {...props}>{messages}</FormFeedback>;
      }}
    />
  );
};

export const FormErrors = () => {
  const { errors, submitCount } = useFormikContext();
  if (submitCount === 0) {
    return null;
  }
  const message = getStringMessages(errors, '\n');
  if (!message) {
    return null;
    // return (
    //   <Alert color="success" style={{ 'white-space': 'pre-line' }}>
    //     Looking good! You can submit the form.
    //   </Alert>
    // );
  }
  return (
    <Alert color="danger" style={{ 'white-space': 'pre-line' }}>
      {message}
    </Alert>
  );
};

export const FormSubmit = ({ disabled, allowClean, ...props }) => {
  const { isSubmitting, dirty } = useFormikContext();
  // When copying data, the initialValues are already full and
  // valid, but the form is not "dirty". This prop basically allows
  // you to manually allow submitting a non-dirty form
  // TODO: We could also use isValid prop here too...
  const canSubmit = allowClean === true ? true : dirty;
  return (
    <Button
      color="primary"
      type="submit"
      loading={isSubmitting}
      disabled={!canSubmit || isDisabled(isSubmitting, disabled)}
      {...props}
    />
  );
};

export const FormReset = ({ disabled, ...props }) => {
  const { isSubmitting, dirty } = useFormikContext();
  return (
    <Button
      color="white"
      type="reset"
      disabled={!dirty || isDisabled(isSubmitting, disabled)}
      {...props}
    />
  );
};

export const FormButton = ({ disabled, ...props }) => {
  const { isSubmitting } = useFormikContext();
  return (
    <Button
      type="button"
      disabled={isDisabled(isSubmitting, disabled)}
      {...props}
    />
  );
};

export const FormLabel = ({ ...rest }) => {
  return <Label className="small text-secondary mb-2" {...rest} />;
};

export const FormItem = ({ name, label, ...props }) => {
  return (
    <FormGroup className="mb-4 position-relative">
      {label && <FormLabel>{label}</FormLabel>}
      <FormField name={name} {...props} />
      <FormError name={name} />
    </FormGroup>
  );
};
