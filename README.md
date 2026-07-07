# @util-tools/react-router-dsl

Declarative route DSL for react-router-dom v7. Define routes with a simple type-safe API: page, layout, and group.

## Installation

```bash
npm install @util-tools/react-router-dsl
```

```bash
bun add @util-tools/react-router-dsl
```

## Usage

```tsx
import { createRoutes, RouteProvider } from "@util-tools/react-router-dsl"
import type { Route } from "@util-tools/react-router-dsl"

const routes: Route[] = [
  { type: "page", index: true, element: <Home /> },
  {
    type: "layout",
    path: "dashboard",
    element: <DashboardLayout />,
    children: [
      { type: "page", index: true, element: <DashboardHome /> },
      { type: "page", index: false, path: "settings", element: <Settings /> },
    ],
  },
  {
    type: "group",
    path: "admin",
    children: [
      { type: "page", index: true, element: <AdminHome /> },
    ],
  },
]

function App() {
  return <RouteProvider routes={routes} />
}
```

## API

### `Route` type

| Type     | Properties                                           |
| -------- | ---------------------------------------------------- |
| `page`   | `type: "page"`, `index: boolean`, `path?`, `element` |
| `layout` | `type: "layout"`, `path?`, `element`, `children`     |
| `group`  | `type: "group"`, `path?`, `children`                 |

### `createRoutes(routes)`

Converts Route DSL to react-router-dom `RouteObject[]`.

### `<RouteProvider routes>`

Renders `<BrowserRouter>` with the given routes.
