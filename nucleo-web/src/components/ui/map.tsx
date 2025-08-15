"use client"

export function Map() {
  return (
    <section className="py-16 lg:py-24 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-slate-900 mb-4 tracking-tight">
            Encuéntranos
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto font-light">
            Visítanos en San José, Costa Rica. Te esperamos con los brazos abiertos.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Map Display */}
          <div className="bg-white rounded-2xl overflow-hidden shadow-lg">
            <div className="aspect-[16/9] w-full relative">
              {/* Waze Live Map Embed */}
              <iframe
                src="https://embed.waze.com/iframe?zoom=16&lat=9.932023&lon=-84.064926&ct=livemap"
                title="Ubicación de Núcleo en Waze"
                className="w-full h-full border-0"
                allowFullScreen
                loading="lazy"
              />
              
              {/* Waze-style overlay with location info */}
              <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm rounded-xl px-4 py-3 shadow-lg border border-slate-200">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                    </svg>
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-slate-900">Núcleo</div>
                    <div className="text-xs text-slate-600">San José, Costa Rica</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Location Details */}
          <div className="mt-8 text-center">
            <div className="inline-flex items-center space-x-2 bg-white rounded-xl px-6 py-3 shadow-md">
              <svg className="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="text-slate-700 font-medium">San José, Costa Rica</span>
            </div>
            
            <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://www.waze.com/live-map/directions?navigate=yes&utm_campaign=default&utm_source=waze_website&utm_medium=lm_share_location&to=ll.9.93202305%2C-84.06492591"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-8 py-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium shadow-lg hover:shadow-xl"
              >
                <svg className="w-6 h-6 mr-3" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                </svg>
                Abrir en Waze
              </a>
              
              <a
                href="https://maps.google.com/?q=9.93202305,-84.06492591"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-8 py-4 bg-slate-200 text-slate-700 rounded-xl hover:bg-slate-300 transition-colors font-medium shadow-lg hover:shadow-xl"
              >
                <svg className="w-6 h-6 mr-3" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                </svg>
                Abrir en Google Maps
              </a>
            </div>
            
            <p className="mt-4 text-sm text-slate-500">
              Haz clic en cualquiera de los botones para obtener direcciones
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
