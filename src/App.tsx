/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Menu, 
  X, 
  ChevronRight, 
  ArrowRight, 
  CheckCircle2, 
  Users, 
  BarChart3, 
  Settings, 
  Music, 
  Heart,
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Twitter,
  Instagram,
  Search
} from 'lucide-react';

// --- Types ---
type Page = 'home' | 'about' | 'artist-management' | 'services' | 'contact' | 'blog' | 'privacy' | 'terms' | 'cookies' | 'blog-post';

interface BlogPost {
  id: string;
  title: string;
  category: string;
  date: string;
  image: string;
  excerpt: string;
  content: React.ReactNode;
}

// --- Components ---

const Logo = ({ light = false, size = 'md' }: { light?: boolean, size?: 'sm' | 'md' }) => {
  const isSmall = size === 'sm';
  return (
    <div className="flex flex-col items-center">
      <div className="flex items-center leading-none">
        <span className={`${isSmall ? 'text-xl' : 'text-3xl'} font-serif font-bold tracking-tight ${light ? 'text-white' : 'text-brand-purple'}`}>CHAPTER</span>
        <span className={`${isSmall ? 'text-2xl' : 'text-4xl'} font-serif font-bold tracking-tight text-brand-orange ml-2`}>2</span>
      </div>
      <div className={`${isSmall ? 'text-[7px]' : 'text-[11px]'} font-sans font-bold tracking-[0.25em] mt-0.5 ${light ? 'text-slate-300' : 'text-brand-purple'}`}>
        CONSULTING INC.
      </div>
      <div className={`${isSmall ? 'w-10 h-0.5' : 'w-14 h-1'} bg-brand-orange mt-1`}></div>
    </div>
  );
};

const Navbar = ({ currentPage, setCurrentPage }: { currentPage: Page, setCurrentPage: (p: Page) => void }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems: { label: string; id: Page }[] = [
    { label: 'Home', id: 'home' },
    { label: 'About', id: 'about' },
    { label: 'Artist Management', id: 'artist-management' },
    { label: 'Services', id: 'services' },
    { label: 'Blog', id: 'blog' },
    { label: 'Contact', id: 'contact' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <div 
          className="cursor-pointer mr-8 lg:mr-0"
          onClick={() => setCurrentPage('home')}
        >
          <Logo size="sm" />
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center lg:space-x-8 md:space-x-4">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setCurrentPage(item.id)}
              className={`text-sm font-medium transition-colors hover:text-brand-orange whitespace-nowrap ${
                currentPage === item.id ? 'text-brand-orange border-b-2 border-brand-orange' : isScrolled ? 'text-slate-700' : 'text-slate-800'
              }`}
            >
              {item.label}
            </button>
          ))}
          <button 
            onClick={() => setCurrentPage('contact')}
            className="bg-brand-orange text-white px-4 lg:px-6 py-2.5 rounded-sm text-sm font-semibold hover:bg-brand-orange-light transition-all shadow-lg shadow-brand-orange/20 whitespace-nowrap ml-4"
          >
            Book a Consultation
          </button>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-slate-800" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-white shadow-xl border-t border-slate-100 md:hidden"
          >
            <div className="flex flex-col p-6 space-y-4">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setCurrentPage(item.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`text-left text-lg font-medium ${currentPage === item.id ? 'text-brand-orange' : 'text-slate-700'}`}
                >
                  {item.label}
                </button>
              ))}
              <button 
                onClick={() => {
                  setCurrentPage('contact');
                  setIsMobileMenuOpen(false);
                }}
                className="bg-brand-orange text-white px-6 py-3 rounded-sm text-center font-semibold"
              >
                Book a Consultation
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Footer = ({ setCurrentPage }: { setCurrentPage: (p: Page) => void }) => (
  <footer className="bg-brand-purple-dark text-white pt-20 pb-10">
    <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
      <div className="col-span-1 md:col-span-1">
        <div className="mb-8 flex justify-start cursor-pointer" onClick={() => setCurrentPage('home')}>
          <Logo light />
        </div>
        <p className="text-slate-400 text-sm leading-relaxed mb-6">
          Empowering small businesses and creative professionals to navigate change and achieve sustainable growth through strategic consulting and management.
        </p>
        <div className="flex space-x-4">
          <a href="#" className="text-slate-400 hover:text-brand-orange transition-colors"><Linkedin size={20} /></a>
          <a href="#" className="text-slate-400 hover:text-brand-orange transition-colors"><Twitter size={20} /></a>
          <a href="#" className="text-slate-400 hover:text-brand-orange transition-colors"><Instagram size={20} /></a>
        </div>
      </div>
      
      <div>
        <h4 className="text-lg font-serif font-bold mb-6">Services</h4>
        <ul className="space-y-3 text-slate-400 text-sm">
          <li><button onClick={() => setCurrentPage('services')} className="hover:text-white transition-colors">Business Strategy</button></li>
          <li><button onClick={() => setCurrentPage('services')} className="hover:text-white transition-colors">Operations Optimization</button></li>
          <li><button onClick={() => setCurrentPage('services')} className="hover:text-white transition-colors">Creative Consulting</button></li>
          <li><button onClick={() => setCurrentPage('artist-management')} className="hover:text-white transition-colors">Artist Management</button></li>
        </ul>
      </div>

      <div>
        <h4 className="text-lg font-serif font-bold mb-6">Company</h4>
        <ul className="space-y-3 text-slate-400 text-sm">
          <li><button onClick={() => setCurrentPage('about')} className="hover:text-white transition-colors">About Us</button></li>
          <li><button onClick={() => setCurrentPage('about')} className="hover:text-white transition-colors">Our Approach</button></li>
          <li><button onClick={() => setCurrentPage('blog')} className="hover:text-white transition-colors">Case Studies</button></li>
        </ul>
      </div>

      <div>
        <h4 className="text-lg font-serif font-bold mb-6">Contact</h4>
        <ul className="space-y-4 text-slate-400 text-sm">
          <li className="flex items-start space-x-3">
            <MapPin size={18} className="text-brand-orange shrink-0" />
            <span>Address TBD<br />New York, NY</span>
          </li>
          <li className="flex items-center space-x-3">
            <Phone size={18} className="text-brand-orange shrink-0" />
            <a href="tel:5163780040" className="hover:text-white transition-colors">516-378-0040</a>
          </li>
          <li className="flex items-center space-x-3">
            <Mail size={18} className="text-brand-orange shrink-0" />
            <a href="mailto:info@chapter2consulting.com" className="hover:text-white transition-colors">info@chapter2consulting.com</a>
          </li>
        </ul>
      </div>
    </div>
    <div className="max-w-7xl mx-auto px-6 mt-20 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-slate-500 text-xs">
      <p>© 2026 Chapter 2 Consulting Inc. All rights reserved.</p>
      <div className="flex space-x-6 mt-4 md:mt-0">
        <button onClick={() => setCurrentPage('privacy')} className="hover:text-white transition-colors">Privacy Policy</button>
        <button onClick={() => setCurrentPage('terms')} className="hover:text-white transition-colors">Terms of Service</button>
        <button onClick={() => setCurrentPage('cookies')} className="hover:text-white transition-colors">Cookie Policy</button>
      </div>
    </div>
  </footer>
);

