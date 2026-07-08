import { Link, Outlet } from 'react-router-dom'

function DashboardLayout() {
  return (
    <div style={{ border: '2px solid blue', padding: 16 }}>
      <h2>Dashboard Layout (layout with path)</h2>
      <nav>
        <Link to="/dashboard">Dashboard Home</Link> |{" "}
        <Link to="/dashboard/settings">Settings</Link>
      </nav>
      <hr />
      <Outlet />
    </div>
  )
}

export default DashboardLayout
