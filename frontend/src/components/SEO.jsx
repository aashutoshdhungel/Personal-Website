import { Helmet } from 'react-helmet-async'

const SITE_NAME = 'Aashutosh Dhungel'
const SITE_URL = 'https://aashutoshdhungel.com'
const DEFAULT_DESC = 'Medical aspirant, poet, and story writer from Jhapa, Nepal. Chasing the dream of becoming a doctor while finding meaning in words.'
const DEFAULT_IMAGE = `${SITE_URL}/og-image.png`

function SEO({ title, description, image, type = 'website', article }) {
  const fullTitle = title ? `${title} | ${SITE_NAME}` : SITE_NAME
  const desc = description || DEFAULT_DESC
  const img = image || DEFAULT_IMAGE

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={desc} />

      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={desc} />
      <meta property="og:image" content={img} />
      <meta property="og:type" content={type} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={desc} />
      <meta name="twitter:image" content={img} />

      {article && <meta property="article:published_time" content={article.date} />}
      {article && <meta property="article:section" content={article.category} />}
    </Helmet>
  )
}

export default SEO