import { Link } from 'react-router-dom'

function Settings() {
  return (
    <div>
      <h3>Settings (child page inside layout)</h3>
      <p>This is a child page of the dashboard layout.</p>
      <Link to="/dashboard">Back to Dashboard</Link>
    </div>
  )
}

export default Settings
