import { Link } from 'react-router-dom'

function AdminIndex() {
  return (
    <div>
      <h1>Admin (group with path)</h1>
      <p>This is the index page of the admin group (path: "admin").</p>
      <nav>
        <Link to="/admin/users">Users</Link>
      </nav>
      <br />
      <Link to="/">Back to Home</Link>
    </div>
  )
}

export default AdminIndex