// --- Page Sections ---

const HomePage = ({ onNavigate }: { onNavigate: (p: Page) => void }) => (
  <div className="pt-20">
    {/* Hero */}
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-slate-50">
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=2000" 
          alt="Modern Office" 
          className="w-full h-full object-cover opacity-20"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-6xl md:text-7xl font-serif font-bold text-slate-900 leading-[1.1] mb-6">
            Change is inevitable. <br />
            <span className="text-brand-purple italic">Strategy</span> makes it profitable.
          </h1>
          <p className="text-xl text-slate-600 mb-10 max-w-lg leading-relaxed">
            I partner with small business owners and creative professionals to shift direction, refine their brand, and create strategies that support long-term success.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button 
              onClick={() => onNavigate('contact')}
              className="bg-brand-orange text-white px-8 py-4 rounded-sm font-bold text-lg hover:bg-brand-orange-light transition-all flex items-center justify-center group"
            >
              Schedule a Strategy Call
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </button>
            <button 
              onClick={() => onNavigate('services')}
              className="bg-white text-slate-900 border border-slate-200 px-8 py-4 rounded-sm font-bold text-lg hover:bg-slate-50 transition-all flex items-center justify-center"
            >
              Explore Services
            </button>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="hidden lg:block relative"
        >
          <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl border-8 border-white">
            <img 
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1000" 
              alt="Diverse Strategic Team" 
              className="w-full h-auto"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-brand-orange/10 rounded-full blur-3xl -z-10"></div>
        </motion.div>
      </div>
    </section>

    {/* Core Pillars */}
    <section className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">Smart Pivots Build Strong Businesses</h2>
          <p className="text-lg text-slate-600">We take a holistic approach to business challenges, examining your processes, strategy, and structure to deliver long-term growth solutions.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "Business Strategy",
              desc: "Comprehensive roadmaps for growth, market positioning, and competitive advantage.",
              icon: <BarChart3 className="text-brand-purple" size={32} />
            },
            {
              title: "Operational Efficiency",
              desc: "Streamlining workflows and optimizing resources to increase your bottom line.",
              icon: <Settings className="text-brand-purple" size={32} />
            },
            {
              title: "Artist Management",
              desc: "Dedicated support for emerging talent, from brand building to career sustainability.",
              icon: <Music className="text-brand-purple" size={32} />
            }
          ].map((item, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -10 }}
              className="bg-white p-10 rounded-xl shadow-sm border border-slate-100 hover:shadow-xl transition-all"
            >
              <div className="w-16 h-16 bg-brand-purple/5 rounded-lg flex items-center justify-center mb-8">
                {item.icon}
              </div>
              <h3 className="text-2xl font-serif font-bold mb-4">{item.title}</h3>
              <p className="text-slate-600 mb-8 leading-relaxed">{item.desc}</p>
              <button className="text-brand-purple font-bold flex items-center group">
                Learn More <ChevronRight className="ml-1 group-hover:translate-x-1 transition-transform" size={18} />
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* eBook Lead Magnet */}
    <section className="py-24 bg-brand-purple text-white overflow-hidden relative">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-brand-orange/5 -skew-x-12 translate-x-1/4"></div>
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h4 className="text-brand-orange font-bold uppercase tracking-[0.3em] text-sm mb-4">Free Resource</h4>
            <h2 className="text-4xl md:text-6xl font-serif font-bold mb-8 leading-tight">Ready, Set, Grow:<br /><span className="italic opacity-80">Your Guide to Starting Right</span></h2>
            <p className="text-xl opacity-80 mb-10 leading-relaxed">
              Stop the "going nowhere" cycle. Our comprehensive guide addresses the beginning stages of starting your business, including the essential dos and don'ts for new entrepreneurs.
            </p>
            <div className="space-y-6 mb-10">
              <div className="flex items-center space-x-4">
                <div className="w-6 h-6 rounded-full bg-brand-orange flex items-center justify-center text-white">
                  <CheckCircle2 size={16} />
                </div>
                <span className="text-lg">Investment of Time vs. Money</span>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-6 h-6 rounded-full bg-brand-orange flex items-center justify-center text-white">
                  <CheckCircle2 size={16} />
                </div>
                <span className="text-lg">Choosing the Right Legal Structure</span>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-6 h-6 rounded-full bg-brand-orange flex items-center justify-center text-white">
                  <CheckCircle2 size={16} />
                </div>
                <span className="text-lg">Building Your Business Credit</span>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="bg-white/10 border border-white/20 px-6 py-4 rounded-sm outline-none focus:bg-white/20 transition-all flex-grow"
              />
              <button className="bg-brand-orange text-white px-8 py-4 rounded-sm font-bold hover:bg-brand-orange-light transition-all shadow-xl shadow-brand-orange/20">
                Get the Free Guide
              </button>
            </div>
            <p className="text-xs opacity-50 mt-4 italic">*By signing up, you'll also join our mailing list for exclusive business insights.</p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative z-10 bg-white p-4 rounded-lg shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-500">
              <img 
                src="https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=1000" 
                alt="Ready Set Grow eBook Cover" 
                className="w-full h-auto rounded shadow-inner"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-brand-purple/90 p-8 text-center border-4 border-brand-orange">
                  <p className="text-brand-orange font-bold tracking-widest text-xs mb-2 uppercase">Chapter 2 Consulting</p>
                  <h3 className="text-3xl font-serif font-bold text-white leading-tight">READY,<br />SET, GROW</h3>
                </div>
              </div>
            </div>
            <div className="absolute -top-10 -right-10 w-64 h-64 bg-brand-orange/20 rounded-full blur-3xl -z-10"></div>
          </motion.div>
        </div>
      </div>
    </section>
  </div>
);

