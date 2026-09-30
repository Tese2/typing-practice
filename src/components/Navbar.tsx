import { Activity, BookOpen, House, Info, Keyboard, Menu, Settings as SettingsIcon, X } from 'lucide-react'
import { useState } from 'react'

const links = [
  { href: '/', label: 'Home', icon: House },
  { href: '/practice', label: 'Practice', icon: Keyboard },
  { href: '/lessons', label: 'Lessons', icon: BookOpen },
  { href: '/history', label: 'History', icon: Activity },
  { href: '/statistics', label: 'Statistics', icon: Activity },
  { href: '/settings', label: 'Settings', icon: SettingsIcon },
  { href: '/about', label: 'About', icon: Info },
]

interface NavbarProps { page: string; navigate: (path: string) => void }

export function Navbar({ page, navigate }: NavbarProps) {
  const [open, setOpen] = useState(false)
  const visit = (event: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    event.preventDefault()
    setOpen(false)
    navigate(path)
  }

  return <header className="site-header">
    <div className="nav-wrap">
      <a className="brand" href="/" onClick={(event) => visit(event, '/')} aria-label="Keynote home"><span className="brand-mark"><Keyboard size={18} /></span><span>keynote<span className="brand-dot">.</span></span></a>
      <button className="mobile-menu" aria-label={open ? 'Close navigation' : 'Open navigation'} aria-expanded={open} onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
      <nav className={open ? 'primary-nav is-open' : 'primary-nav'} aria-label="Main navigation">
        {links.map(({ href, label, icon: Icon }) => <a key={href} href={href} onClick={(event) => visit(event, href)} className={`nav-link ${page === href ? 'active' : ''}`}><Icon size={15} /><span>{label}</span></a>)}
        <a href="/practice" onClick={(event) => visit(event, '/practice')} className="button button-dark nav-cta">Start practice <span aria-hidden="true">↗</span></a>
      </nav>
    </div>
  </header>
}