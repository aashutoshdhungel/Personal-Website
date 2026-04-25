import SEO from '../components/SEO.jsx'
import {
  IconMap,
  IconPhone,
  IconLinkedin,
  IconStethoscope,
  IconHeart,
} from '../components/Icons.jsx'
import { useReveal } from '../hooks/useReveal.js'
import './About.css'

const timeline = [
  { year: '2082', title: 'Began Pre-medical Entrance Preparation', desc: 'Started intensive study for MBBS entrance examinations, focusing on Biology, Chemistry, and Physics.' },
  { year: '2081', title: 'Discovered Poetry', desc: 'Found solace in verse during challenging times, beginning to write poems that explore emotion and nature.' },
  { year: '2080', title: 'Interest in Medicine Began', desc: 'Witnessed local healthcare challenges and became deeply motivated to contribute as a future physician.' },
]

const skills = [
  { label: 'Biology', level: 95 },
  { label: 'Chemistry', level: 90 },
  { label: 'Physics', level: 90 },
  { label: 'Creative Writing', level: 97 },
  { label: 'Poetry', level: 92 },
]

const infoItems = [
  { Icon: IconMap, label: 'Location', value: 'Arjundhara, Jhapa, Nepal', href: null },
  { Icon: IconPhone, label: 'Phone', value: '+977 9705804558', href: 'tel:9705804558' },
  { Icon: IconLinkedin, label: 'LinkedIn', value: 'aashutosh-dhungel', href: 'https://www.linkedin.com/in/aashutosh-dhungel-01b5bb393/' },
  { Icon: IconStethoscope, label: 'Aim', value: 'MBBS Doctor', href: null },
  { Icon: IconHeart, label: 'Hobbies', value: 'Poetry, Story Writing', href: null },
]

function About() {
  const ref = useReveal()

  return (
    <main className="page-wrapper" ref={ref}>
      <SEO
        title="About"
        description="Learn about Aashutosh Dhungel, a medical aspirant and writer from Arjundhara, Jhapa, Nepal preparing for MBBS with a love for poetry and stories."
      />

      <section className="about-hero">
        <div className="container about-hero__inner">
          <div>
            <p className="label-tag anim-up">Who I Am</p>
            <h1 className="section-heading about-hero__title anim-up anim-up-1">
              A Doctor in the Making,<br />
              <em>A Writer at Heart</em>
            </h1>
            <p className="about-hero__intro anim-up anim-up-2">
              I am dancing between the shadows of childhood and the dawn of youth, caught in introspective musings. I explore what it means to be a scholar chasing excellence and, someday, a physician who earns the pride of those who shaped me. The name Aashutosh Dhungel is a work in progress, and every day adds a new line to that story.
            </p>
          </div>

          <div className="about-hero__quote-card anim-up anim-up-3">
            <p className="about-hero__quote">
              Medicine is the most humane of the arts, the most artistic of the sciences, and the most scientific of the humanities.
            </p>
            <p className="about-hero__quote-attr">Personal philosophy</p>
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="container about-layout">
          <aside className="about-sidebar">
            <div className="about-card reveal">
              <div className="about-card__head">Personal Details</div>
              <ul className="about-info-list">
                {infoItems.map((item, i) => (
                  <li key={item.label} className="about-info-item">
                    <span className="about-info-item__icon"><item.Icon /></span>
                    <div className="about-info-item__body">
                      <span className="about-info-item__key">{item.label}</span>
                      {item.href ? (
                        <a href={item.href} target="_blank" rel="noreferrer" className="about-info-item__link">
                          {item.value}
                        </a>
                      ) : (
                        <span className="about-info-item__val">{item.value}</span>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          <div className="about-main">
            <div className="about-section reveal">
              <h2 className="about-section-title">Subject Proficiency</h2>
              <div className="skill-list">
                {skills.map(s => (
                  <div key={s.label} className="skill-item">
                    <div className="skill-item__row">
                      <span className="skill-item__name">{s.label}</span>
                      <span className="skill-item__pct">{s.level}%</span>
                    </div>
                    <div className="skill-track">
                      <div className="skill-fill" style={{ '--w': `${s.level}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="timeline-section">
        <div className="container">
          <div className="timeline-section__header">
            <p className="label-tag reveal">My Journey</p>
            <h2 className="section-heading reveal reveal-d1">Milestones So Far</h2>
          </div>
          <div className="timeline">
            {timeline.map((item, i) => (
              <div
                key={i}
                className="timeline-item reveal"
                style={{ transitionDelay: `${i * 120}ms` }}
              >
                <div className="timeline-item__dot" />
                <span className="timeline-item__year">{item.year}</span>
                <div className="timeline-item__card">
                  <h3 className="timeline-item__title">{item.title}</h3>
                  <p className="timeline-item__desc">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}

export default About