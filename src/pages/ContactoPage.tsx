import { Contact } from '../components/Contact';
import { Footer } from '../components/Footer';

export function ContactoPage() {
  return (
    <main className="surface-page pt-20">
      {/* 
        He removido la cabecera redundante para que el formulario de contacto 
        tenga todo el protagonismo desde el inicio.
      */}
      <Contact />
      <Footer />
    </main>
  );
}
