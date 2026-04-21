import Icon from '../components/Icon.jsx'
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

function About() {
  return (
    <main className="page-wrapper">
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
                <li>
                  <Icon id="map" className="icon" />
                  <div>
                    <span className="about-info__key">Location</span>
                    <span className="about-info__val">Arjundhara, Jhapa, Nepal</span>
                  </div>
                </li>
                <li>
                  <Icon id="phone" className="icon" />
                  <div>
                    <span className="about-info__key">Phone</span>
                    <span className="about-info__val">9800000000</span>
                  </div>
                </li>
                <li>
                  <Icon id="github" className="icon" />
                  <div>
                    <span className="about-info__key">GitHub</span>
                    <a href="https://github.com/aashutoshdhungel" target="_blank" rel="noreferrer" className="about-info__link">
                      aashutoshdhungel
                    </a>
                  </div>
                </li>
                <li>
                  <Icon id="linkedin" className="icon" />
                  <div>
                    <span className="about-info__key">LinkedIn</span>
                    <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="about-info__link">
                      linkedin.com
                    </a>
                  </div>
                </li>
                <li>
                  <Icon id="stethoscope" className="icon" />
                  <div>
                    <span className="about-info__key">Aim</span>
                    <span className="about-info__val">MBBS Doctor</span>
                  </div>
                </li>
                <li>
                  <Icon id="heart" className="icon" />
                  <div>
                    <span className="about-info__key">Hobbies</span>
                    <span className="about-info__val">Poetry, Story Writing</span>
                  </div>
                </li>
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
              <Icon id="cross" className="icon icon-lg about-philosophy__icon" />
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
