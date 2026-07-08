import { Link } from 'react-router-dom'

function Contact() {
  return (
    <div>
      <h1>Contact</h1>
      <p>This is a child page at root level.</p>
      <Link to="/">Back to Home</Link>
    </div>
  )
}

export default Contact
