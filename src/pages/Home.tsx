import { Link } from 'react-router-dom'

function Home() {
  return (
    <div>
      <h1>Home</h1>
      <p>Welcome to the DSL demo!</p>
      <nav>
        <ul>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/contact">Contact</Link></li>
          <li><Link to="/dashboard">Dashboard</Link></li>
          <li><Link to="/admin">Admin</Link></li>
          <li><Link to="/legacy">Legacy</Link></li>
        </ul>
      </nav>
    </div>
  )
}

export default Home
