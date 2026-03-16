/* ============================================================
   HILITOS — Product Database
   ============================================================
   Structure supports:
   • product search by ref, name, color, talla
   • WhatsApp ordering links
   • price retrieval (COP)
   • AI agent queries ("Do you have ref 2257?")

   Usage:
     // Get a product
     HILITOS.get('2257')

     // Get all featured products
     HILITOS.featured()

     // Search by name or color
     HILITOS.search('beige')

     // Get WhatsApp order link
     HILITOS.orderLink('2257')
   ============================================================ */

'use strict';

(function () {

  const WA_NUMBER = '573053560882';
  const BASE_IMG  = 'images/productos/';

  /* ── Product catalog ─────────────────────────────────────── */

  const CATALOG = {

    '2257': {
      ref:         '2257',
      nombre:      'Estuche Saco con Capa',
      descripcion: 'Saco con capa, pantalón con pie, gorro y mitones tejidos a mano. Nuestro estuche más querido, en colores pastel naturales.',
      talla:       'RN',
      precio:      84000,
      colores:     ['Amarillo', 'Verde Agua', 'Beige', 'Blanco'],
      imagen:      BASE_IMG + '2257.jpg',
      featured:    true,
    },

    '2258': {
      ref:         '2258',
      nombre:      'Estuche Tejido Clásico',
      descripcion: 'Ajuar clásico artesanal tejido a mano. Incluye saco, pantalón con pie cubierto, gorro y mitones en hilo suave.',
      talla:       'RN',
      precio:      84000,
      colores:     ['Beige', 'Blanco', 'Verde Agua', 'Rosa'],
      imagen:      BASE_IMG + '2258.jpg',
      featured:    true,
    },

    '2809': {
      ref:         '2809',
      nombre:      'Set Premium Recién Nacido',
      descripcion: 'Nuestro set premium con acabados especiales. Saco, pantalón, gorro, mitones y body interior para la llegada más especial.',
      talla:       'RN',
      precio:      105000,
      colores:     ['Blanco', 'Beige', 'Café'],
      imagen:      BASE_IMG + '2809.jpg',
      featured:    true,
    },

    '2810': {
      ref:         '2810',
      nombre:      'Conjunto Tejido Natural',
      descripcion: 'Elaborado en fibra natural 100%. Transpirable, suave al tacto y amigable con la piel más delicada del recién nacido.',
      talla:       'RN',
      precio:      78000,
      colores:     ['Natural', 'Beige'],
      imagen:      BASE_IMG + '2810.jpg',
      featured:    true,
    },

    '2817': {
      ref:         '2817',
      nombre:      'Conjunto Unisex Artesanal',
      descripcion: 'Diseño unisex ideal para niño o niña. Saco, pantalón con pie, gorro y mitones. Ideal para regalo de baby shower.',
      talla:       'RN / 0–3M',
      precio:      84000,
      colores:     ['Beige', 'Blanco', 'Azul', 'Rosa', 'Café'],
      imagen:      BASE_IMG + '2817.jpg',
      featured:    true,
    },

    '2823': {
      ref:         '2823',
      nombre:      'Ajuar Baby Shower',
      descripcion: 'El regalo perfecto para un baby shower. Tejido artesanal presentado en caja especial, listo para sorprender.',
      talla:       'RN',
      precio:      89000,
      colores:     ['Beige', 'Blanco', 'Rosa', 'Azul'],
      imagen:      BASE_IMG + '2823.jpg',
      featured:    true,
    },

    '4091': {
      ref:         '4091',
      nombre:      'Set Hospital Recién Nacido',
      descripcion: 'Pensado para el momento de llegar al mundo. Suave, cómodo y tejido con amor. Perfecto para las primeras fotos en el hospital.',
      talla:       'RN',
      precio:      84000,
      colores:     ['Blanco', 'Beige', 'Rosa', 'Azul'],
      imagen:      BASE_IMG + '4091.jpg',
      featured:    true,
    },

    '4102': {
      ref:         '4102',
      nombre:      'Estuche Tejido con Detalle',
      descripcion: 'Ajuar artesanal con detalles bordados especiales. Saco, pantalón, gorro y mitones en hilo suave hipoalergénico.',
      talla:       'RN',
      precio:      94000,
      colores:     ['Blanco', 'Beige', 'Rosa', 'Verde Agua'],
      imagen:      BASE_IMG + '4102.jpg',
      featured:    true,
    },

    '4105': {
      ref:         '4105',
      nombre:      'Estuche Newborn Fotografía',
      descripcion: 'Creado para la sesión de fotos más especial. Colores suaves y texturas hermosas para capturar los primeros momentos.',
      talla:       'RN / 3M',
      precio:      78000,
      colores:     ['Beige', 'Blanco', 'Rosa'],
      imagen:      BASE_IMG + '4105.jpg',
      featured:    true,
    },

    '4111': {
      ref:         '4111',
      nombre:      'Conjunto Artesanal Bebé',
      descripcion: 'Conjunto clásico artesanal para bebé. Tejido a mano en fibras naturales suaves. Disponible en tallas RN y 0–3M.',
      talla:       'RN / 0–3M',
      precio:      78000,
      colores:     ['Azul', 'Beige', 'Blanco', 'Rosa'],
      imagen:      BASE_IMG + '4111.jpg',
      featured:    true,
    },

    /* ── En base de datos, no en cuadrícula principal ──────── */

    '4114': {
      ref:         '4114',
      nombre:      'Estuche Especial Niña',
      descripcion: 'Estuche artesanal para bebé niña con detalles especiales. Tejido a mano con mucho amor.',
      talla:       'RN',
      precio:      89000,
      colores:     ['Blanco', 'Rosa', 'Beige', 'Rojo'],
      imagen:      BASE_IMG + '4114.jpg',
      featured:    false,
    },

    '1449': {
      ref:         '1449',
      nombre:      'Set Artesanal Clásico',
      descripcion: 'Set artesanal de tres piezas. Saco, pantalón y gorro tejidos en hilo suave natural.',
      talla:       'RN',
      precio:      74000,
      colores:     ['Beige', 'Blanco'],
      imagen:      BASE_IMG + '1449.jpg',
      featured:    false,
    },

  };

  /* ── Public API ───────────────────────────────────────────── */

  window.HILITOS = {

    /** Return all products as an array */
    all() {
      return Object.values(CATALOG);
    },

    /** Return only featured products (for the grid display) */
    featured() {
      return Object.values(CATALOG).filter(p => p.featured);
    },

    /** Lookup by reference number */
    get(ref) {
      return CATALOG[String(ref)] || null;
    },

    /** Case-insensitive search by name, color, or description */
    search(query) {
      const q = query.toLowerCase();
      return Object.values(CATALOG).filter(p =>
        p.nombre.toLowerCase().includes(q) ||
        p.descripcion.toLowerCase().includes(q) ||
        p.colores.some(c => c.toLowerCase().includes(q)) ||
        p.ref.includes(q)
      );
    },

    /** Build WhatsApp order link for a product */
    orderLink(ref) {
      const p = CATALOG[String(ref)];
      if (!p) return `https://wa.me/${WA_NUMBER}`;
      const text = encodeURIComponent(
        `Hola, me interesa la referencia ${p.ref} – ${p.nombre}`
      );
      return `https://wa.me/${WA_NUMBER}?text=${text}`;
    },

    /** Format price to Colombian pesos */
    formatPrice(amount) {
      return new Intl.NumberFormat('es-CO', {
        style:                 'currency',
        currency:              'COP',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(amount);
    },

  };

  /* ── Export for future module use ────────────────────────── */
  // export const products = CATALOG;

})();
