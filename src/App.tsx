import { RouteProvider } from './lib'
import type { Route } from './lib'
import {
  Home,
  About,
  DashboardLayout,
  DashboardIndex,
  Settings,
  AdminIndex,
  Users,
  Contact,
  Legacy,
} from './pages'

const routes: Route[] = [
  {
    type: "layout",
    element: (
      <div style={{ fontFamily: 'sans-serif' }}>
        <nav style={{ background: '#eee', padding: 8, marginBottom: 16 }}>
          <a href="/">Home</a> | <a href="/about">About</a> |{" "}
          <a href="/contact">Contact</a> |{" "}
          <a href="/dashboard">Dashboard</a> |{" "}
          <a href="/admin">Admin</a> | <a href="/legacy">Legacy</a>
        </nav>
        <div style={{ padding: '0 16px' }}>
          <p>
            <strong>Root Layout</strong> (layout without path — wraps all
            routes)
          </p>
        </div>
      </div>
    ),
    children: [
      { type: "page", index: true, element: <Home /> },
      { type: "page", index: false, path: "about", element: <About /> },
      { type: "page", index: false, path: "contact", element: <Contact /> },
      {
        type: "layout",
        path: "dashboard",
        element: <DashboardLayout />,
        children: [
          { type: "page", index: true, element: <DashboardIndex /> },
          { type: "page", index: false, path: "settings", element: <Settings /> },
        ],
      },
      {
        type: "group",
        path: "admin",
        children: [
          { type: "page", index: true, element: <AdminIndex /> },
          { type: "page", index: false, path: "users", element: <Users /> },
        ],
      },
      {
        type: "group",
        children: [
          { type: "page", index: false, path: "legacy", element: <Legacy /> },
        ],
      },
    ],
  },
]

function App() {
  return <RouteProvider routes={routes} />
}

export default App
