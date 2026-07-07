
import { BrowserRouter, useRoutes } from 'react-router-dom'
import { createRoutes } from '../libs/dsl'
import type { Route } from '../types/route'

function RouteContent({ routes }: { routes: Route[] }) {
  return useRoutes(createRoutes(routes))
}

function RouteProvider({ routes }: { routes: Route[] }) {
  return (
    <BrowserRouter>
      <RouteContent routes={routes} />
    </BrowserRouter>
  )
}

export { RouteProvider }
