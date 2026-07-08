import { Link } from 'react-router-dom'

function DashboardIndex() {
  return (
    <div>
      <h3>Dashboard Home (index page inside layout)</h3>
      <p>This is the index page of the dashboard layout.</p>
      <Link to="/">Back to Home</Link>
    </div>
  )
}

export default DashboardIndex