const AboutPage = () => (
  <div className="pt-32 pb-24">
    <div className="max-w-7xl mx-auto px-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
        <div>
          <h1 className="text-5xl md:text-6xl font-serif font-bold mb-8">About Us</h1>
          <div className="space-y-6 text-lg text-slate-600 leading-relaxed">
            <p>
              At <span className="font-bold text-slate-900">Chapter 2 Consulting Inc.</span>, we understand that change isn't always easy. Since 2011, we've been helping small and medium-sized businesses adapt to industry changes, improve operational efficiency, and stay competitive in today's market.
            </p>
            <p>
              We take a <span className="font-bold text-slate-900">holistic business consulting approach</span>. Unlike quick-fix solutions, we analyze the root causes of business challenges—examining your processes, strategy, and structure to deliver long-term growth solutions.
            </p>
            <p>
              Our proven process begins with a comprehensive business audit and intake assessment, enabling us to identify opportunities and create a customized strategic plan.
            </p>
          </div>
        </div>
        <div className="relative">
          <img 
            src="https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=1000" 
            alt="Diverse Professional Team" 
            className="rounded-2xl shadow-2xl"
            referrerPolicy="no-referrer"
          />
          <div className="absolute -bottom-6 -right-6 bg-brand-orange text-white p-8 rounded-xl shadow-xl">
            <p className="text-xl font-serif italic">"To empower small and medium-sized businesses to succeed and thrive."</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="bg-slate-50 p-12 rounded-2xl">
          <h3 className="text-3xl font-serif font-bold mb-6 text-brand-purple">Our Vision</h3>
          <p className="text-lg text-slate-600 italic">
            "To empower small and medium-sized businesses to succeed and thrive, creating a positive impact that strengthens and inspires the communities around them."
          </p>
        </div>
        <div className="bg-slate-50 p-12 rounded-2xl">
          <h3 className="text-3xl font-serif font-bold mb-6 text-brand-purple">Our Mission</h3>
          <p className="text-lg text-slate-600 italic">
            "Our mission is to help small and medium-sized businesses compete successfully with larger competitors by expanding their reach, increasing sales, and leveraging modern tools, resources, and strategic execution."
          </p>
        </div>
      </div>
    </div>
  </div>
);

