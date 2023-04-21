import { ToolsService, getOptions } from './tools.class.js'
import { toolsPath, toolsMethods, toolsSchema } from './tools.shared.js'
import { validateData } from '../../../hooks/vailidation.js'

export * from './tools.class.js'

const validateTools = validateData(toolsSchema);

// A configure function that registers the service and its hooks via `app.configure`
export const tools = (app) => {
  // Register our service on the Feathers application
  app.use(toolsPath, new ToolsService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: toolsMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(toolsPath).hooks({
    around: {
      all: []
    },
    before: {
      all: [],
      find: [],
      get: [],
      create: [validateTools],
      patch: [validateTools],
      update: [validateTools],
      remove: []
    },
    after: {
      all: []
    },
    error: {
      all: []
    }
  })
}
