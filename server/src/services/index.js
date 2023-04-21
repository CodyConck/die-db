import { tools } from './api/tools/tools.js'

export const services = (app) => {
  app.configure(tools)

  // All services will be registered here
}
