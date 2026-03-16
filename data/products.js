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
  const BASE_IMG  = '/images/productos/';

  /* ── Product catalog ─────────────────────────────────────── */

  const CATALOG = {

    '2257': {
      ref:         '2257',
      name:        'Estuche Saco con Capa',
      description: 'Saco con capa, pantalón con pie, gorro y mitones tejidos a mano. Nuestro estuche más querido, en colores pastel naturales.',
      talla:       'RN',
      price:       84000,
      colors:      ['Amarillo', 'Verde Agua', 'Beige', 'Blanco'],
      image:       BASE_IMG + '2257.jpg',
      keywords:    ['estuche', 'saco', 'capa', 'gorro', 'mitones', 'pantalón', 'rn', 'recién nacido', 'amarillo', 'verde agua', '2257'],
      featured:    true,
    },

    '2258': {
      ref:         '2258',
      name:        'Estuche Tejido Clásico',
      description: 'Ajuar clásico artesanal tejido a mano. Incluye saco, pantalón con pie cubierto, gorro y mitones en hilo suave.',
      talla:       'RN',
      price:       84000,
      colors:      ['Beige', 'Blanco', 'Verde Agua', 'Rosa'],
      image:       BASE_IMG + '2258.jpg',
      keywords:    ['estuche', 'saco', 'clásico', 'pantalón', 'gorro', 'mitones', 'rn', 'recién nacido', 'beige', 'blanco', '2258'],
      featured:    true,
    },

    '2809': {
      ref:         '2809',
      name:        'Set Premium Recién Nacido',
      description: 'Nuestro set premium con acabados especiales. Saco, pantalón, gorro, mitones y body interior para la llegada más especial.',
      talla:       'RN',
      price:       105000,
      colors:      ['Blanco', 'Beige', 'Café'],
      image:       BASE_IMG + '2809.jpg',
      keywords:    ['set', 'premium', 'saco', 'pantalón', 'gorro', 'mitones', 'body', 'rn', 'recién nacido', 'blanco', '2809'],
      featured:    true,
    },

    '2810': {
      ref:         '2810',
      name:        'Conjunto Tejido Natural',
      description: 'Elaborado en fibra natural 100%. Transpirable, suave al tacto y amigable con la piel más delicada del recién nacido.',
      talla:       'RN',
      price:       78000,
      colors:      ['Natural', 'Beige'],
      image:       BASE_IMG + '2810.jpg',
      keywords:    ['conjunto', 'natural', 'fibra', 'transpirable', 'suave', 'rn', 'recién nacido', 'beige', '2810'],
      featured:    true,
    },

    '2817': {
      ref:         '2817',
      name:        'Conjunto Unisex Artesanal',
      description: 'Diseño unisex ideal para niño o niña. Saco, pantalón con pie, gorro y mitones. Ideal para regalo de baby shower.',
      talla:       'RN / 0–3M',
      price:       84000,
      colors:      ['Beige', 'Blanco', 'Azul', 'Rosa', 'Café'],
      image:       BASE_IMG + '2817.jpg',
      keywords:    ['conjunto', 'unisex', 'niño', 'niña', 'baby shower', 'regalo', 'rn', '0-3m', '2817'],
      featured:    true,
    },

    '2823': {
      ref:         '2823',
      name:        'Ajuar Baby Shower',
      description: 'El regalo perfecto para un baby shower. Tejido artesanal presentado en caja especial, listo para sorprender.',
      talla:       'RN',
      price:       89000,
      colors:      ['Beige', 'Blanco', 'Rosa', 'Azul'],
      image:       BASE_IMG + '2823.jpg',
      keywords:    ['ajuar', 'baby shower', 'regalo', 'caja', 'especial', 'rn', 'recién nacido', '2823'],
      featured:    true,
    },

    '4091': {
      ref:         '4091',
      name:        'Set Hospital Recién Nacido',
      description: 'Pensado para el momento de llegar al mundo. Suave, cómodo y tejido con amor. Perfecto para las primeras fotos en el hospital.',
      talla:       'RN',
      price:       84000,
      colors:      ['Blanco', 'Beige', 'Rosa', 'Azul'],
      image:       BASE_IMG + '4091.jpg',
      keywords:    ['set', 'hospital', 'llegada', 'fotos', 'newborn', 'rn', 'recién nacido', 'blanco', '4091'],
      featured:    true,
    },

    '4105': {
      ref:         '4105',
      name:        'Estuche Newborn Fotografía',
      description: 'Creado para la sesión de fotos más especial. Colores suaves y texturas hermosas para capturar los primeros momentos.',
      talla:       'RN / 3M',
      price:       78000,
      colors:      ['Beige', 'Blanco', 'Rosa'],
      image:       BASE_IMG + '4105.jpg',
      keywords:    ['estuche', 'newborn', 'fotografía', 'fotos', 'sesión', 'rn', '3m', 'beige', 'rosa', '4105'],
      featured:    true,
    },

    '4111': {
      ref:         '4111',
      name:        'Conjunto Artesanal Bebé',
      description: 'Conjunto clásico artesanal para bebé. Tejido a mano en fibras naturales suaves. Disponible en tallas RN y 0–3M.',
      talla:       'RN / 0–3M',
      price:       78000,
      colors:      ['Azul', 'Beige', 'Blanco', 'Rosa'],
      image:       BASE_IMG + '4111.jpg',
      keywords:    ['conjunto', 'artesanal', 'bebé', 'fibra', 'natural', 'rn', '0-3m', 'azul', '4111'],
      featured:    true,
    },

    /* ── En base de datos, no en cuadrícula principal ──────── */

    '4114': {
      ref:         '4114',
      name:        'Estuche Especial Niña',
      description: 'Estuche artesanal para bebé niña con detalles especiales. Tejido a mano con mucho amor.',
      talla:       'RN',
      price:       89000,
      colors:      ['Blanco', 'Rosa', 'Beige', 'Rojo'],
      image:       BASE_IMG + '4114.jpg',
      keywords:    ['estuche', 'niña', 'especial', 'rn', 'recién nacido', 'rosa', 'blanco', '4114'],
      featured:    false,
    },

    '1449': {
      ref:         '1449',
      name:        'Set Artesanal Clásico',
      description: 'Set artesanal de tres piezas. Saco, pantalón y gorro tejidos en hilo suave natural.',
      talla:       'RN',
      price:       74000,
      colors:      ['Beige', 'Blanco'],
      image:       BASE_IMG + '1449.jpg',
      keywords:    ['set', 'artesanal', 'clásico', 'saco', 'pantalón', 'gorro', 'rn', 'beige', '1449'],
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

    /** Case-insensitive search by name, color, description, ref, or keyword */
    search(query) {
      const q = query.toLowerCase();
      return Object.values(CATALOG).filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.colors.some(c => c.toLowerCase().includes(q)) ||
        p.ref.includes(q) ||
        (p.keywords || []).some(k => k.toLowerCase().includes(q))
      );
    },

    /** Build WhatsApp order link for a product */
    orderLink(ref) {
      const p = CATALOG[String(ref)];
      if (!p) return `https://wa.me/${WA_NUMBER}`;
      const text = encodeURIComponent(
        `Hola, me interesa la referencia ${p.ref} – ${p.name}`
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

  /* ── Global product list for AI agent / external access ───── */
  window.HILITOS_PRODUCTS = Object.values(CATALOG);

})();
