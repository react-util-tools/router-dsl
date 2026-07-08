import { Link } from 'react-router-dom'

function About() {
  return (
    <div>
      <h1>About</h1>
      <p>This is a child page (index: false, path: "about").</p>
      <Link to="/">Back to Home</Link>
    </div>
  )
}

export default About
