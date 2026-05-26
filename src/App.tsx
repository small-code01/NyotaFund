/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { 
  Menu, 
  X, 
  ChevronRight, 
  ArrowRight, 
  Mail, 
  Phone, 
  MapPin, 
  Facebook, 
  Twitter, 
  Instagram,
  ExternalLink,
  ShieldCheck,
  Zap,
  Users,
  Globe,
  Landmark
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { NAV_LINKS, LOAN_PRODUCTS, TESTIMONIALS, STATS } from './constants';
import { LoanApplicationModal } from './components/LoanApplicationModal';

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-md py-3' : 'bg-transparent py-5'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-2">
            {/* Logo removed */}
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                className={`text-sm font-medium hover:text-kenya-red transition-colors ${scrolled ? 'text-kenya-black' : 'text-white'}`}
              >
                {link.name}
              </a>
            ))}
            <button 
              onClick={() => setIsApplyModalOpen(true)}
              className="bg-kenya-green text-white px-6 py-2 rounded-full text-sm font-bold hover:bg-opacity-90 transition-all transform hover:scale-105"
            >
              Apply Now
            </button>
          </div>

          {/* Mobile Toggle */}
          <button className="md:hidden text-kenya-black" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className={scrolled ? 'text-kenya-black' : 'text-white'} /> : <Menu className={scrolled ? 'text-kenya-black' : 'text-white'} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden bg-white absolute top-full left-0 w-full shadow-xl border-t border-gray-100 py-6 px-6 flex flex-col gap-4"
          >
            {NAV_LINKS.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                className="text-lg font-medium text-kenya-black hover:text-kenya-red"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}
            <button 
              onClick={() => {
                setIsApplyModalOpen(true);
                setIsMenuOpen(false);
              }}
              className="bg-kenya-green text-white px-6 py-3 rounded-xl font-bold text-center"
            >
              Apply Now
            </button>
          </motion.div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=1920&h=1080" 
            alt="Flourishing Kenyan Mama Mboga Stall" 
            className="w-full h-full object-cover brightness-[0.4]"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-kenya-black/80 to-transparent"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <h1 className="text-5xl md:text-7xl text-white mb-6 leading-tight">
              Empowering the <span className="text-kenya-green">Future</span> of Kenya
            </h1>
            <p className="text-xl text-white/80 mb-10 leading-relaxed max-w-2xl">
              The NYOTA Project is a 5-year initiative aiming to empower 820,000 unemployed youth. 
              From entrepreneurship grants to digital skills training, we are your partner in growth.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={() => setIsApplyModalOpen(true)}
                className="bg-kenya-red text-white px-8 py-4 rounded-full font-bold text-lg flex items-center justify-center gap-2 hover:bg-opacity-90 transition-all group"
              >
                Get Started <ChevronRight className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="bg-white/10 backdrop-blur-md text-white border border-white/20 px-8 py-4 rounded-full font-bold text-lg hover:bg-white/20 transition-all">
                Learn More
              </button>
            </div>
          </motion.div>
        </div>

        {/* Bottom Kenya Flag Accent */}
        <div className="absolute bottom-0 left-0 w-full h-2 kenya-gradient"></div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {STATS.map((stat, idx) => (
              <motion.div 
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center mx-auto mb-4 text-kenya-red">
                  <stat.icon size={24} />
                </div>
                <div className="text-3xl font-display font-bold text-kenya-black mb-1">{stat.value}</div>
                <div className="text-sm text-gray-500 font-medium uppercase tracking-wider">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Loan Products Section */}
      <section id="loans" className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-4xl md:text-5xl mb-6">Our Loan <span className="text-kenya-red">Products</span></h2>
            <p className="text-gray-600 text-lg">
              Tailored financial solutions engineered specifically for the unique challenges faced by Kenyan youth.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {LOAN_PRODUCTS.map((product, idx) => (
              <motion.div 
                key={product.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="group p-8 rounded-3xl border border-gray-100 hover:border-kenya-red/20 hover:shadow-2xl hover:shadow-kenya-red/5 transition-all duration-500 bg-white relative overflow-hidden"
              >
                <div className={`absolute top-0 right-0 w-32 h-32 ${product.bg} rounded-bl-full -mr-10 -mt-10 transition-transform group-hover:scale-110`}></div>
                
                <div className={`w-14 h-14 ${product.bg} ${product.color} rounded-2xl flex items-center justify-center mb-6 relative z-10`}>
                  <product.icon size={28} />
                </div>
                
                <h3 className="text-2xl mb-4 relative z-10">{product.title}</h3>
                <p className="text-gray-600 mb-8 relative z-10">{product.description}</p>
                
                <div className="bg-gray-50 p-6 rounded-2xl border-l-4 border-kenya-green relative z-10">
                  <h4 className="text-xs font-bold text-kenya-green uppercase tracking-widest mb-2">How it's Engineered</h4>
                  <p className="text-sm text-gray-700 leading-relaxed italic">
                    "{product.engineering}"
                  </p>
                </div>

                <button 
                  onClick={() => setIsApplyModalOpen(true)}
                  className="mt-8 flex items-center gap-2 text-kenya-red font-bold group-hover:gap-4 transition-all"
                >
                  Apply for this product <ArrowRight size={18} />
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section id="about" className="py-24 bg-kenya-black text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 kenya-gradient opacity-50"></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <div className="lg:w-1/2">
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?q=80&w=800&h=1000&auto=format&fit=crop" 
                  alt="Technical Education Kenya" 
                  className="rounded-3xl shadow-2xl grayscale hover:grayscale-0 transition-all duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute -bottom-8 -right-8 bg-kenya-red p-8 rounded-3xl hidden md:block">
                  <div className="text-4xl font-bold mb-1">5 Years</div>
                  <div className="text-sm uppercase tracking-widest opacity-80">Of Impact</div>
                </div>
              </div>
            </div>
            <div className="lg:w-1/2">
              <h2 className="text-4xl md:text-5xl mb-8">About <span className="text-kenya-green">NYOTA</span> Fund</h2>
              <p className="text-xl text-white/70 mb-8 leading-relaxed">
                The National Youth Opportunities Towards Advancement (NYOTA) Project is a transformative 5-year Kenyan government initiative, backed by the World Bank.
              </p>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-white/10 flex-shrink-0 flex items-center justify-center text-kenya-green">
                    <ShieldCheck />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold mb-1">Haba Haba Scheme</h4>
                    <p className="text-white/60">Integrated savings support that encourages financial discipline and long-term security for youth.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-white/10 flex-shrink-0 flex items-center justify-center text-kenya-red">
                    <Zap />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold mb-1">Digital Skills Training</h4>
                    <p className="text-white/60">Equipping youth with the tools needed to thrive in the modern global digital economy.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-white/10 flex-shrink-0 flex items-center justify-center text-kenya-green">
                    <Users />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold mb-1">Inclusivity</h4>
                    <p className="text-white/60">Targeting youth ages 18-29, and extending up to 35 for Persons with Disabilities (PWDs).</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-24 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl mb-4">Youth <span className="text-kenya-red">Success</span> Stories</h2>
            <p className="text-gray-500">Real impact from real people empowered by NYOTA.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((t, idx) => (
              <motion.div 
                key={t.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-full bg-kenya-red/10 flex items-center justify-center text-kenya-red font-bold text-lg">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-kenya-black">{t.name}</h4>
                    <p className="text-xs text-kenya-red font-bold uppercase tracking-wider">{t.role}</p>
                  </div>
                </div>
                <p className="text-gray-600 italic leading-relaxed">"{t.content}"</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="bg-kenya-green rounded-[3rem] overflow-hidden shadow-2xl flex flex-col lg:flex-row">
            <div className="lg:w-1/2 p-12 lg:p-20 text-white">
              <h2 className="text-4xl md:text-5xl mb-8">Let's <span className="text-kenya-black">Connect</span></h2>
              <p className="text-white/80 mb-12 text-lg">
                Have questions about the NYOTA Fund or your application? Our team is here to support your journey.
              </p>
              
              <div className="space-y-8">
                <div className="flex items-center gap-6">
                  <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center">
                    <Phone size={24} />
                  </div>
                  <div>
                    <div className="text-sm text-white/60 uppercase tracking-widest font-bold">Call Us</div>
                    <div className="text-xl font-medium">+254 700 000 000</div>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center">
                    <Mail size={24} />
                  </div>
                  <div>
                    <div className="text-sm text-white/60 uppercase tracking-widest font-bold">Email Us</div>
                    <div className="text-xl font-medium">info@nyotafund.go.ke</div>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <div className="text-sm text-white/60 uppercase tracking-widest font-bold">Visit Us</div>
                    <div className="text-xl font-medium">Nairobi, Kenya</div>
                  </div>
                </div>
              </div>

              <div className="mt-16 flex gap-4">
                <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all"><Facebook size={20} /></a>
                <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all"><Twitter size={20} /></a>
                <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all"><Instagram size={20} /></a>
              </div>
            </div>

            <div className="lg:w-1/2 bg-white p-12 lg:p-20">
              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 uppercase tracking-wider">Full Name</label>
                    <input type="text" className="w-full px-6 py-4 rounded-2xl bg-gray-50 border border-gray-100 focus:border-kenya-green outline-none transition-all" placeholder="John Doe" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 uppercase tracking-wider">Email Address</label>
                    <input type="email" className="w-full px-6 py-4 rounded-2xl bg-gray-50 border border-gray-100 focus:border-kenya-green outline-none transition-all" placeholder="john@example.com" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 uppercase tracking-wider">Subject</label>
                  <select className="w-full px-6 py-4 rounded-2xl bg-gray-50 border border-gray-100 focus:border-kenya-green outline-none transition-all">
                    <option>Loan Inquiry</option>
                    <option>Haba Haba Scheme</option>
                    <option>Digital Skills Training</option>
                    <option>Technical Support</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 uppercase tracking-wider">Message</label>
                  <textarea rows={4} className="w-full px-6 py-4 rounded-2xl bg-gray-50 border border-gray-100 focus:border-kenya-green outline-none transition-all" placeholder="How can we help you?"></textarea>
                </div>
                <button className="w-full bg-kenya-red text-white py-5 rounded-2xl font-bold text-lg hover:bg-opacity-90 transition-all shadow-lg shadow-kenya-red/20">
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-kenya-black text-white pt-20 pb-10 border-t border-white/10">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-2">
              <div className="flex items-center gap-2 mb-6">
                {/* Logo removed */}
              </div>
              <p className="text-white/50 max-w-md leading-relaxed mb-8">
                The National Youth Opportunities Towards Advancement (NYOTA) Project is a government initiative dedicated to creating sustainable opportunities for the youth of Kenya.
              </p>
              <div className="flex flex-col gap-4 text-sm font-medium">
                <div className="flex items-center gap-2 text-kenya-red font-bold uppercase tracking-widest text-xs">
                  <ShieldCheck size={16} /> 100% World Bank Backed
                </div>
                <div className="flex flex-wrap items-center gap-6">
                  <span className="text-white/30 uppercase tracking-widest text-xs w-full md:w-auto">Partners:</span>
                  <div className="flex items-center gap-6">
                    <span className="flex items-center gap-3 hover:text-white transition-colors cursor-pointer group">
                      <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-colors">
                        <Globe className="text-kenya-red" size={20} />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs font-bold leading-none">World Bank</span>
                        <span className="text-[10px] text-white/30 truncate">International Partner</span>
                      </div>
                      <ExternalLink size={12} className="text-white/20" />
                    </span>
                    <span className="flex items-center gap-3 hover:text-white transition-colors cursor-pointer group">
                      <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-colors">
                        <Landmark className="text-kenya-green" size={20} />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs font-bold leading-none">Government of Kenya</span>
                        <span className="text-[10px] text-white/30 truncate">National Partner</span>
                      </div>
                      <ExternalLink size={12} className="text-white/20" />
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-bold mb-6 uppercase tracking-widest text-sm text-kenya-green">Quick Links</h4>
              <ul className="space-y-4 text-white/60">
                {NAV_LINKS.map(link => (
                  <li key={link.name}><a href={link.href} className="hover:text-white transition-colors">{link.name}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-6 uppercase tracking-widest text-sm text-kenya-red">Legal</h4>
              <ul className="space-y-4 text-white/60">
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Loan Agreement</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Cookie Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-white/30 text-sm">
              © {new Date().getFullYear()} NYOTA FUND. All rights reserved.
            </p>
            <div className="flex gap-8 text-white/30 text-sm">
              <span className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-kenya-green"></div> System Status: Online</span>
              <span className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-kenya-red"></div> Security: Verified</span>
            </div>
          </div>
        </div>
      </footer>

      <LoanApplicationModal 
        isOpen={isApplyModalOpen} 
        onClose={() => setIsApplyModalOpen(false)} 
      />
    </div>
  );
}
