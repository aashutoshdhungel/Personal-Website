import { Link } from 'react-router-dom'
import SEO from '../components/SEO.jsx'
import { IconArrowRight } from '../components/Icons.jsx'
import './NotFound.css'

function NotFound() {
  return (
    <main className="page-wrapper notfound">
      <SEO title="Page Not Found" />
      <div className="notfound__inner">
        <span className="notfound__code" aria-hidden="true">404</span>
        <h1 className="notfound__title">Page Not Found</h1>
        <p className="notfound__desc">
          The page you are looking for does not exist or may have been moved.
        </p>
        <Link to="/" className="btn btn-primary">
          Go Home
          <IconArrowRight />
        </Link>
      </div>
    </main>
  )
}

export default NotFound