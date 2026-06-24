import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Resetea el scroll al tope en cada cambio de ruta.
 * Evita el bug típico de SPAs donde la nueva página
 * abre a mitad de scroll de la anterior.
 */
export function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
  }, [pathname]);

  return null;
}
