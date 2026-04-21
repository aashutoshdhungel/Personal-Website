function Icon({ id, className = 'icon' }) {
  return (
    <svg className={className} aria-hidden="true">
      <use href={`/icons.svg#icon-${id}`} />
    </svg>
  )
}

export default Icon
