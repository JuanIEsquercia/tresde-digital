'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

// ── Configuración ─────────────────────────────────────────────────────────────
const USD_TO_ARS_DEFAULT = Number(process.env.NEXT_PUBLIC_USD_ARS_RATE) || 1200;
const WHATSAPP_NUMBER = '5493794267780';
const VOLUMEN_THRESHOLD = 3;

// ── Tipos ─────────────────────────────────────────────────────────────────────
type SegmentoId = 'inmobiliaria' | 'country' | 'comercio' | 'hoteleria' | 'cultura' | 'industria';

interface Segmento {
  id: SegmentoId;
  label: string;
  icon: string;
  desc: string;
}

interface Producto {
  id: string;
  name: string;
  desc: string;
  price: number | null;
}

interface Adicional {
  id: string;
  name: string;
  desc: string;
  price: number;
}

// ── Datos ─────────────────────────────────────────────────────────────────────
const SEGMENTOS: Segmento[] = [
  { id: 'inmobiliaria', label: 'Inmobiliaria / Alquiler',  icon: '🏠', desc: 'Residencial · venta · alquiler temporal' },
  { id: 'country',      label: 'Country / Chacra',         icon: '🌿', desc: 'Interior + exterior híbrido' },
  { id: 'comercio',     label: 'Comercio',                 icon: '🏪', desc: 'Tour 360° navegable + Google Maps' },
  { id: 'hoteleria',    label: 'Hotelería / Turismo',      icon: '🏨', desc: 'Hotel · complejo turístico' },
  { id: 'cultura',      label: 'Cultura / Museo',          icon: '🎨', desc: 'Tour inmersivo con hotspots informativos' },
  { id: 'industria',    label: 'Industria',                icon: '🏭', desc: 'Plantas · talleres · complejos industriales' },
];

const PRODUCTOS: Record<SegmentoId, Producto[]> = {
  inmobiliaria: [
    { id: 'mono',      name: 'Monoambiente / 1 dormitorio', desc: 'Tour + dollhouse + plano de planta + hosting 1 año', price: 75 },
    { id: 'dos_tres',  name: '2–3 dormitorios',             desc: 'Tour + dollhouse + plano de planta + hosting 1 año', price: 100 },
    { id: 'cuatro_mas',name: '4 o más dormitorios',         desc: 'Tour + dollhouse + plano de planta + hosting 1 año', price: 150 },
    { id: 'premium',   name: 'Propiedad premium',           desc: 'Tour + dollhouse + plano de planta + hosting 1 año', price: 220 },
  ],
  country: [
    { id: 'country_std',  name: 'Vivienda en country',          desc: 'Interior Matterport + exterior 360° + hosting 1 año',      price: 280 },
    { id: 'country_prem', name: 'Country premium / chacra',     desc: 'Interior + exterior + amenities + hosting 1 año',           price: 380 },
  ],
  comercio: [
    { id: 'local_chico',   name: 'Local pequeño',                desc: 'Tour 360° navegable + hotspots + hosting 1 año',           price: 60 },
    { id: 'local_mediano', name: 'Local mediano / restaurante',  desc: 'Tour 360° + hotspots + hosting 1 año',                     price: 90 },
    { id: 'local_grande',  name: 'Local grande / showroom',      desc: 'Tour 360° + hotspots + hosting 1 año',                     price: 130 },
  ],
  hoteleria: [
    { id: 'hotel_std',    name: 'Hotel / Complejo — hasta 1.000 m²', desc: 'Tour completo + hotspots + hosting 1 año',             price: 400 },
    { id: 'hotel_grande', name: 'Más de 1.000 m²',                   desc: 'Presupuesto a coordinar según dimensiones',            price: null },
  ],
  cultura: [
    { id: 'museo_std',    name: 'Museo / Espacio cultural — hasta 500 m²',  desc: 'Tour inmersivo + hotspots informativos + hosting 1 año',              price: 260 },
    { id: 'museo_grande', name: 'Centro cultural — hasta 1.500 m²',         desc: 'Tour múltiples salas + hotspots informativos + hosting 1 año',        price: 400 },
    { id: 'museo_xl',     name: 'Más de 1.500 m²',                          desc: 'Presupuesto a coordinar según dimensiones',                           price: null },
  ],
  industria: [
    { id: 'ind_std',  name: 'Planta / Taller — hasta 500 m²',         desc: 'Tour 360° + hotspots con descripción de maquinarias y servicios + hosting 1 año',  price: 200 },
    { id: 'ind_prem', name: 'Complejo industrial — hasta 1.500 m²',   desc: 'Tour 360° + hotspots con descripción de maquinarias y servicios + hosting 1 año',  price: 400 },
    { id: 'ind_xl',   name: 'Más de 1.500 m²',                        desc: 'Presupuesto a coordinar según dimensiones',                                         price: null },
  ],
};

