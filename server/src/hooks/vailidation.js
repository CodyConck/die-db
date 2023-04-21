export const validateData = (defaultSchema) => async (context) => {
  if (context.params.schema === null) {
    return context;
  }
  let schema =
    context.params.schema || defaultSchema
  if (!schema) {
    throw new GeneralError(
      `Cannot call hook "validateData" on path ${context.path} because it has no schema`
    );
  }
  if (context.method === 'patch') {
    const keys = Object.keys(context.data);
    schema = schema.pick(keys);
  }
  context.data = await schema.validateData(context.data, {
    context
  });
  return context;
};