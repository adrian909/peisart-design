import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [activeSection, setActiveSection] = useState('acasa')

  const smoothScrollTo = (element) => {
    const targetPosition = element.getBoundingClientRect().top + window.pageYOffset - 80
    const startPosition = window.pageYOffset
    const distance = targetPosition - startPosition
    const duration = 1200 // 1.2 secunde pentru smooth scroll
    let start = null

    const animation = (currentTime) => {
      if (start === null) start = currentTime
      const timeElapsed = currentTime - start
      const progress = Math.min(timeElapsed / duration, 1)
      
      // Easing function pentru o mișcare mai naturală
      const ease = progress < 0.5
        ? 4 * progress * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 3) / 2

      window.scrollTo(0, startPosition + distance * ease)

      if (timeElapsed < duration) {
        requestAnimationFrame(animation)
      }
    }

    requestAnimationFrame(animation)
  }

  const handleNavClick = (e, sectionId) => {
    e.preventDefault()
    setActiveSection(sectionId)
    const element = document.getElementById(sectionId)
    if (element) {
      smoothScrollTo(element)
    }
  }

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in')
        }
      })
    }, observerOptions)

    const animatedElements = document.querySelectorAll('.animate-on-scroll')
    animatedElements.forEach(el => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  const servicii = [
    {
      titlu: 'Design Peisagistic',
      descriere: 'Creăm proiecte personalizate pentru grădini și spații verzi, adaptate stilului tău.',
      icon: '🎨'
    },
    {
      titlu: 'Amenajări Grădini',
      descriere: 'Transformăm spațiile exterioare în oaze de relaxare și frumusețe.',
      icon: '🌿'
    },
    {
      titlu: 'Întreținere Spații Verzi',
      descriere: 'Servicii complete de întreținere pentru a păstra frumusețea grădinii tale.',
      icon: '✂️'
    },
    {
      titlu: 'Sisteme de Irigații',
      descriere: 'Instalăm și întreți sisteme moderne de irigații pentru un gazon perfect.',
      icon: '💧'
    },
    {
      titlu: 'Iluminat Exterior',
      descriere: 'Soluții profesionale de iluminat pentru a valorifica frumusețea grădinii.',
      icon: '💡'
    },
    {
      titlu: 'Pavaje și Alei',
      descriere: 'Realizăm pavaje decorative și alei funcționale pentru orice stil.',
      icon: '🛤️'
    }
  ]

  const proiecte = [
    {
      titlu: 'Grădină Modernă',
      descriere: 'Amenajare completă cu elemente contemporane',
      imagine: '🏡'
    },
    {
      titlu: 'Spațiu Relax',
      descriere: 'Zonă de odihnă cu fântână și vegetație luxuriantă',
      imagine: '🌳'
    },
    {
      titlu: 'Curte Rezidențială',
      descriere: 'Design elegant cu gazon perfect și flori sezoniere',
      imagine: '🏠'
    },
    {
      titlu: 'Grădină Japoneză',
      descriere: 'Amenajare în stil asiatic cu elemente tradiționale',
      imagine: '🎋'
    }
  ]

  return (
    <div className="app">
      {/* Header & Navigation */}
      <header className="header">
        <div className="container">
          <div className="logo">
            <h1>Peisart Design</h1>
            <span className="tagline">Peisagistică & Grădini</span>
          </div>
          <nav className="nav">
            <a href="#acasa" onClick={(e) => handleNavClick(e, 'acasa')} className={activeSection === 'acasa' ? 'active' : ''}>Acasă</a>
            <a href="#servicii" onClick={(e) => handleNavClick(e, 'servicii')} className={activeSection === 'servicii' ? 'active' : ''}>Servicii</a>
            <a href="#portofoliu" onClick={(e) => handleNavClick(e, 'portofoliu')} className={activeSection === 'portofoliu' ? 'active' : ''}>Portofoliu</a>
            <a href="#despre" onClick={(e) => handleNavClick(e, 'despre')} className={activeSection === 'despre' ? 'active' : ''}>Despre Noi</a>
            <a href="#contact" onClick={(e) => handleNavClick(e, 'contact')} className={activeSection === 'contact' ? 'active' : ''}>Contact</a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero" id="acasa">
        <div className="hero-content">
          <h2>Creăm Grădini de Vis</h2>
          <p>Transformăm spațiile tale exterioare în oaze de frumusețe și relaxare</p>
          <div className="hero-features">
            <span>✓ Design Personalizat</span>
            <span>✓ Echipă Profesionistă</span>
            <span>✓ Garanție Calitate</span>
          </div>
          <button className="cta-button" onClick={(e) => handleNavClick(e, 'contact')}>Solicită Consultație Gratuită</button>
        </div>
      </section>

      {/* Servicii Section */}
      <section className="servicii" id="servicii">
        <div className="container">
          <h2>Serviciile Noastre</h2>
          <p className="section-subtitle">Oferim o gamă completă de servicii de peisagistică</p>
          <div className="servicii-grid">
            {servicii.map((serviciu, index) => (
              <div key={index} className="serviciu-card animate-on-scroll" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="serviciu-icon">{serviciu.icon}</div>
                <h3>{serviciu.titlu}</h3>
                <p>{serviciu.descriere}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portofoliu Section */}
      <section className="portofoliu" id="portofoliu">
        <div className="container">
          <h2>Portofoliul Nostru</h2>
          <p className="section-subtitle">Proiecte realizate cu pasiune și profesionalism</p>
          <div className="portofoliu-grid">
            {proiecte.map((proiect, index) => (
              <div key={index} className="proiect-card animate-on-scroll" style={{ animationDelay: `${index * 0.15}s` }}>
                <div className="proiect-imagine">{proiect.imagine}</div>
                <h3>{proiect.titlu}</h3>
                <p>{proiect.descriere}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Despre Section */}
      <section className="despre" id="despre">
        <div className="container">
          <h2>Despre Peisart Design</h2>
          <div className="despre-content">
            <div className="despre-text">
              <p>
                <strong>Peisart Design</strong> este o companie de peisagistică dedicată creării de spații verzi unice și memorabile. 
                Cu o echipă de profesioniști pasionați și experiență de peste 10 ani în domeniu, transformăm fiecare grădină 
                într-o adevărată operă de artă.
              </p>
              <p>
                Ne mândrim cu atenția la detalii, calitatea materialelor folosite și dedicarea pentru fiecare proiect. 
                De la conceptul inițial până la finalizare, suntem alături de clienții noștri la fiecare pas.
              </p>
              <div className="stats">
                <div className="stat animate-on-scroll" style={{ animationDelay: '0s' }}>
                  <h3>200+</h3>
                  <p>Proiecte Finalizate</p>
                </div>
                <div className="stat animate-on-scroll" style={{ animationDelay: '0.1s' }}>
                  <h3>10+</h3>
                  <p>Ani Experiență</p>
                </div>
                <div className="stat animate-on-scroll" style={{ animationDelay: '0.2s' }}>
                  <h3>100%</h3>
                  <p>Clienți Mulțumiți</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="contact" id="contact">
        <div className="container">
          <h2>Contactează-ne</h2>
          <p className="section-subtitle">Suntem aici să răspundem la toate întrebările tale</p>
          <div className="contact-content">
            <div className="contact-info">
              <div className="contact-item">
                <span className="contact-icon">📞</span>
                <div>
                  <h4>Telefon</h4>
                  <p>+40 0754 453 303</p>
                </div>
              </div>
              <div className="contact-item">
                <span className="contact-icon">✉️</span>
                <div>
                  <h4>Email</h4>
                  <p>peisartdesignsrl@gmail.com</p>
                </div>
              </div>
              <div className="contact-item">
                <span className="contact-icon">📍</span>
                <div>
                  <h4>Adresă</h4>
                  <p>Alba Iulia, Alba, România</p>
                </div>
              </div>
              <div className="contact-item">
                <span className="contact-icon">⏰</span>
                <div>
                  <h4>Program</h4>
                  <p>Luni - Vineri: 09:00 - 18:00</p>
                </div>
              </div>
            </div>
            <form className="contact-form">
              <input type="text" placeholder="Numele tău" required />
              <input type="email" placeholder="Email" required />
              <input type="tel" placeholder="Telefon" required />
              <textarea placeholder="Mesajul tău" rows="5" required></textarea>
              <button type="submit" className="submit-button">Trimite Mesaj</button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <h3>Peisart Design</h3>
              <p>Transformăm spațiile tale exterioare în oaze de frumusețe</p>
            </div>
            <div className="footer-section">
              <h4>Link-uri Rapide</h4>
              <a href="#servicii">Servicii</a>
              <a href="#portofoliu">Portofoliu</a>
              <a href="#despre">Despre Noi</a>
              <a href="#contact">Contact</a>
            </div>
            <div className="footer-section">
              <h4>Social Media</h4>
              <div className="social-links">
                <a href="#" aria-label="Facebook">Facebook</a>
                <a href="#" aria-label="Instagram">Instagram</a>
                <a href="#" aria-label="LinkedIn">LinkedIn</a>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2026 Peisart Design. Toate drepturile rezervate. Acest website a fost realizat de <a href="https://trifadrian.ro" target="_blank" rel="noopener noreferrer">Adrian Trif</a>.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
