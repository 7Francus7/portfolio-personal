import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle, Loader2 } from 'lucide-react';

export function Contact() {
  const [formState, setFormState] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormState('sending');

    const form = e.currentTarget;
    const formData = new FormData(form);
    
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      message: formData.get('message'),
    };

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          access_key: '8cfd6b9d-bb53-4a23-a887-feb7aac2c980',
          from_name: data.name,
          email: data.email,
          message: `Nombre: ${data.name}\nEmail: ${data.email}\n\nMensaje:\n${data.message}`,
          subject: `Nuevo mensaje de ${data.name} - Portfolio`,
        }),
      });

      const result = await response.json();
      
      if (result.success) {
        setFormState('success');
        form.reset();
      } else {
        setFormState('error');
      }
    } catch {
      setFormState('error');
    }
  };

  return (
    <section id="contact" className="py-32 bg-black px-6 md:px-12 lg:px-20 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-20">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-[10px] uppercase tracking-[0.4em] text-white/40 font-bold mb-8">Contacto</h2>
            <h3 className="text-4xl md:text-6xl font-normal tracking-tighter leading-none text-white mb-10">
              Contame qué <br />
              <span className="text-white/40 italic">hay que construir.</span>
            </h3>
            
            <p className="text-lg text-white/50 font-light leading-relaxed mb-12 max-w-sm">
              Si tenés una operación desordenada, una idea de sistema o un producto a mejorar,
              escribime con contexto y lo vemos.
            </p>

            <div className="space-y-4">
              <p className="text-[10px] uppercase tracking-widest text-white/40 font-bold">Canales</p>
              <div className="flex flex-wrap gap-4">
                <a href="https://wa.me/5493524421497" target="_blank" rel="noopener noreferrer" className="text-sm text-white/60 hover:text-white transition-colors">WhatsApp</a>
                <a href="mailto:dellorsif@gmail.com" className="text-sm text-white/60 hover:text-white transition-colors">Email</a>
                <a href="https://www.linkedin.com/in/franco-dellorsi/" target="_blank" rel="noopener noreferrer" className="text-sm text-white/60 hover:text-white transition-colors">LinkedIn</a>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {formState === 'success' ? (
              <div className="liquid-glass border border-white/20 p-12 rounded-3xl text-center">
                <CheckCircle size={48} className="text-white mx-auto mb-6" />
                <h4 className="text-2xl font-light text-white mb-2">Mensaje Recibido</h4>
                <p className="text-white/50 font-light">Te respondo apenas pueda revisarlo.</p>
                <button 
                  onClick={() => setFormState('idle')}
                  className="mt-8 text-sm text-white/30 hover:text-white transition-colors"
                >
                  Enviar otro mensaje
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-[10px] uppercase tracking-widest text-white/40 font-bold">Nombre</label>
                    <input
                      type="text"
                      name="name"
                      required
                      placeholder="Franco D."
                      className="w-full bg-transparent border-b border-white/10 py-3 text-white placeholder:text-white/10 focus:outline-none focus:border-white transition-colors font-light"
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] uppercase tracking-widest text-white/40 font-bold">Email</label>
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="franco@example.com"
                      className="w-full bg-transparent border-b border-white/10 py-3 text-white placeholder:text-white/10 focus:outline-none focus:border-white transition-colors font-light"
                    />
                  </div>
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] uppercase tracking-widest text-white/40 font-bold">Mensaje</label>
                  <textarea
                    name="message"
                    rows={4}
                    required
                    placeholder="Contame qué necesitás construir..."
                    className="w-full bg-transparent border-b border-white/10 py-3 text-white placeholder:text-white/10 focus:outline-none focus:border-white transition-colors resize-none font-light"
                  />
                </div>
                <button
                  type="submit"
                  disabled={formState === 'sending'}
                  className="w-full flex items-center justify-between px-8 py-5 bg-white text-black rounded-xl font-semibold hover:bg-gray-100 transition-all disabled:opacity-50"
                >
                  {formState === 'sending' ? (
                    <Loader2 size={24} className="animate-spin mx-auto" />
                  ) : (
                    <>
                      <span>Enviar consulta</span>
                      <ArrowRight size={24} />
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
