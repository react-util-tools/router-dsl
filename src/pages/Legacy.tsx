import { Link } from 'react-router-dom'

function Legacy() {
  return (
    <div>
      <h1>Legacy (group without path)</h1>
      <p>This page is inside a group without a path property.</p>
      <Link to="/">Back to Home</Link>
    </div>
  )
}

export default Legacy
