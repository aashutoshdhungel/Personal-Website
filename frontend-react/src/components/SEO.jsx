import { Helmet } from 'react-helmet-async'
import { useLocation } from 'react-router-dom'

const SITE_NAME = 'Aashutosh Dhungel'
const SITE_URL = 'https://aashutoshdhungel.com.np'
const SITE_URL_ALT = 'https://aashutoshdhungel.vercel.app'
const DEFAULT_DESC = 'Medical aspirant, poet, and story writer from Jhapa, Nepal. Chasing the dream of becoming a doctor while finding meaning in words.'
const DEFAULT_IMAGE = `${SITE_URL}/pfp.jpeg`
const DEFAULT_AUTHOR = 'Aashutosh Dhungel'

function SEO({
  title,
  description,
  keywords,
  image,
  url,
  type = 'website',
  author,
  robots = 'index, follow',
  article,
  schema,
}) {
  const { pathname } = useLocation()
  const fullTitle = title ? `${title} | ${SITE_NAME} - Medical Aspirant & Writer` : `${SITE_NAME} - Medical Aspirant & Writer`
  const desc = description || DEFAULT_DESC
  const img = image || DEFAULT_IMAGE
  const canonicalUrl = url || `${SITE_URL}${pathname}`
  const auth = author || DEFAULT_AUTHOR

  return (
    <Helmet>
      {/* Primary meta tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={desc} />
      {keywords && <meta name="keywords" content={keywords} />}
      <meta name="author" content={auth} />
      <meta name="robots" content={robots} />
      <link rel="canonical" href={canonicalUrl} />
      <link rel="alternate" href={canonicalUrl.replace(SITE_URL, SITE_URL_ALT)} />

      {/* Open Graph */}
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={desc} />
      <meta property="og:image" content={img} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={`${SITE_NAME} - Medical Aspirant and Writer from Nepal`} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:locale" content="en_US" />

      {/* Twitter Cards */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={desc} />
      <meta name="twitter:image" content={img} />
      <meta name="twitter:image:alt" content={`${SITE_NAME} - Medical Aspirant and Writer from Nepal`} />

      {/* Article-specific Open Graph */}
      {article && <meta property="article:published_time" content={article.date} />}
      {article && <meta property="article:section" content={article.category} />}
      {article && <meta property="article:author" content={auth} />}

      {/* JSON-LD Structured Data */}
      {schema && (
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      )}
    </Helmet>
  )
}

export default SEO