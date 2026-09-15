import React from 'react';

export const DressCode: React.FC = () => {
  return (
    <section id="dress-code" className="py-20 sm:py-28 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 sm:mb-20">
          <span className="font-serif tracking-[0.25em] text-xs uppercase text-[#DF806E] font-bold block mb-2">
            O QUE VESTIR
          </span>
          <h2 className="font-script text-3xl sm:text-4xl md:text-5xl text-[#3E483D] font-normal mb-3">
            Dress Code
          </h2>
          <div className="w-12 h-[1px] bg-[#7F9078]/40 mx-auto mb-4" />
          <p className="font-serif text-base sm:text-lg text-[#2B332A] font-light max-w-xl mx-auto">
            <strong className="font-semibold text-[#3E483D]">Traje Esporte Fino.</strong> Pedimos gentilmente que evitem branco e verde menta.
          </p>
        </div>

        {/* 2 Inspiration Cards: Lado a lado no tablet e computador (md:grid-cols-2) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 items-stretch">
          
          {/* Elas */}
          <div className="bg-white rounded-3xl border border-[#7F9078]/20 shadow-sm overflow-hidden flex flex-col hover:shadow-md transition-shadow">
            {/* Imagem com altura padronizada para alinhamento uniforme */}
            <div className="w-full bg-white flex items-end justify-center p-2 sm:p-3 pb-0 h-64 sm:h-80 md:h-84 lg:h-96 xl:h-[420px]">
              <img
                src="/dress-code-elas.png?v=2"
                alt="Inspiração de vestidos elegantes para o dress code Elas"
                className="w-full h-full object-contain object-bottom"
                loading="lazy"
              />
            </div>

            <div className="px-4 pb-5 pt-2 sm:px-5 sm:pb-6 md:px-6 md:pb-6 lg:px-7 lg:pb-7 flex-1 flex flex-col justify-between">
              {/* Header com estilo script */}
              <div className="text-center mb-3 sm:mb-4 -mt-1 sm:-mt-2">
                <div className="flex items-center justify-center gap-2 sm:gap-3">
                  <div className="h-[1px] w-6 sm:w-12 bg-[#7F9078]/30" />
                  <h3 className="font-script text-3xl sm:text-4xl lg:text-5xl text-[#3E483D] font-normal px-2">
                    Elas
                  </h3>
                  <div className="h-[1px] w-6 sm:w-12 bg-[#7F9078]/30" />
                </div>
              </div>

              {/* 4 Colunas no celular/desktop e grade equilibrada 2x2 no tablet */}
              <div className="grid grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-3.5 xl:gap-2 xl:divide-x xl:divide-[#7F9078]/25 text-center">
                
                {/* 1. VESTIDOS */}
                <div className="px-1.5 sm:px-2 flex flex-col items-center">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center mb-1 sm:mb-1.5">
                    {/* Ícone de Vestido */}
                    <svg viewBox="0 0 24 24" fill="none" stroke="#2B332A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                      <path d="M9 3h6l1.5 4.5-2.5 1.5 4 12H6l4-12-2.5-1.5L9 3z" />
                      <path d="M9 3c0 2 6 2 6 0" />
                      <path d="M8 11h8" />
                    </svg>
                  </div>
                  <span className="font-serif text-[11px] sm:text-xs font-medium uppercase tracking-wider text-[#3E483D] mb-1 block">
                    VESTIDOS
                  </span>
                  <p className="font-serif text-xs sm:text-[12px] lg:text-[13px] leading-relaxed text-[#2B332A] font-light">
                    Longos ou curtos elegantes. Tecidos fluidos e sofisticados.
                  </p>
                </div>

                {/* 2. SAPATOS */}
                <div className="px-1.5 sm:px-2 flex flex-col items-center">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center mb-1 sm:mb-1.5">
                    {/* Ícone de Salto / Sapato */}
                    <svg viewBox="0 0 24 24" fill="none" stroke="#2B332A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                      <path d="M4 17c2-1 5-2 9-2 2 0 4 2 6 2l1-4c-2 0-3-2-5-5l-2-3H9v2l2 4c-3 1-5 3-7 6z" />
                      <path d="M19 15v5" />
                    </svg>
                  </div>
                  <span className="font-serif text-[11px] sm:text-xs font-medium uppercase tracking-wider text-[#3E483D] mb-1 block">
                    SAPATOS
                  </span>
                  <p className="font-serif text-xs sm:text-[12px] lg:text-[13px] leading-relaxed text-[#2B332A] font-light">
                    Sandálias, scarpins ou saltos bloco. Conforto e elegância sempre combinam.
                  </p>
                </div>

                {/* 3. ACESSÓRIOS */}
                <div className="px-1.5 sm:px-2 flex flex-col items-center">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center mb-1 sm:mb-1.5">
                    {/* Ícone de Bolsa de Mão */}
                    <svg viewBox="0 0 24 24" fill="none" stroke="#2B332A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                      <rect x="4" y="9" width="16" height="11" rx="3" />
                      <path d="M8 9V6a4 4 0 0 1 8 0v3" />
                      <circle cx="12" cy="14.5" r="1" fill="#2B332A" />
                    </svg>
                  </div>
                  <span className="font-serif text-[11px] sm:text-xs font-medium uppercase tracking-wider text-[#3E483D] mb-1 block">
                    ACESSÓRIOS
                  </span>
                  <p className="font-serif text-xs sm:text-[12px] lg:text-[13px] leading-relaxed text-[#2B332A] font-light">
                    Bolsas de mão e joias delicadas complementam o look.
                  </p>
                </div>

                {/* 4. CLIMA */}
                <div className="px-1.5 sm:px-2 flex flex-col items-center">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center mb-1 sm:mb-1.5">
                    {/* Ícone de Pashmina / Casaco */}
                    <svg viewBox="0 0 24 24" fill="none" stroke="#2B332A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                      <path d="M8 4c2-1 6-1 8 0 1 3 3 10 3 16H5c0-6 2-13 3-16z" />
                      <path d="M12 4v16" />
                      <path d="M9 8c2 1 4 1 6 0" />
                    </svg>
                  </div>
                  <span className="font-serif text-[11px] sm:text-xs font-medium uppercase tracking-wider text-[#3E483D] mb-1 block">
                    CLIMA
                  </span>
                  <p className="font-serif text-xs sm:text-[12px] lg:text-[13px] leading-relaxed text-[#2B332A] font-light">
                    Para a festa à tarde, leve uma pashmina ou casaquinho leve para o final do dia.
                  </p>
                </div>

              </div>
            </div>
          </div>

          {/* Eles */}
          <div className="bg-white rounded-3xl border border-[#7F9078]/20 shadow-sm overflow-hidden flex flex-col hover:shadow-md transition-shadow">
            {/* Imagem com altura padronizada para alinhamento uniforme */}
            <div className="w-full bg-white flex items-end justify-center p-2 sm:p-3 pb-0 h-64 sm:h-80 md:h-84 lg:h-96 xl:h-[420px]">
              <img
                src="/dress-code-eles.png?v=2"
                alt="Inspiração de trajes e combinações para o dress code Eles"
                className="w-full h-full object-contain object-bottom"
                loading="lazy"
              />
            </div>

            <div className="px-4 pb-5 pt-2 sm:px-5 sm:pb-6 md:px-6 md:pb-6 lg:px-7 lg:pb-7 flex-1 flex flex-col justify-between">
              {/* Header com estilo script */}
              <div className="text-center mb-3 sm:mb-4 -mt-1 sm:-mt-2">
                <div className="flex items-center justify-center gap-2 sm:gap-3">
                  <div className="h-[1px] w-6 sm:w-12 bg-[#7F9078]/30" />
                  <h3 className="font-script text-3xl sm:text-4xl lg:text-5xl text-[#3E483D] font-normal px-2">
                    Eles
                  </h3>
                  <div className="h-[1px] w-6 sm:w-12 bg-[#7F9078]/30" />
                </div>
              </div>

              {/* 4 Colunas no celular/desktop e grade equilibrada 2x2 no tablet */}
              <div className="grid grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-3.5 xl:gap-2 xl:divide-x xl:divide-[#7F9078]/25 text-center">
                
                {/* 1. TERNOS E BLAZERS */}
                <div className="px-1.5 sm:px-2 flex flex-col items-center">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center mb-1 sm:mb-1.5">
                    {/* Ícone de Terno / Blazer */}
                    <svg viewBox="0 0 24 24" fill="none" stroke="#2B332A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                      <path d="M6 3l3 9-3 9h12l-3-9 3-9H6z" />
                      <path d="M12 3v9" />
                      <path d="M9 3l3 6 3-6" />
                      <path d="M9.5 12h5" />
                    </svg>
                  </div>
                  <span className="font-serif text-[11px] sm:text-xs font-medium uppercase tracking-wider text-[#3E483D] mb-1 block">
                    TERNOS E BLAZERS
                  </span>
                  <p className="font-serif text-xs sm:text-[12px] lg:text-[13px] leading-relaxed text-[#2B332A] font-light">
                    Ternos ou blazers são bem-vindos. Você pode optar por looks mais leves, em tons claros ou escuros.
                  </p>
                </div>

                {/* 2. CAMISAS */}
                <div className="px-1.5 sm:px-2 flex flex-col items-center">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center mb-1 sm:mb-1.5">
                    {/* Ícone de Camisa Social */}
                    <svg viewBox="0 0 24 24" fill="none" stroke="#2B332A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                      <path d="M6 4l3 3h6l3-3 2 5-3 2v10H7V11L4 9l2-5z" />
                      <path d="M9 7l3 3 3-3" />
                      <path d="M12 10v11" />
                    </svg>
                  </div>
                  <span className="font-serif text-[11px] sm:text-xs font-medium uppercase tracking-wider text-[#3E483D] mb-1 block">
                    CAMISAS
                  </span>
                  <p className="font-serif text-xs sm:text-[12px] lg:text-[13px] leading-relaxed text-[#2B332A] font-light">
                    Camisas sociais de manga longa ou curta, em tons neutros ou suaves.
                  </p>
                </div>

                {/* 3. GRAVATAS */}
                <div className="px-1.5 sm:px-2 flex flex-col items-center">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center mb-1 sm:mb-1.5">
                    {/* Ícone de Gravata */}
                    <svg viewBox="0 0 24 24" fill="none" stroke="#2B332A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                      <path d="M10 3h4l1 3-2 1 2 11-3 3-3-3 2-11-2-1 1-3z" />
                      <path d="M11 6h2" />
                    </svg>
                  </div>
                  <span className="font-serif text-[11px] sm:text-xs font-medium uppercase tracking-wider text-[#3E483D] mb-1 block">
                    GRAVATAS
                  </span>
                  <p className="font-serif text-xs sm:text-[12px] lg:text-[13px] leading-relaxed text-[#2B332A] font-light">
                    O uso é opcional. Se for usar, escolha tons que harmonizem com o look.
                  </p>
                </div>

                {/* 4. SAPATOS */}
                <div className="px-1.5 sm:px-2 flex flex-col items-center">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center mb-1 sm:mb-1.5">
                    {/* Ícone de Sapato Masculino / Mocassim */}
                    <svg viewBox="0 0 24 24" fill="none" stroke="#2B332A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                      <path d="M2 17c1.5 0 3-1 6-1h10c2 0 3-1 4-3l-2-2c-3-2-6-2-8-1l-3 3-4-1-2 3c-1 1-1 2-1 2z" />
                      <path d="M2 17v2h4v-2" />
                      <path d="M10 16v3h11v-3" />
                    </svg>
                  </div>
                  <span className="font-serif text-[11px] sm:text-xs font-medium uppercase tracking-wider text-[#3E483D] mb-1 block">
                    SAPATOS
                  </span>
                  <p className="font-serif text-xs sm:text-[12px] lg:text-[13px] leading-relaxed text-[#2B332A] font-light">
                    Sapatos sociais ou mocassins completam o visual com elegância.
                  </p>
                </div>

              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
