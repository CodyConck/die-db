/* eslint-disable no-template-curly-in-string */
/* eslint-disable no-useless-concat */
// The yup message does its own interpolation. So
// the normal qoutes with ${label} inside them is
// actually correct and does not use back ticks

import { FeathersError } from '@feathersjs/errors';
import * as yup from 'yup';

// This error should generally be thrown when context.data fails
// some validation. The client uses this 420 error code
// to guarantee that it can map the errors back to a
// form UI.
export class ValidationError extends FeathersError {
  constructor(message, data) {
    super(message, 'validation-error', 420, 'ValidationError', data);
  }
}

// https://stackoverflow.com/questions/3050518/what-http-status-response-code-should-i-use-if-the-request-is-missing-a-required
export class QueryError extends FeathersError {
  constructor(message, data) {
    super(message, 'query-error', 422, 'QueryError', data);
  }
}

/* TODO: Update this to make it exactly the same as Formik
on our clients: https://github.com/jaredpalmer/formik/blob/3242489e0cd7b68bad16494b749e43129a2cadbd/src/Formik.tsx#L680 */
const convertYupError = (yupError) => {
  if (!yupError.inner || yupError.inner.length === 0) {
    return {
      [yupError.path]: yupError.message
    };
  }
  return yupError.inner.reduce((errors, error) => {
    errors[error.path] = error.message;
    return errors;
  }, {});
};

/* Improve the basic validate() method to supply default params
that we use most often, as well as customize the error */
yup.addMethod(yup.Schema, 'validateData', function (data, _options) {
  const options = {
    abortEarly: false, // return all errors, not just first
    stripUnknown: true, // remove any props not on schema
    ..._options
  };
  const dataSchema = Array.isArray(data) ? yup.array().of(this) : this;
  return dataSchema.validate(data, options).catch((error) => {
    throw new ValidationError(error.message, {
      errors: convertYupError(error)
    });
  });
});

yup.addMethod(yup.Schema, 'validateQuery', function (data, _options) {
  const options = {
    abortEarly: false, // return all errors, not just first
    stripUnknown: true, // remove any props not on schema
    ..._options
  };
  return this.validate(data, options).catch((error) => {
    throw new QueryError(error.message, {
      errors: convertYupError(error)
    });
  });
});


export { yup };

export const schema = (fields, ...rest) => {
  return yup.object().shape(
    {
      ...fields,
      // Note the DB adapters do not allow overwrite _id so this is basically
      // just allowing *create* with a custom/client _id. The service classes
      // also set these fields if none provided, but they are provided here in
      // the schema to allow clients to set them which is important for offline
      // first usage
      _id: yup.string().trim().label('ID'),
      createdAt: yup.date().label('Created At'),
      updatedAt: yup.date().label('Updated At')
    },
    ...rest
  );
};