const ADICIONALES: Adicional[] = [
  { id: 'plano',         name: 'Plano de planta',                    desc: 'Exportable en PDF',                                  price: 25 },
  { id: 'gmaps',         name: 'Integración Google Maps',            desc: 'Publicación en ficha del negocio',                   price: 20 },
  { id: 'hotspots_temp', name: 'Hotspots para alquiler temporario',  desc: 'Check-in, normas, WiFi, links de reserva',           price: 25 },
  { id: 'renovacion',    name: 'Renovación anual de hosting',        desc: 'Sin nuevo relevamiento',                             price: 30 },
];

// ── Componente ────────────────────────────────────────────────────────────────
export default function Calculadora() {
  const [segActivo, setSegActivo]     = useState<SegmentoId>('inmobiliaria');
  const [cantidades, setCantidades]   = useState<Record<string, number>>({});
  const [adicActivos, setAdicActivos] = useState<Record<string, boolean>>({});
  const [tc, setTc]                   = useState(USD_TO_ARS_DEFAULT);
  const [nombre, setNombre]           = useState('');
  const [enviado, setEnviado]         = useState(false);

  const prods = PRODUCTOS[segActivo];

  const cambiarQty = (id: string, delta: number) =>
    setCantidades((prev) => ({ ...prev, [id]: Math.max(0, (prev[id] || 0) + delta) }));

  const toggleAdic = (id: string) =>
    setAdicActivos((prev) => ({ ...prev, [id]: !prev[id] }));

  const selectSeg = (id: SegmentoId) => {
    setSegActivo(id);
    setCantidades({});
    setAdicActivos({});
  };

  const totalUnidades = () =>
    prods.filter((p) => p.price !== null).reduce((s, p) => s + (cantidades[p.id] || 0), 0);

  const tienePrecioACoorinar = () =>
    prods.some((p) => p.price === null && (cantidades[p.id] || 0) > 0);

  const calcTotal = () => {
    let total = 0;
    prods.forEach((p) => { if (p.price !== null) total += p.price * (cantidades[p.id] || 0); });
    ADICIONALES.forEach((a) => { if (adicActivos[a.id]) total += a.price * totalUnidades(); });
    return total;
  };

  const total     = calcTotal();
  const totalArs  = Math.round(total * tc);
  const unidades  = totalUnidades();
  const mostrarVolumen = unidades >= VOLUMEN_THRESHOLD;
  const tieneItems     = total > 0 || tienePrecioACoorinar();

  const handleContacto = () => {
    const seg   = SEGMENTOS.find((s) => s.id === segActivo)?.label || '';
    const lines: string[] = [];
    prods.forEach((p) => {
      const q = cantidades[p.id] || 0;
      if (q > 0) lines.push(p.price === null
        ? `• ${p.name} × ${q} — A coordinar`
        : `• ${p.name} × ${q} — USD ${p.price * q}`);
    });
    ADICIONALES.forEach((a) => {
      if (adicActivos[a.id] && unidades > 0)
        lines.push(`• ${a.name} × ${unidades} — USD ${a.price * unidades}`);
    });
    if (lines.length === 0) return;

    const partes = [
      `Hola! Soy ${nombre || 'un cliente'} y me interesa un presupuesto de TresDe Digital.`,
      ``, `*Segmento:* ${seg}`, ...lines, ``,
    ];
    if (total > 0)           partes.push(`*Total estimado:* USD ${total} (ARS ${totalArs.toLocaleString('es-AR')})`);
    if (tienePrecioACoorinar()) partes.push(`*Nota:* Algunos servicios requieren presupuesto personalizado.`);
    partes.push(``, `¿Pueden contactarme para coordinar?`);

    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(partes.join('\n'))}`, '_blank');
    setEnviado(true);
    setTimeout(() => setEnviado(false), 4000);
  };

  return (
    <section className="py-20 sm:py-24 bg-gray-50/50" aria-labelledby="calculadora-heading">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Encabezado de sección */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="w-16 h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent mb-6 mx-auto" />
          <span className="text-blue-600 font-bold tracking-[0.2em] text-xs uppercase mb-3 block">
            Calculá tu presupuesto
          </span>
          <h2
            id="calculadora-heading"
            className="text-3xl sm:text-4xl lg:text-5xl font-light text-gray-900 mb-4 tracking-tight"
          >
            ¿Qué espacio querés{' '}
            <span className="font-semibold text-blue-600">digitalizar?</span>
          </h2>
          <p className="text-sm text-gray-400 max-w-lg mx-auto">
            Precios válidos para Corrientes capital. Relevamientos fuera de la ciudad se coordinan por separado.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          className="space-y-6"
        >
          {/* Segmentos */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {SEGMENTOS.map((seg) => {
              const activo = segActivo === seg.id;
              return (
                <button
                  key={seg.id}
                  onClick={() => selectSeg(seg.id)}
                  className={`flex flex-col items-start gap-1 px-4 py-3 rounded-xl border text-left transition-all duration-200 ${
                    activo
                      ? 'bg-blue-600 border-blue-600 shadow-md'
                      : 'bg-white border-gray-200 hover:border-blue-300'
                  }`}
                >
                  <span className="text-xl">{seg.icon}</span>
                  <span className={`text-[13px] font-semibold leading-tight ${activo ? 'text-white' : 'text-gray-900'}`}>
                    {seg.label}
                  </span>
                  <span className={`text-[11px] leading-tight ${activo ? 'text-blue-100' : 'text-gray-400'}`}>
                    {seg.desc}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Productos */}
          <div>
            <p className="text-[11px] font-semibold tracking-[0.1em] text-gray-400 uppercase mb-2.5">
              Seleccioná el servicio
            </p>
            <div className="flex flex-col gap-2">
              {prods.map((p) => {
                const q = cantidades[p.id] || 0;
                const esCoorinar = p.price === null;
                return (
                  <div
                    key={p.id}
                    className={`flex items-center justify-between gap-3 px-4 py-3.5 rounded-xl border transition-all duration-200 ${
                      q > 0
                        ? 'border-blue-500 bg-white shadow-sm'
                        : 'border-gray-100 bg-gray-50/80'
                    }`}
                  >
                    <div className="flex-1 min-w-0">
                      <p className="text-[14px] font-medium text-gray-900 leading-tight">{p.name}</p>
                      <p className="text-[12px] text-gray-400 mt-0.5 leading-tight">{p.desc}</p>
                    </div>
                    <div className="flex items-center gap-3 flex-shrink-0">
                      {esCoorinar ? (
                        <span className="text-[12px] text-gray-400 font-medium min-w-[80px] text-right">A coordinar</span>
                      ) : (
                        <span className="text-[13px] font-semibold text-gray-900 min-w-[60px] text-right">
                          USD {p.price}
                        </span>
                      )}
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => cambiarQty(p.id, -1)}
                          className="w-7 h-7 flex items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-600 hover:border-blue-300 hover:text-blue-600 transition-colors text-base leading-none"
                          aria-label="Restar"
                        >
                          −
                        </button>
                        <span className="text-[14px] font-semibold text-gray-900 w-4 text-center">{q}</span>
                        <button
                          onClick={() => cambiarQty(p.id, 1)}
                          className="w-7 h-7 flex items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-600 hover:border-blue-300 hover:text-blue-600 transition-colors text-base leading-none"
                          aria-label="Sumar"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Adicionales */}
          {tieneItems && (
            <div>
              <p className="text-[11px] font-semibold tracking-[0.1em] text-gray-400 uppercase mb-2.5">
                Adicionales
              </p>
              <div className="flex flex-col gap-2">
                {ADICIONALES.map((a) => {
                  const on = !!adicActivos[a.id];
                  return (
                    <div
                      key={a.id}
                      onClick={() => toggleAdic(a.id)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl border cursor-pointer transition-all duration-200 ${
                        on ? 'border-blue-500 bg-white shadow-sm' : 'border-gray-100 bg-gray-50/80 hover:border-blue-200'
                      }`}
                    >
                      <div
                        className={`w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 transition-all duration-200 ${
                          on ? 'bg-blue-600 border-blue-600' : 'bg-white border-gray-300'
                        }`}
                      >
                        {on && <span className="text-white text-[10px] font-bold leading-none">✓</span>}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[13px] font-medium text-gray-900">{a.name}</p>
                        <p className="text-[11px] text-gray-400">{a.desc}</p>
                      </div>
                      <span className="text-[13px] font-semibold text-gray-900 flex-shrink-0">
                        {on && unidades > 0 ? `USD ${a.price * unidades}` : `+ USD ${a.price}`}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Alerta volumen */}
          {mostrarVolumen && (
            <div className="flex items-start gap-3 px-4 py-3 bg-amber-50 border border-amber-200 rounded-xl">
              <span className="text-base flex-shrink-0">💬</span>
              <p className="text-[13px] text-amber-800 leading-relaxed">
                Por {unidades} o más relevamientos, consultá nuestros{' '}
                <strong>precios por volumen</strong> — tenemos condiciones especiales para trabajos recurrentes.
              </p>
            </div>
          )}

          {/* Resumen + CTA */}
          {tieneItems && (
            <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm space-y-4">
              {/* Líneas de resumen */}
              <div className="space-y-1">
                {prods.map((p) => {
                  const q = cantidades[p.id] || 0;
                  if (!q) return null;
                  return (
                    <div key={p.id} className="flex justify-between text-[13px]">
                      <span className="text-gray-500">{p.name} × {q}</span>
                      <span className="font-medium text-gray-900">
                        {p.price === null ? 'A coordinar' : `USD ${p.price * q}`}
                      </span>
                    </div>
                  );
                })}
                {ADICIONALES.map((a) => {
                  if (!adicActivos[a.id] || !unidades) return null;
                  return (
                    <div key={a.id} className="flex justify-between text-[13px]">
                      <span className="text-gray-500">{a.name} × {unidades}</span>
                      <span className="font-medium text-gray-900">USD {a.price * unidades}</span>
                    </div>
                  );
                })}
              </div>

              {/* Total */}
              <div className="flex items-center justify-between border-t border-gray-100 pt-4">
                <span className="text-[15px] font-semibold text-gray-900">Total estimado</span>
                <div className="flex flex-col items-end gap-0.5">
                  {total > 0 && (
                    <span className="text-2xl font-bold text-gray-900 leading-none">USD {total}</span>
                  )}
                  {tienePrecioACoorinar() && (
                    <span className="text-[12px] text-gray-400">+ items a coordinar</span>
                  )}
                  {total > 0 && (
                    <span className="text-[12px] text-gray-400">
                      ≈ ARS {totalArs.toLocaleString('es-AR')}
                    </span>
                  )}
                </div>
              </div>

              <p className="text-[11px] text-gray-400 leading-relaxed">
                Precios orientativos válidos para Corrientes capital. Movilidad fuera de la ciudad y proyectos de gran escala se presupuestan por separado.
              </p>

              {/* CTA WhatsApp */}
              <div className="space-y-2.5 pt-1">
                <input
                  type="text"
                  placeholder="Tu nombre (opcional)"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  className="w-full px-4 py-2.5 text-[14px] border border-gray-200 rounded-xl bg-gray-50 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white transition-colors"
                />
                <button
                  onClick={handleContacto}
                  className="w-full py-3.5 px-6 bg-green-500 hover:bg-green-400 text-white text-[14px] font-semibold rounded-xl transition-colors duration-200 shadow-sm hover:shadow-md"
                >
                  {enviado ? '✓ Abriendo WhatsApp…' : 'Consultá este presupuesto por WhatsApp →'}
                </button>
                <p className="text-[11px] text-gray-400 text-center">
                  Te respondemos y coordinamos el relevamiento.
                </p>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
