import { schema, yup } from "../../../lib/validation.js";


export const toolsPath = 'api/tools'

export const toolsMethods = ['find', 'get', 'create', 'patch', 'remove']

export const toolsClient = (client) => {
  const connection = client.get('connection')

  client.use(toolsPath, connection.service(toolsPath), {
    methods: toolsMethods
  })
}

export const toolsSchema = schema({
  clientId: yup.string().trim().required().label('Client ID'),
  name: yup.string().trim().max(100).required().label('Name'),
  description: yup.string().trim().max(500).label('Name'),
  size: yup.string().trim().oneOf(['sm', 'lg', 'xl']).label('Size'),
});
