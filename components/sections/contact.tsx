import Link from 'next/link';
import { ContactForm } from '@/components/contact/ContactForm';
import './contact-form.css';

export function Contact({ compact = false }: { compact?: boolean }) {
  return <section className={`section contact-panel contact-panel--project${compact ? ' contact-panel--compact' : ''}`} id="contact"><div className="container contact-layout">
    <div className="contact-intro"><span className="eyebrow">A good place to begin</span><h2 className="display section-title">Start your<br />project.</h2><p className="section-copy">Tell us about the space, your plans and what you hope it could become. We’ll begin with a thoughtful conversation.</p><div className="contact-detail"><span className="eyebrow">Visit us</span><p><strong>Kharadi, Pune</strong><br /><a href="mailto:rupali.pawankar13@gmail.com">rupali.pawankar13@gmail.com</a><br /><a href="tel:+919822301090">+91 98223 01090</a><br /><a href="tel:+918668683792">+91 86686 83792</a></p></div></div>
    {compact ? <div className="contact-compact-cta"><span>Have a project in mind?</span><p>Share a few details and start a conversation with our studio.</p><Link href="/contact" className="contact-compact-cta__link">TELL US ABOUT YOUR PROJECT <span>↗</span></Link></div> : <ContactForm />}
  </div></section>;
}

export function ContactPage() {
  return <><header className="page-hero"><div className="container"><span className="eyebrow">Start a conversation</span><h1 className="display">Every good home<br />starts somewhere.</h1><p>Tell us where you are in the process. Whether you have a clear brief or only the beginning of an idea, we’d love to hear about it.</p></div></header><Contact /></>;
}
