import { useState } from 'react';
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
    <section id="contact" className="surface-band border-t border-[var(--color-line-strong)] px-6 py-32 md:px-12 lg:px-16">
      <div className="mx-auto max-w-[1400px]">
        <div className="grid gap-20 lg:grid-cols-2">
          <div>
            <p className="label-mono mb-8">/ Contacto</p>
            <h3 className="mb-10 font-serif-display text-4xl leading-[1.02] tracking-[-0.02em] text-ink md:text-6xl">
              Contame qué <br />
              <span className="italic text-accent">hay que construir.</span>
            </h3>

            <p className="mb-12 max-w-sm text-lg font-light leading-relaxed text-ink-mute">
              Si tenés una operación desordenada, una idea de sistema o un producto a mejorar,
              escribime con contexto y lo vemos.
            </p>

            <div className="space-y-4">
              <p className="label-mono">Canales</p>
              <div className="flex flex-wrap gap-6">
                <a href="https://wa.me/5493524421497" target="_blank" rel="noopener noreferrer" className="link-underline text-sm text-ink-soft hover:text-ink">WhatsApp</a>
                <a href="mailto:dellorsif@gmail.com" className="link-underline text-sm text-ink-soft hover:text-ink">Email</a>
                <a href="https://www.linkedin.com/in/franco-dellorsi/" target="_blank" rel="noopener noreferrer" className="link-underline text-sm text-ink-soft hover:text-ink">LinkedIn</a>
              </div>
            </div>
          </div>

          <div>
            {formState === 'success' ? (
              <div className="surface-card border border-[var(--color-line-strong)] p-12 text-center">
                <CheckCircle size={48} className="mx-auto mb-6 text-accent" />
                <h4 className="mb-2 font-serif-display text-2xl text-ink">Mensaje recibido</h4>
                <p className="font-light text-ink-mute">Te respondo apenas pueda revisarlo.</p>
                <button
                  onClick={() => setFormState('idle')}
                  className="label-mono mt-8 hover:!text-ink"
                >
                  Enviar otro mensaje
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid gap-8 md:grid-cols-2">
                  <div className="space-y-3">
                    <label htmlFor="contact-name" className="label-mono">Nombre</label>
                    <input
                      id="contact-name"
                      type="text"
                      name="name"
                      required
                      placeholder="Franco D."
                      className="w-full border-b border-[var(--color-line-strong)] bg-transparent py-3 font-light text-ink transition-colors placeholder:text-ink-faint focus:border-ink focus:outline-none"
                    />
                  </div>
                  <div className="space-y-3">
                    <label htmlFor="contact-email" className="label-mono">Email</label>
                    <input
                      id="contact-email"
                      type="email"
                      name="email"
                      required
                      placeholder="franco@example.com"
                      className="w-full border-b border-[var(--color-line-strong)] bg-transparent py-3 font-light text-ink transition-colors placeholder:text-ink-faint focus:border-ink focus:outline-none"
                    />
                  </div>
                </div>
                <div className="space-y-3">
                  <label htmlFor="contact-message" className="label-mono">Mensaje</label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={4}
                    required
                    placeholder="Contame qué necesitás construir..."
                    className="w-full resize-none border-b border-[var(--color-line-strong)] bg-transparent py-3 font-light text-ink transition-colors placeholder:text-ink-faint focus:border-ink focus:outline-none"
                  />
                </div>
                <button
                  type="submit"
                  disabled={formState === 'sending'}
                  className="flex w-full items-center justify-between bg-ink px-8 py-5 font-medium text-paper transition-transform hover:-translate-y-0.5 disabled:opacity-50"
                >
                  {formState === 'sending' ? (
                    <Loader2 size={24} className="mx-auto animate-spin" />
                  ) : (
                    <>
                      <span>Enviar consulta</span>
                      <ArrowRight size={24} />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
