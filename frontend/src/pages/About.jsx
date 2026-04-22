import SEO from '../components/SEO.jsx'
import {
  IconMap,
  IconPhone,
  IconGithub,
  IconLinkedin,
  IconStethoscope,
  IconHeart,
  IconCross,
} from '../components/Icons.jsx'
import './About.css'

const timeline = [
  { year: '2024', title: 'Began Medical Entrance Preparation', desc: 'Started intensive study for MBBS entrance examinations, focusing on Biology, Chemistry, and Physics.' },
  { year: '2023', title: 'First Story Published', desc: 'Wrote and shared a short story exploring human connection and the meaning of life in rural Nepal.' },
  { year: '2022', title: 'Discovered Poetry', desc: 'Found solace in verse during challenging times, beginning to write poems that explore emotion and nature.' },
  { year: '2020', title: 'Interest in Medicine Began', desc: 'Witnessed local healthcare challenges and became deeply motivated to contribute as a future physician.' },
]

const skills = [
  { label: 'Biology', level: 90 },
  { label: 'Chemistry', level: 80 },
  { label: 'Physics', level: 72 },
  { label: 'Creative Writing', level: 88 },
  { label: 'Poetry', level: 92 },
]

const infoItems = [
  { Icon: IconMap, key: 'Location', val: 'Arjundhara, Jhapa, Nepal', href: null },
  { Icon: IconPhone, key: 'Phone', val: '9800000000', href: null },
  { Icon: IconGithub, key: 'GitHub', val: 'aashutoshdhungel', href: 'https://github.com/aashutoshdhungel' },
  { Icon: IconLinkedin, key: 'LinkedIn', val: 'linkedin.com/in/aashutosh-dhungel-01b5bb393/', href: 'https://www.linkedin.com/in/aashutosh-dhungel-01b5bb393/' },
  { Icon: IconStethoscope, key: 'Aim', val: 'MBBS Doctor', href: null },
  { Icon: IconHeart, key: 'Hobbies', val: 'Poetry, Story Writing', href: null },
]

function About() {
  return (
    <main className="page-wrapper">
      <SEO
        title="About"
        description="Learn about Aashutosh Dhungel, a medical aspirant and writer from Arjundhara, Jhapa, Nepal preparing for MBBS with a love for poetry and stories."
      />

      <section className="about-hero">
        <div className="about-hero__bg" />
        <div className="container">
          <p className="section-label fade-in">Who I Am</p>
          <h1 className="section-title about-hero__title fade-in fade-in-delay-1">
            A Doctor in the Making,<br />
            <em>A Writer at Heart</em>
          </h1>
          <p className="about-hero__intro fade-in fade-in-delay-2">
            My name is Aashutosh Dhungel. I grew up in Arjundhara, Jhapa, Nepal, surrounded by
            the lush terai landscape that shaped both my sense of wonder and my love of words.
            I am preparing to study medicine with the dream of becoming a doctor who heals not
            just with medicine but with empathy.
          </p>
        </div>
      </section>

      <section className="about-details section-pad">
        <div className="container about-details__grid">
          <div className="about-info">
            <div className="about-info__card fade-in">
              <h3 className="about-info__heading">Personal Details</h3>
              <ul className="about-info__list">
                {infoItems.map(item => (
                  <li key={item.key}>
                    <span className="about-info__icon-wrap">
                      <item.Icon />
                    </span>
                    <div>
                      <span className="about-info__key">{item.key}</span>
                      {item.href ? (
                        <a href={item.href} target="_blank" rel="noreferrer" className="about-info__link">
                          {item.val}
                        </a>
                      ) : (
                        <span className="about-info__val">{item.val}</span>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="about-main">
            <div className="about-skills fade-in">
              <h3>Subject Proficiency</h3>
              {skills.map(s => (
                <div key={s.label} className="skill-row">
                  <div className="skill-row__header">
                    <span>{s.label}</span>
                    <span className="skill-row__pct">{s.level}%</span>
                  </div>
                  <div className="skill-bar">
                    <div className="skill-bar__fill" style={{ '--w': `${s.level}%` }} />
                  </div>
                </div>
              ))}
            </div>

            <div className="about-philosophy fade-in">
              <span className="about-philosophy__icon">
                <IconCross />
              </span>
              <blockquote>
                Medicine is the most humane of the arts, the most artistic of the sciences, and
                the most scientific of the humanities. I want to walk that path and serve the
                people of Nepal.
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      <section className="timeline-section section-pad">
        <div className="container">
          <p className="section-label">My Journey</p>
          <h2 className="section-title">Milestones So Far</h2>
          <div className="timeline">
            {timeline.map((item, i) => (
              <div key={i} className="timeline__item">
                <div className="timeline__year">{item.year}</div>
                <div className="timeline__dot" />
                <div className="timeline__body">
                  <h4>{item.title}</h4>
                  <p>{item.desc}</p>
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