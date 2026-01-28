import React, { useState, useEffect, useRef } from 'react';
import { Sun, Moon, ArrowRight, Code, Shield, Zap, Globe, Cpu, Layout, X, CheckCircle2, Github, Linkedin, Mail, ExternalLink, Terminal, Users, Database, Smartphone, BarChart3, Binary, Search, PenTool, Rocket, Layers, Quote, Star, Plus, Minus, Send, User, Sparkles, Twitter, Instagram, Menu, Play, Wrench } from 'lucide-react';

export default function App() {
  const [lang, setLang] = useState('AM');
  const [theme, setTheme] = useState('dark');
  const [showBooking, setShowBooking] = useState(false);
  const [activeVideo, setActiveVideo] = useState(null);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [activeFaq, setActiveFaq] = useState(null);
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);
  const canvasRef = useRef(null);

  const navIds = ["Projects", "Process", "Team", "FAQ", "About"];

  const t = {
    EN: {
      hero: "Engineering High-Performance Systems for Global Scale.",
      sub: "Tova Software Solutions turns complex business challenges into seamless digital products.",
      nav: ["Projects", "Process", "Team", "FAQ", "About"],
      book: "Contact Us",
      stats: ["120+ Projects", "25M+ Users", "99.99% Uptime"],
      processTitle: "Our Engineering Process",
      process: [
        { title: "Discovery", desc: "Understanding your business logic and user needs.", icon: <Search size={20} /> },
        { title: "Architecture", desc: "Designing robust, scalable system blueprints.", icon: <Layers size={20} /> },
        { title: "Development", desc: "Agile sprints with continuous integration.", icon: <Code size={20} /> },
        { title: "Launch", desc: "Deployment and 24/7 performance monitoring.", icon: <Rocket size={20} /> }
      ],
      skillsTitle: "Technical Expertise",
      skills: [
        { name: "Backend Architecture", level: "95%" },
        { name: "Cloud Infrastructure", level: "90%" },
        { name: "AI & Machine Learning", level: "85%" },
        { name: "Cybersecurity", level: "92%" },
        { name: "React / Next.js", level: "95%" },
        { name: "Flutter", level: "90%" },
        { name: "Node.js", level: "92%" },
        { name: "Python", level: "85%" }
      ],
      teamTitle: "The Minds Behind Tova",
      team: [
        { name: "Dawit Abraham", role: "Lead Architect", bio: "Ex-Google engineer specializing in distributed systems.", icon: <Cpu size={30} /> },
        { name: "Sara Tekle", role: "UI/UX Director", bio: "Creating human-centric interfaces for complex data.", icon: <Layout size={30} /> },
        { name: "Yonas Kassa", role: "Security Lead", bio: "Expert in zero-trust architecture and cryptography.", icon: <Shield size={30} /> }
      ],
      trustTitle: "Trusted by Global Leaders",
      faqTitle: "Frequently Asked Questions",
      faqs: [
        { q: "How long does a typical project take?", a: "MVP development usually takes 8-12 weeks, while enterprise-grade systems can range from 4-8 months depending on complexity." },
        { q: "What tech stack do you use?", a: "We specialize in React/Next.js, Node.js, Python (Django/FastAPI), and Go, hosted on AWS or Azure for maximum scalability." },
        { q: "Do you offer post-launch support?", a: "Yes, we provide 24/7 maintenance and security updates to ensure your system remains performant as you scale." }
      ],
      newsTitle: "Join the Inner Circle",
      newsSub: "Get quarterly engineering insights and tech trends.",
      newsPlaceholder: "Enter your email",
      newsBtn: "Subscribe",
      newsSuccess: "Welcome to the loop!",
      galleryTitle: "Our Current Projects",
      projects: [
        { title: "Medavor Mobile App", cat: "Health", desc: "Connects users with pharmacies for real-time chat and prescription management.", icon: <Smartphone size={24} />, video: "https://drive.google.com/file/d/1pyfv8ZwSmbsl_G4zSv_cW2rSlR3YqIsm/preview" },
        { title: "Nexo Mobile App", cat: "Service", desc: "Connects users with mobile & PC technicians for real-time troubleshooting.", icon: <Wrench size={24} />, video: "https://drive.google.com/file/d/1RaZq7XkxiCQJREbfgMwI5leO8YJa6Ih-/preview" }
      ],
      footer: {
        tagline: "Building the digital backbone of modern enterprises.",
        links: "Quick Links",
        legal: "Legal",
        rights: "All rights reserved."
      }
    },
    AM: {
      hero: "ለአለም አቀፍ ደረጃ ከፍተኛ አፈፃፀም ያላቸውን ሲስተሞች እንገነባለን።",
      sub: "ቶቫ የሶፍትዌር መፍትሄዎች ውስብስብ የንግድ ፈተናዎችን ወደ ዘመናዊ ዲጂታል ምርቶች ይቀይራል።",
      nav: ["ፕሮጀክቶች", "ሂደት", "ቡድን", "ጥያቄዎች", "ስለ እኛ"],
      book: "ያግኙን",
      stats: ["120+ ፕሮጀክቶች", "25M+ ተጠቃሚዎች", "99.99% አስተማማኝነት"],
      processTitle: "የእኛ የሥራ ሂደት",
      process: [
        { title: "ጥናት", desc: "የንግድዎን አመክንዮ እና የተጠቃሚ ፍላጎቶችን መረዳት።", icon: <Search size={20} /> },
        { title: "አርክቴክቸር", desc: "ጠንካራ እና መጠነ-ሰፊ የሲስተም ንድፎችን ማውጣት።", icon: <Layers size={20} /> },
        { title: "ግንባታ", desc: "ቀጣይነት ያለው የኮድ ግንባታ እና ሙከራ።", icon: <Code size={20} /> },
        { title: "ምረቃ", desc: "ሲስተሙን ስራ ላይ ማዋል እና ክትትል ማድረግ።", icon: <Rocket size={20} /> }
      ],
      skillsTitle: "የቴክኒክ ብቃት",
      skills: [
        { name: "ባክኤንድ አርክቴክቸር", level: "95%" },
        { name: "ክላውድ ኢንፍራስትራክቸር", level: "90%" },
        { name: "AI እና ማሽን ለርኒንግ", level: "85%" },
        { name: "የሳይበር ደህንነት", level: "92%" },
        { name: "ሪአክት / ኔክስት ጄ.ኤስ", level: "95%" },
        { name: "ፍላተር", level: "90%" },
        { name: "ኖድ ጄ.ኤስ", level: "92%" },
        { name: "ፓይተን", level: "85%" }
      ],
      teamTitle: "ከቶቫ ጀርባ ያሉ ባለሙያዎች",
      team: [
        { name: "ዳዊት አብርሃም", role: "ዋና አርክቴክት", bio: "ውስብስብ ሲስተሞች ላይ ልምድ ያለው የቀድሞ የጎግል መሃንዲስ።", icon: <Cpu size={30} /> },
        { name: "ሳራ ተክሌ", role: "የዲዛይን ዳይሬክተር", bio: "ለሰው ተስማሚ የሆኑ የዲጂታል ገጽታዎችን የምትፈጥር።", icon: <Layout size={30} /> },
        { name: "ዮናስ ካሳ", role: "የደህንነት መሪ", bio: "በሳይበር ደህንነት እና በክሪፕቶግራፊ ላይ ከፍተኛ ልምድ ያለው።", icon: <Shield size={30} /> }
      ],
      trustTitle: "የታመንንባቸው ተቋማት",
      faqTitle: "ተደጋግመው የሚጠየቁ ጥያቄዎች",
      faqs: [
        { q: "አንድ ፕሮጀክት ምን ያህል ጊዜ ይወስዳል?", a: "የMVP ግንባታ ብዙውን ጊዜ ከ8-12 ሳምንታት ይወስዳል፣ ትላልቅ ሲስተሞች ደግሞ እንደ ውስብስብነታቸው ከ4-8 ወራት ሊወስዱ ይችላሉ።" },
        { q: "ምን ዓይነት ቴክኖሎጂዎችን ትጠቀማላችሁ?", a: "React/Next.js, Node.js, Python እና Go ላይ እንሰራለን። ለጥንካሬ ደግሞ AWS ወይም Azure እንጠቀማለን።" },
        { q: "ከምረቃ በኋላ ድጋፍ ትሰጣላችሁ?", a: "አዎ፣ ሲስተምዎ ሁል ጊዜ በትክክል መስራቱን ለማረጋገጥ የ24/7 የጥገና እና የደህንነት ክትትል እናደርጋለን።" }
      ],
      newsTitle: "የቴክኖሎጂ መረጃዎች ይድረሱዎት",
      newsSub: "በየሩብ ዓመቱ የምህንድስና ግንዛቤዎችን እና የቴክኖሎጂ አዝማሚያዎችን ያግኙ።",
      newsPlaceholder: "ኢሜልዎን ያስገቡ",
      newsBtn: "ይመዝገቡ",
      newsSuccess: "በተሳካ ሁኔታ ተመዝግበዋል!",
      galleryTitle: "የአሁኑ ፕሮጀክቶቻችን",
      projects: [
        { title: "ሜዳቮር መተግበሪያ", cat: "ጤና", desc: "ተጠቃሚዎችን ከመድኃኒት ቤቶች ጋር የሚያገናኝ እና የሐኪም ማዘዣዎችን ለማየት የሚያስችል መተግበሪያ።", icon: <Smartphone size={24} />, video: "https://drive.google.com/file/d/1pyfv8ZwSmbsl_G4zSv_cW2rSlR3YqIsm/preview" },
        { title: "ኔክሶ መተግበሪያ", cat: "አገልግሎት", desc: "ተጠቃሚዎችን ከሞባይል እና ኮምፒውተር ባለሙያዎች ጋር የሚያገናኝ መተግበሪያ።", icon: <Wrench size={24} />, video: "https://drive.google.com/file/d/1RaZq7XkxiCQJREbfgMwI5leO8YJa6Ih-/preview" }
      ],
      footer: {
        tagline: "ለዘመናዊ ድርጅቶች የዲጂታል የጀርባ አጥንት እንገነባለን።",
        links: "ፈጣን ሊንኮች",
        legal: "ህጋዊ",
        rights: "መብቱ በህግ የተጠበቀ ነው።"
      }
    }
  }[lang];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let pts = Array.from({ length: 50 }, () => ({
      x: Math.random() * window.innerWidth, y: Math.random() * window.innerHeight,
      vX: (Math.random() - 0.5) * 0.5, vY: (Math.random() - 0.5) * 0.5,
      size: Math.random() * 2 + 1
    }));
    const anim = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = theme === 'dark' ? 'rgba(59, 130, 246, 0.5)' : 'rgba(37, 99, 235, 0.4)';
      pts.forEach(p => {
        ctx.beginPath(); ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2); ctx.fill();
        p.x += p.vX; p.y += p.vY;
        if (p.x < 0 || p.x > canvas.width) p.vX *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vY *= -1;
      });
      requestAnimationFrame(anim);
    };
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', handleResize);
    handleResize();
    anim();
    return () => window.removeEventListener('resize', handleResize);
  }, [theme]);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  const handleBooking = (e) => {
    e.preventDefault();
    setShowBooking(false);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 4000);
  };

  return (
    <>
      <div className="bg-gradient-blob blob-1"></div>
      <div className="bg-gradient-blob blob-2"></div>
      <canvas ref={canvasRef} id="bg-canvas" style={{ position: 'fixed', top: 0, left: 0, zIndex: -1 }} />

      {/* --- NAVBAR --- */}
      <nav className="navbar">
        <a href="#" className="nav-brand" style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{ width: '50px', height: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', borderRadius: '50%' }}>
            <img src="/logo.png" alt="TOVA Logo" style={{ width: '100%', height: '100%', objectFit: 'cover', transform: 'scale(1.4)' }} />
          </div>
        </a>
        <div className="nav-links">
          {t.nav.map((item, i) => <a key={i} href={`#${navIds[i]}`} className="nav-link">{item}</a>)}
        </div>
        <div className="nav-actions">
          <button onClick={toggleTheme} className="btn btn-ghost">{theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}</button>
          <button onClick={() => setLang(lang === 'EN' ? 'AM' : 'EN')} className="btn btn-ghost" style={{ fontWeight: '800', fontSize: '0.8rem' }}>{lang === 'EN' ? 'አማ' : 'EN'}</button>
          <button className="btn btn-primary" onClick={() => setShowBooking(true)} style={{ display: 'none', '@media (min-width: 768px)': { display: 'flex' } }}>{t.book}</button>
          <button className="mobile-menu-btn" onClick={() => setShowMobileMenu(true)}><Menu size={24} /></button>
        </div>
      </nav>

      {/* --- MOBILE MENU --- */}
      <div className={`mobile-menu-overlay ${showMobileMenu ? 'open' : ''}`}>
        <button className="mobile-menu-btn" style={{ position: 'absolute', top: '20px', right: '20px' }} onClick={() => setShowMobileMenu(false)}><X size={32} /></button>
        {t.nav.map((item, i) => (
          <a key={i} href={`#${navIds[i]}`} className="mobile-link" onClick={() => setShowMobileMenu(false)}>{item}</a>
        ))}
        <button className="btn btn-primary" onClick={() => { setShowMobileMenu(false); setShowBooking(true); }}>{t.book}</button>
      </div>

      <div className="container">
        {/* --- HERO --- */}
        <section className="hero-section">
          <div className="hero-content fade-in">
            <div className="hero-badge"><Sparkles size={14} /> {lang === 'EN' ? 'Next-Gen Engineering' : 'ዘመናዊ የምህንድስና መፍትሄዎች'}</div>
            <h1 className="gradient-text" style={{ fontSize: 'clamp(3rem, 5vw, 4.5rem)', marginBottom: '24px' }}>{t.hero}</h1>
            <p style={{ fontSize: '1.25rem', marginBottom: '40px', maxWidth: '600px' }}>{t.sub}</p>
            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
              <button className="btn btn-primary" onClick={() => setShowBooking(true)}>{t.book} <ArrowRight size={18} /></button>
              <button className="btn btn-ghost" onClick={() => document.getElementById('Projects').scrollIntoView()}>{lang === 'EN' ? 'View Work' : 'ስራዎቻችን'}</button>
            </div>
          </div>
        </section>

        {/* --- STATS --- */}
        <section className="card-grid" style={{ marginTop: '0px', marginBottom: '100px' }}>
          {t.stats.map((s, i) => (
            <div key={i} className="glass-card" style={{ textAlign: 'center', padding: '40px 20px' }}>
              <h2 className="gradient-text" style={{ fontSize: '3rem', marginBottom: '8px' }}>{s.split(' ')[0]}</h2>
              <p style={{ textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.85rem', fontWeight: '600' }}>{s.split(' ')[1]}</p>
            </div>
          ))}
        </section>

        {/* --- LOGO CLOUD --- */}
        <section style={{ padding: '60px 0', textAlign: 'center', opacity: 0.6 }}>
          <p style={{ textTransform: 'uppercase', letterSpacing: '3px', fontSize: '0.75rem', marginBottom: '40px', fontWeight: '700', color: 'var(--primary)' }}>{t.trustTitle}</p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '40px', flexWrap: 'wrap', fontWeight: '800', fontSize: '1.2rem' }}>
            {['EthioTelecom', 'CBE', 'Dashen', 'Abyssinia', 'Zemen', 'Telebirr'].map((logo, i) => (
              <span key={i}>{logo}</span>
            ))}
          </div>
        </section>

        {/* --- SKILLS --- */}
        <section style={{ padding: '100px 0' }}>
          <div className="card-grid">
            <div>
              <h2 style={{ fontSize: '2.5rem', marginBottom: '24px' }}>{t.skillsTitle}</h2>
              <p style={{ marginBottom: '40px', maxWidth: '400px' }}>We master the tools that power the future.</p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {t.skills.map((skill, i) => (
                <div key={i}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontWeight: '600' }}>
                    <span>{skill.name}</span>
                    <span style={{ color: 'var(--primary)' }}>{skill.level}</span>
                  </div>
                  <div style={{ width: '100%', height: '8px', background: 'var(--glass)', borderRadius: '4px', overflow: 'hidden' }}>
                    <div style={{ width: skill.level, height: '100%', background: 'var(--primary)', borderRadius: '4px' }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* --- PROCESS --- */}
        <section id="Process" style={{ padding: '100px 0' }}>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '60px', textAlign: 'center' }}>{t.processTitle}</h2>
          <div className="card-grid">
            {t.process.map((step, i) => (
              <div key={i} className="glass-card">
                <div style={{ color: 'var(--primary)', marginBottom: '24px' }}>{step.icon}</div>
                <h4 style={{ fontSize: '1.25rem', marginBottom: '12px' }}>{step.title}</h4>
                <p>{step.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* --- TEAM --- */}
        <section id="Team" style={{ padding: '100px 0' }}>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '60px', textAlign: 'center' }}>{t.teamTitle}</h2>
          <div className="card-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
            {t.team.map((member, i) => (
              <div key={i} className="glass-card" style={{ textAlign: 'center' }}>
                <div style={{ width: '100px', height: '100px', borderRadius: '50%', background: 'var(--bg)', margin: '0 auto 24px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--border)', color: 'var(--primary)' }}>
                  {member.icon}
                </div>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '4px' }}>{member.name}</h3>
                <p style={{ color: 'var(--primary)', fontWeight: '600', fontSize: '0.9rem', marginBottom: '16px' }}>{member.role}</p>
                <p style={{ fontSize: '0.95rem' }}>{member.bio}</p>
              </div>
            ))}
          </div>
        </section>

        {/* --- FAQ --- */}
        <section id="FAQ" style={{ padding: '100px 0' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '40px', textAlign: 'center' }}>{t.faqTitle}</h2>
            {t.faqs.map((f, i) => (
              <div key={i} className="glass-card" style={{ padding: '0', marginBottom: '16px', cursor: 'pointer' }} onClick={() => setActiveFaq(activeFaq === i ? null : i)}>
                <div style={{ padding: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h4 style={{ fontSize: '1.1rem' }}>{f.q}</h4>
                  {activeFaq === i ? <Minus size={20} /> : <Plus size={20} />}
                </div>
                {activeFaq === i && <div style={{ padding: '0 24px 24px', borderTop: '1px solid var(--border)', paddingTop: '24px', color: 'var(--text-muted)' }}>{f.a}</div>}
              </div>
            ))}
          </div>
        </section>

        {/* --- ABOUT --- */}
        <section id="About" style={{ padding: '100px 0', display: 'flex', alignItems: 'center', gap: '60px', flexDirection: 'column', textAlign: 'center' }}>
          <div className="hero-badge" style={{ marginBottom: '0' }}><Globe size={14} /> {lang === 'EN' ? 'Global Vision' : 'ዓለም አቀፍ እይታ'}</div>
          <h2 style={{ fontSize: '2.5rem', maxWidth: '800px' }}>
            {lang === 'EN'
              ? "We are a collective of forward-thinking engineers dedicated to solving the hardest problems in software."
              : "እኛ ለሶፍትዌር ችግሮች መፍትሄ ለማፈላለግ የተሰባሰብን መሃንዲሶች ነን።"}
          </h2>
          <p style={{ maxWidth: '700px', fontSize: '1.1rem' }}>
            {lang === 'EN'
              ? "Founded in 2026, Tova has quickly become a beacon of technical excellence in East Africa. We don't just build apps; we engineer resilient ecosystems that empower businesses to thrive in the digital age."
              : "እ.ኤ.አ. በ 2026 የተመሰረተው ቶቫ በአጭር ጊዜ ውስጥ በምስራቅ አፍሪካ የቴክኖሎጂ ብቃት ማረጋገጫ ሆኗል። እኛ መተግበሪያዎችን ብቻ አንሰራም፤ የንግድ ድርጅቶች በዲጂታል ዘመን እንዲበለጽጉ የሚያስችሉ ጠንካራ ስርዓቶችን እንገነባለን።"}
          </p>
        </section>

        {/* --- PROJECTS --- */}
        <section id="Projects" style={{ padding: '100px 0' }}>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '60px' }}>{t.galleryTitle}</h2>
          <div className="card-grid">
            {t.projects.map((proj, idx) => (
              <div key={idx} className="glass-card">
                <div style={{ padding: '12px', background: 'var(--glass)', borderRadius: '12px', width: 'fit-content', marginBottom: '24px', color: 'var(--primary)' }}>{proj.icon}</div>
                <span style={{ fontSize: '0.75rem', fontWeight: '700', letterSpacing: '1px', color: 'var(--accent)', textTransform: 'uppercase' }}>{proj.cat}</span>
                <h3 style={{ fontSize: '1.5rem', margin: '12px 0' }}>{proj.title}</h3>
                <p>{proj.desc}</p>
                <button
                  onClick={() => setActiveVideo(proj.video)}
                  className="btn btn-primary"
                  style={{ marginTop: '24px', width: '100%', justifyContent: 'center' }}
                >
                  <Play size={18} fill="currentColor" /> Watch Demo
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* --- NEWSLETTER --- */}
        <section style={{ padding: '100px 0', display: 'flex', justifyContent: 'center' }}>
          <div className="glass-card" style={{ textAlign: 'center', maxWidth: '600px', width: '100%' }}>
            <h2 style={{ fontSize: '2rem', marginBottom: '16px' }}>{t.newsTitle}</h2>
            <p style={{ marginBottom: '32px' }}>{t.newsSub}</p>
            {newsletterSubscribed ? (
              <div className="fade-in" style={{ color: 'var(--accent)', fontWeight: '700', fontSize: '1.2rem' }}>{t.newsSuccess}</div>
            ) : (
              <form onSubmit={(e) => { e.preventDefault(); setNewsletterSubscribed(true) }} style={{ display: 'flex', gap: '12px', flexDirection: 'column' }}>
                <input type="email" placeholder={t.newsPlaceholder} className="input-field" style={{ marginBottom: '0' }} required />
                <button className="btn btn-primary" style={{ width: '100%' }}>{t.newsBtn}</button>
              </form>
            )}
          </div>
        </section>

        {/* --- FOOTER --- */}
        <footer style={{ borderTop: '1px solid var(--border)', padding: '80px 0 40px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '40px', marginBottom: '60px' }}>
            <div style={{ maxWidth: '300px' }}>
              <div style={{ marginBottom: '16px', width: '60px', height: '60px', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%' }}>
                <img src="/logo.png" alt="TOVA Logo" style={{ width: '100%', height: '100%', objectFit: 'cover', transform: 'scale(1.4)' }} />
              </div>
              <p style={{ fontSize: '0.9rem' }}>{t.footer.tagline}</p>
            </div>
            <div>
              <h4 style={{ marginBottom: '24px' }}>{t.footer.links}</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {t.nav.map((item, i) => <a key={i} href={`#${navIds[i]}`} style={{ textDecoration: 'none', color: 'var(--text-muted)', fontSize: '0.9rem' }}>{item}</a>)}
              </div>
            </div>
            <div>
              <h4 style={{ marginBottom: '24px' }}>{t.footer.legal}</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <a href="#" style={{ textDecoration: 'none', color: 'var(--text-muted)', fontSize: '0.9rem' }}>Privacy Policy</a>
                <a href="#" style={{ textDecoration: 'none', color: 'var(--text-muted)', fontSize: '0.9rem' }}>Terms of Service</a>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
              {[Linkedin, Github, Twitter, Mail].map((Icon, i) => (
                <div key={i} style={{ padding: '10px', background: 'var(--glass)', borderRadius: '12px', cursor: 'pointer', transition: '0.2s', border: '1px solid var(--border)' }}>
                  <Icon size={20} />
                </div>
              ))}
            </div>
          </div>
          <div style={{ textAlign: 'center', paddingTop: '40px', borderTop: '1px solid var(--border)', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            © 2026 Tova Software Solutions. {t.footer.rights}
          </div>
        </footer>

      </div>

      {/* --- MODAL --- */}
      {showBooking && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(8px)', zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <div className="glass-card" style={{ width: '100%', maxWidth: '500px', animation: 'fadeIn 0.3s ease' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px' }}>
              <h2>{t.book}</h2>
              <X onClick={() => setShowBooking(false)} style={{ cursor: 'pointer' }} />
            </div>
            {showSuccess ? (
              <div style={{ textAlign: 'center', padding: '40px 0' }}>
                <CheckCircle2 size={64} color="var(--accent)" style={{ margin: '0 auto 24px' }} />
                <CheckCircle2 size={64} color="var(--accent)" style={{ margin: '0 auto 24px' }} />
                <h3>Inquiry Received</h3>
                <p>Our team will review your requirements and respond within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleBooking} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <input placeholder="Full Name" className="input-field" required style={{ marginBottom: 0 }} />
                  <input placeholder="Company Name" className="input-field" style={{ marginBottom: 0 }} />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <input type="email" placeholder="Email Address" className="input-field" required style={{ marginBottom: 0 }} />
                  <input type="tel" placeholder="Phone Number" className="input-field" required style={{ marginBottom: 0 }} />
                </div>
                <textarea placeholder="Project Details & Requirements..." className="input-field" style={{ height: '120px', marginBottom: 0 }} required />
                <button className="btn btn-primary" style={{ marginTop: '8px' }}>{lang === 'EN' ? 'Send Message' : 'መልዕክት ይላኩ'}</button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* --- VIDEO MODAL --- */}
      {activeVideo && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.9)', zIndex: 3000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <div style={{ position: 'relative', width: '100%', maxWidth: '900px', aspectRatio: '16/9', background: 'black', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 0 40px rgba(59, 130, 246, 0.3)' }}>
            <button onClick={() => setActiveVideo(null)} style={{ position: 'absolute', top: '16px', right: '16px', zIndex: 10, background: 'rgba(0,0,0,0.5)', color: 'white', border: 'none', borderRadius: '50%', padding: '8px', cursor: 'pointer' }}>
              <X size={24} />
            </button>
            <iframe
              src={activeVideo}
              style={{ width: '100%', height: '100%', border: 'none' }}
              allow="autoplay; encrypted-media"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}
    </>
  );
}