const ServicesPage = () => (
  <div className="pt-20">
    {/* Sub-Hero */}
    <section className="relative py-32 bg-brand-purple overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <img 
          src="https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&q=80&w=2000" 
          alt="Strategic Consulting" 
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
      </div>
      <div className="max-w-7xl mx-auto px-6 relative z-10 text-white">
        <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6 uppercase tracking-tight">Our Services</h1>
        <p className="text-xl md:text-2xl opacity-90 max-w-2xl font-light">
          Consulting solutions to drive growth and innovation.
        </p>
        <button className="mt-10 bg-brand-orange hover:bg-brand-orange-light text-white px-8 py-4 rounded-sm font-bold transition-all shadow-xl">
          Schedule a Consultation
        </button>
      </div>
    </section>

    {/* Main Content */}
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">Helping Businesses & Creatives Thrive</h2>
          <p className="text-lg text-slate-600">
            At Chapter 2 Consulting, we offer a range of services designed to help both businesses and creative professionals succeed. Whether you're looking to optimize operations or enhance your creative projects, our tailored approach ensures measurable, sustainable results.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
          {[
            { title: "Business Strategy & Growth", icon: <BarChart3 />, desc: "Strengthen your business with strategic insights and operational improvements." },
            { title: "Operations & Process Optimization", icon: <Settings />, desc: "Streamline and enhance your internal processes for greater efficiency." },
            { title: "Creative & Media Consulting", icon: <Music />, desc: "Elevate your creative projects with expert guidance in media and entertainment." },
            { title: "Nonprofit & Social Impact", icon: <Heart />, desc: "Empower your mission-driven initiatives to make a lasting impact." }
          ].map((service, i) => (
            <div key={i} className="bg-slate-50 p-8 rounded-xl border border-slate-100 flex flex-col items-center text-center group hover:bg-white hover:shadow-xl transition-all">
              <div className="w-16 h-16 rounded-full bg-white shadow-sm flex items-center justify-center text-brand-purple mb-6 group-hover:scale-110 transition-transform">
                {service.icon}
              </div>
              <h3 className="text-xl font-serif font-bold mb-4">{service.title}</h3>
              <p className="text-sm text-slate-500 mb-8 leading-relaxed">{service.desc}</p>
              <button className="mt-auto text-brand-purple font-bold text-sm border-b-2 border-brand-purple/20 hover:border-brand-purple transition-all pb-1">Learn More</button>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
          <div className="bg-brand-purple text-white p-12 rounded-2xl flex flex-col justify-center">
            <h4 className="text-brand-orange font-bold uppercase tracking-widest text-sm mb-4">Why Choose Us</h4>
            <h3 className="text-4xl font-serif font-bold mb-8">Strategic Solutions, Measurable Results</h3>
            <ul className="space-y-6">
              {[
                "Proven methodologies that deliver real growth",
                "Over a decade of consulting expertise",
                "Strategies tailored to your unique needs",
                "Holistic approach to business challenges"
              ].map((item, i) => (
                <li key={i} className="flex items-start space-x-4">
                  <CheckCircle2 className="text-brand-orange shrink-0" size={24} />
                  <span className="text-lg opacity-90">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="bg-slate-50 p-12 rounded-2xl">
            <h4 className="text-brand-purple font-bold uppercase tracking-widest text-sm mb-4">Our Approach</h4>
            <div className="space-y-8">
              {[
                { step: "01", title: "Comprehensive Audit", desc: "Identify comprehensive business audit and make assessment." },
                { step: "02", title: "Customized Strategy", desc: "Over a decade of consulting expertise. Dealing with live development." },
                { step: "03", title: "Implementation & Optimization", desc: "Implement easing transition and upgrade with a vision for you." }
              ].map((item, i) => (
                <div key={i} className="flex space-x-6">
                  <span className="text-4xl font-serif font-bold text-brand-orange/30">{item.step}</span>
                  <div>
                    <h5 className="text-xl font-bold mb-2">{item.title}</h5>
                    <p className="text-slate-500">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
);

const ArtistManagementPage = () => (
  <div className="pt-32 pb-24">
    <div className="max-w-7xl mx-auto px-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
        <div className="order-2 lg:order-1">
          <h1 className="text-5xl md:text-7xl font-serif font-bold mb-8 text-brand-purple leading-tight">
            Our Artist <br />
            Management & <br />
            <span className="italic text-brand-orange">Consulting</span> Services
          </h1>
          <div className="space-y-6 text-lg text-slate-600 leading-relaxed">
            <p>
              Chapter 2 Consulting offers full-service boutique artist management and consulting for independent and emerging artists. With over a decade of experience in the music industry, we specialize in building, supporting, and sustaining the careers of positive, diverse, and talented artists.
            </p>
            <p>
              Our personalized strategies, industry insights, and hands-on guidance help artists grow their brand, expand their reach, and achieve long-term success.
            </p>
          </div>
          <button className="mt-10 bg-brand-purple text-white px-8 py-4 rounded-sm font-bold hover:bg-brand-purple-light transition-all">
            Inquire About Representation
          </button>
        </div>
        <div className="order-1 lg:order-2">
          <img 
            src="https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&q=80&w=1000" 
            alt="Professional Artist Management" 
            className="rounded-2xl shadow-2xl w-full h-auto object-cover aspect-[4/3]"
            referrerPolicy="no-referrer"
          />
        </div>
      </div>

      <div className="text-center mb-16">
        <h2 className="text-4xl font-serif font-bold mb-4">Our Artists</h2>
        <div className="w-20 h-1 bg-brand-orange mx-auto"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {[
          { name: "Andre Byrd", genre: "Gospel/Inspirational", img: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&q=80&w=600" },
          { name: "Dave James", genre: "Contemporary R&B", img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=600" },
          { name: "Dave & Tyheema", genre: "Soul Duo", img: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&q=80&w=600" },
          { name: "Barbara Walker", genre: "Jazz/Soul", img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=600" }
        ].map((artist, i) => (
          <div 
            key={i} 
            className="group cursor-pointer overflow-hidden rounded-xl relative aspect-[3/4] shadow-lg hover:shadow-2xl transition-all duration-500"
            onClick={() => alert(`Redirecting to ${artist.name}'s one-page website (Coming Soon)`)}
          >
            <img 
              src={artist.img} 
              alt={artist.name} 
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-purple via-transparent to-transparent opacity-70 group-hover:opacity-90 transition-opacity"></div>
            <div className="absolute bottom-0 left-0 p-6 text-white w-full">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] mb-2 text-brand-orange">{artist.genre}</p>
              <h3 className="text-xl font-serif font-bold leading-tight">{artist.name}</h3>
              <div className="mt-4 h-0.5 w-0 group-hover:w-full bg-brand-orange transition-all duration-500"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const BLOG_POSTS: BlogPost[] = [
  {
    id: 'ai-advantage',
    title: "The AI Advantage: Doing More with Less in 2026",
    category: "AI & Innovation",
    date: "April 14, 2026",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=1200",
    excerpt: "Six years ago, co-working was the \"new\" thing. Today, it's Artificial Intelligence. Discover how modern entrepreneurs are scaling without increasing their headcount.",
    content: (
      <div className="space-y-6">
        <p>Artificial Intelligence is no longer a futuristic concept; it is a present-day necessity for small businesses looking to remain competitive. In the years since we first published our "Ready, Set, Grow" guide, the landscape has shifted from physical co-working spaces to digital co-working with AI agents.</p>
        
        <h3 className="text-2xl font-serif font-bold text-slate-900">The Research & Strategy Revolution</h3>
        <p>Gone are the days of spending hours scrolling through search engine results. Tools like <strong>Perplexity</strong> and <strong>Claude 3.5</strong> allow you to synthesize complex market data in seconds. You can ask for a competitive analysis of your local area and receive a structured report instantly, allowing you to make data-driven decisions faster than ever.</p>
        
        <h3 className="text-2xl font-serif font-bold text-slate-900">Content & Creative at Scale</h3>
        <p>Marketing used to require a full-time copywriter and a graphic designer. Now, with <strong>ChatGPT</strong> and <strong>Jasper</strong>, you can draft high-quality social media posts and email newsletters in minutes. For visuals, <strong>Midjourney</strong> and <strong>Canva Magic Studio</strong> enable you to create stunning, professional-grade imagery that matches your brand's aesthetic without the high cost of custom photography.</p>
        
        <h3 className="text-2xl font-serif font-bold text-slate-900">Productivity & Meeting Intelligence</h3>
        <p>Never miss a detail in a client meeting again. Tools like <strong>Fireflies.ai</strong> or <strong>Otter.ai</strong> automatically record, transcribe, and summarize your meetings, pulling out action items and key decisions. Combine this with <strong>Notion AI</strong> to organize your company's internal knowledge base and project plans effortlessly.</p>
        
        <h3 className="text-2xl font-serif font-bold text-slate-900">Operational Automation</h3>
        <p><strong>Zapier</strong> and <strong>Make.com</strong> remain the gold standards for connecting your apps. By automating repetitive tasks—like moving a lead from your website form to your CRM or automatically generating invoices—you free up your time to focus on high-level strategy and client relationships.</p>
        
        <p>At Chapter 2 Consulting, we help you integrate these tools into your existing workflow so you can focus on what you do best: growing your business. The goal isn't to replace the human touch, but to amplify it.</p>
      </div>
    )
  },
  {
    id: 'three-pillars',
    title: "Ready, Set, Grow: The 3 Pillars of a Successful Launch",
    category: "Strategy",
    date: "April 5, 2026",
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=1200",
    excerpt: "Starting a business is not for the faint of heart. Success depends on three core pillars: Research, Planning, and Legal Structure.",
    content: (
      <div className="space-y-6">
        <p>When you embark on the journey of entrepreneurship, the excitement can often cloud the need for a solid foundation. Our "Ready, Set, Grow" framework focuses on three non-negotiable pillars.</p>
        <h3 className="text-2xl font-serif font-bold text-slate-900">1. Deep Research</h3>
        <p>Research is the foundation. You must determine if your product or service solves a real problem. Who is your target market? Does your brand name resonate? Skipping this step is the fastest way to a "Cease and Desist" letter or a product that nobody wants.</p>
        <h3 className="text-2xl font-serif font-bold text-slate-900">2. The Living Business Plan</h3>
        <p>Think of your business plan as a GPS. It shouldn't be a static document that sits in a drawer. It's a living guide that you tweak as you go. It helps you set goals and, more importantly, determine the steps to reach them.</p>
        <h3 className="text-2xl font-serif font-bold text-slate-900">3. Legal Integrity</h3>
        <p>Choosing the right legal structure (LLC, S-Corp, etc.) is critical for tax purposes and personal liability protection. Don't wait until you're in trouble to get your legal house in order.</p>
      </div>
    )
  },
  {
    id: 'legal-structure',
    title: "LLC vs. S-Corp: Choosing the Right Legal Structure",
    category: "Legal",
    date: "April 10, 2026",
    image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=1200",
    excerpt: "Your business structure determines which income tax return form you must file. Understand the differences between the most common forms.",
    content: (
      <div className="space-y-6">
        <p>One of the most frequent questions we get at Chapter 2 Consulting is: "Should I be an LLC or an S-Corp?" The answer depends on your long-term goals and current revenue.</p>
        <h3 className="text-2xl font-serif font-bold text-slate-900">The LLC (Limited Liability Company)</h3>
        <p>The LLC is the most popular choice for new small businesses. it offers personal liability protection and is relatively simple to set up. It's a "pass-through" entity, meaning the business income is reported on your personal tax return.</p>
        <h3 className="text-2xl font-serif font-bold text-slate-900">The S-Corp Election</h3>
        <p>An S-Corp is not a business entity itself, but a tax designation. Once your business reaches a certain level of profitability, switching to an S-Corp can save you significant money on self-employment taxes. However, it comes with stricter record-keeping requirements.</p>
        <p>We always recommend consulting with a CPA or attorney before making this final determination, as rules vary significantly from state to state.</p>
      </div>
    )
  }
];

const BlogPage = ({ onNavigatePost }: { onNavigatePost: (postId: string) => void }) => (
  <div className="pt-32 pb-24">
    <div className="max-w-7xl mx-auto px-6">
      <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
        <div>
          <h1 className="text-5xl md:text-6xl font-serif font-bold mb-4">The Strategic Edge</h1>
          <p className="text-xl text-slate-500">Insights on business growth, leadership, and the creative economy.</p>
        </div>
        <div className="relative w-full md:w-64">
          <input 
            type="text" 
            placeholder="Search articles..." 
            className="w-full pl-10 pr-4 py-2 border-b border-slate-200 focus:border-brand-purple outline-none transition-colors"
          />
          <Search className="absolute left-0 top-2.5 text-slate-400" size={18} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Featured Post */}
        <div 
          className="lg:col-span-2 group cursor-pointer"
          onClick={() => onNavigatePost(BLOG_POSTS[0].id)}
        >
          <div className="overflow-hidden rounded-2xl mb-6 aspect-video">
            <img 
              src={BLOG_POSTS[0].image} 
              alt={BLOG_POSTS[0].title} 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="flex items-center space-x-4 mb-4">
            <span className="bg-brand-purple/10 text-brand-purple text-xs font-bold px-3 py-1 rounded-full uppercase">{BLOG_POSTS[0].category}</span>
            <span className="text-slate-400 text-sm">{BLOG_POSTS[0].date}</span>
          </div>
          <h2 className="text-4xl font-serif font-bold mb-4 group-hover:text-brand-purple transition-colors">{BLOG_POSTS[0].title}</h2>
          <p className="text-lg text-slate-600 mb-6 leading-relaxed">
            {BLOG_POSTS[0].excerpt}
          </p>
          <button className="flex items-center font-bold text-brand-purple group">
            Read Article <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
          </button>
        </div>

        {/* Sidebar Posts */}
        <div className="space-y-12">
          {BLOG_POSTS.slice(1).map((post, i) => (
            <div 
              key={i} 
              className="group cursor-pointer"
              onClick={() => onNavigatePost(post.id)}
            >
              <div className="flex items-center space-x-4 mb-2">
                <span className="text-brand-orange text-xs font-bold uppercase tracking-widest">{post.category}</span>
                <span className="text-slate-400 text-xs">{post.date}</span>
              </div>
              <h3 className="text-xl font-serif font-bold group-hover:text-brand-purple transition-colors leading-tight">{post.title}</h3>
            </div>
          ))}
          
          <div className="bg-brand-purple text-white p-8 rounded-2xl shadow-xl shadow-brand-purple/20">
            <h4 className="text-xl font-serif font-bold mb-4">Get the Full Guide</h4>
            <p className="text-slate-300 text-sm mb-6">Download our 22-page eBook "Ready, Set, Grow" for the complete roadmap to business success.</p>
            <button className="w-full bg-brand-orange text-white py-3 rounded-sm font-bold text-sm hover:bg-brand-orange-light transition-all">
              Download Free eBook
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const BlogPostPage = ({ postId, onBack }: { postId: string, onBack: () => void }) => {
  const post = BLOG_POSTS.find(p => p.id === postId);
  if (!post) return null;

  return (
    <div className="pt-32 pb-24">
      <div className="max-w-4xl mx-auto px-6">
        <button 
          onClick={onBack}
          className="flex items-center text-brand-purple font-bold mb-8 hover:translate-x-[-4px] transition-transform"
        >
          <ArrowRight className="mr-2 rotate-180" size={18} /> Back to Blog
        </button>
        
        <div className="mb-12">
          <div className="flex items-center space-x-4 mb-6">
            <span className="bg-brand-purple/10 text-brand-purple text-xs font-bold px-3 py-1 rounded-full uppercase">{post.category}</span>
            <span className="text-slate-400 text-sm">{post.date}</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-serif font-bold mb-8 leading-tight">{post.title}</h1>
          <div className="overflow-hidden rounded-2xl aspect-video mb-12 shadow-2xl">
            <img 
              src={post.image} 
              alt={post.title} 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>

        <div className="prose prose-slate max-w-none text-lg text-slate-600 leading-relaxed">
          {post.content}
        </div>

        <div className="mt-20 pt-10 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-brand-orange rounded-full flex items-center justify-center text-white font-bold">ZH</div>
            <div>
              <p className="font-bold text-slate-900">Zabrina Harrington</p>
              <p className="text-sm text-slate-500">Founder & Principal Consultant</p>
            </div>
          </div>
          <div className="flex space-x-4">
            <button className="p-2 rounded-full bg-slate-50 text-slate-400 hover:text-brand-purple transition-colors"><Linkedin size={20} /></button>
            <button className="p-2 rounded-full bg-slate-50 text-slate-400 hover:text-brand-purple transition-colors"><Twitter size={20} /></button>
          </div>
        </div>
      </div>
    </div>
  );
};

const ContactPage = () => (
  <div className="pt-32 pb-24">
    <div className="max-w-7xl mx-auto px-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div>
          <h1 className="text-5xl md:text-6xl font-serif font-bold mb-8">Let's Start Your <br /><span className="text-brand-purple italic">Next Chapter</span></h1>
          <p className="text-xl text-slate-600 mb-12 leading-relaxed">
            Ready to refine your strategy or elevate your creative career? Fill out the form below, and we'll get back to you within 24 hours to schedule a discovery call.
          </p>
          
          <div className="space-y-8">
            <div className="flex items-start space-x-6">
              <div className="w-12 h-12 bg-brand-purple/10 rounded-full flex items-center justify-center text-brand-purple shrink-0">
                <Mail size={24} />
              </div>
              <div>
                <h4 className="font-bold text-lg mb-1">Email Us</h4>
                <a href="mailto:info@chapter2consulting.com" className="text-slate-500 hover:text-brand-purple transition-colors">info@chapter2consulting.com</a>
              </div>
            </div>
            <div className="flex items-start space-x-6">
              <div className="w-12 h-12 bg-brand-purple/10 rounded-full flex items-center justify-center text-brand-purple shrink-0">
                <Phone size={24} />
              </div>
              <div>
                <h4 className="font-bold text-lg mb-1">Call Us</h4>
                <a href="tel:5163780040" className="text-slate-500 hover:text-brand-purple transition-colors">516-378-0040</a>
              </div>
            </div>
            <div className="flex items-start space-x-6">
              <div className="w-12 h-12 bg-brand-purple/10 rounded-full flex items-center justify-center text-brand-purple shrink-0">
                <MapPin size={24} />
              </div>
              <div>
                <h4 className="font-bold text-lg mb-1">Visit Us</h4>
                <p className="text-slate-500">Address TBD<br />New York, NY</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-10 rounded-2xl shadow-2xl border border-slate-100">
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">First Name</label>
                <input type="text" className="w-full border-b-2 border-slate-100 focus:border-brand-purple outline-none py-2 transition-colors" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">Last Name</label>
                <input type="text" className="w-full border-b-2 border-slate-100 focus:border-brand-purple outline-none py-2 transition-colors" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">Email Address</label>
              <input type="email" className="w-full border-b-2 border-slate-100 focus:border-brand-purple outline-none py-2 transition-colors" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">Service of Interest</label>
              <select className="w-full border-b-2 border-slate-100 focus:border-brand-purple outline-none py-2 transition-colors bg-transparent">
                <option>Business Strategy</option>
                <option>Operations Optimization</option>
                <option>Artist Management</option>
                <option>Creative Consulting</option>
                <option>Other</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">Message</label>
              <textarea rows={4} className="w-full border-b-2 border-slate-100 focus:border-brand-purple outline-none py-2 transition-colors resize-none"></textarea>
            </div>
            <button className="w-full bg-brand-orange text-white py-4 rounded-sm font-bold text-lg hover:bg-brand-orange-light transition-all shadow-xl shadow-brand-orange/20">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
);

const PrivacyPage = () => (
  <div className="pt-32 pb-24">
    <div className="max-w-3xl mx-auto px-6">
      <h1 className="text-4xl font-serif font-bold mb-8">Privacy Policy</h1>
      <div className="prose prose-slate max-w-none space-y-6 text-slate-600">
        <p>Last Updated: April 2026</p>
        <p>At Chapter 2 Consulting Inc., we take your privacy seriously. This policy describes how we collect, use, and protect your personal information.</p>
        <h2 className="text-2xl font-serif font-bold text-slate-900">1. Information We Collect</h2>
        <p>We collect information you provide directly to us, such as when you fill out a contact form, including your name, email address, and phone number.</p>
        <h2 className="text-2xl font-serif font-bold text-slate-900">2. How We Use Information</h2>
        <p>We use the information we collect to communicate with you, provide our services, and improve our website experience.</p>
        <h2 className="text-2xl font-serif font-bold text-slate-900">3. Data Security</h2>
        <p>We implement industry-standard security measures to protect your data from unauthorized access or disclosure.</p>
      </div>
    </div>
  </div>
);

const TermsPage = () => (
  <div className="pt-32 pb-24">
    <div className="max-w-3xl mx-auto px-6">
      <h1 className="text-4xl font-serif font-bold mb-8">Terms of Service</h1>
      <div className="prose prose-slate max-w-none space-y-6 text-slate-600">
        <p>Last Updated: April 2026</p>
        <p>By using the Chapter 2 Consulting Inc. website, you agree to the following terms and conditions.</p>
        <h2 className="text-2xl font-serif font-bold text-slate-900">1. Services</h2>
        <p>Chapter 2 Consulting provides business strategy and artist management services. All engagements are subject to a separate signed agreement.</p>
        <h2 className="text-2xl font-serif font-bold text-slate-900">2. Intellectual Property</h2>
        <p>All content on this website is the property of Chapter 2 Consulting Inc. and may not be used without permission.</p>
      </div>
    </div>
  </div>
);

const CookiePage = () => (
  <div className="pt-32 pb-24">
    <div className="max-w-3xl mx-auto px-6">
      <h1 className="text-4xl font-serif font-bold mb-8">Cookie Policy</h1>
      <div className="prose prose-slate max-w-none space-y-6 text-slate-600">
        <p>Last Updated: April 2026</p>
        <p>We use cookies to enhance your browsing experience and analyze site traffic.</p>
        <h2 className="text-2xl font-serif font-bold text-slate-900">1. What are Cookies?</h2>
        <p>Cookies are small text files stored on your device that help us recognize you and remember your preferences.</p>
        <h2 className="text-2xl font-serif font-bold text-slate-900">2. Managing Cookies</h2>
        <p>You can control and disable cookies through your browser settings at any time.</p>
      </div>
    </div>
  </div>
);

// --- Main App ---

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage, selectedPostId]);

  const navigateToPost = (id: string) => {
    setSelectedPostId(id);
    setCurrentPage('blog-post');
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home': return <HomePage onNavigate={setCurrentPage} />;
      case 'about': return <AboutPage />;
      case 'services': return <ServicesPage />;
      case 'artist-management': return <ArtistManagementPage />;
      case 'blog': return <BlogPage onNavigatePost={navigateToPost} />;
      case 'blog-post': return <BlogPostPage postId={selectedPostId || ''} onBack={() => setCurrentPage('blog')} />;
      case 'contact': return <ContactPage />;
      case 'privacy': return <PrivacyPage />;
      case 'terms': return <TermsPage />;
      case 'cookies': return <CookiePage />;
      default: return <HomePage onNavigate={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col selection:bg-brand-purple/20 selection:text-brand-purple">
      <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            {renderPage()}
          </motion.div>
        </AnimatePresence>
      </main>

      <Footer setCurrentPage={setCurrentPage} />
    </div>
  );
}
