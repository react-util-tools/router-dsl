import { Link } from 'react-router-dom'

function Users() {
  return (
    <div>
      <h2>Users (child page inside group)</h2>
      <p>This is a child page within the admin group.</p>
      <Link to="/admin">Back to Admin</Link>
    </div>
  )
}

export default Users
