import React from 'react';

export const DressCode: React.FC = () => {
  return (
    <section id="dress-code" className="py-20 sm:py-28 bg-[#F7F2E9]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 sm:mb-20">
          <span className="font-serif tracking-[0.25em] text-xs uppercase text-[#F3B99A] font-normal block mb-2">
            O QUE VESTIR
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl text-[#3E483D] font-normal tracking-tight mb-4">
            Dress Code
          </h2>
          <div className="w-12 h-[1px] bg-[#7F9078]/40 mx-auto mb-4" />
          <p className="font-serif text-base sm:text-lg text-[#505F4E] font-light max-w-xl mx-auto">
            <strong className="font-semibold text-[#3E483D]">Traje Esporte Fino.</strong> Pedimos gentilmente que evitem branco e verde menta.
          </p>
        </div>

        {/* 2 Inspiration Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          
          {/* Elas */}
          <div className="bg-white rounded-3xl border border-[#7F9078]/20 shadow-sm overflow-hidden flex flex-col hover:shadow-md transition-shadow">
            <div className="h-72 sm:h-80 overflow-hidden relative bg-[#E8A7A0]/10">
              <img
                src="https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?q=80&w=900&auto=format&fit=crop"
                alt="Inspiração de vestido fluido e elegante para casamento"
                className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-700"
              />
            </div>

            <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="font-serif text-2xl sm:text-3xl text-[#3E483D] font-normal mb-2">
                  Elas
                </h3>
                <p className="font-serif text-base sm:text-lg leading-relaxed text-[#505F4E] font-normal">
                  Dicas: Vestidos mídi ou longos em tecidos leves e elegantes. Saltos, sandálias e scarpins (sinta-se à vontade para levar rasteirinha ou sandália baixa para a festa). Acessórios como bolsas, joias e bijus para trazer harmonia.
                </p>
              </div>
            </div>
          </div>

          {/* Eles */}
          <div className="bg-white rounded-3xl border border-[#7F9078]/20 shadow-sm overflow-hidden flex flex-col hover:shadow-md transition-shadow">
            <div className="h-72 sm:h-80 overflow-hidden relative bg-[#A8C3AE]/10">
              <img
                src="https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=900&auto=format&fit=crop"
                alt="Inspiração de homem com calça social, camisa e blazer elegante de casamento"
                className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-700"
              />
            </div>

            <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="font-serif text-2xl sm:text-3xl text-[#3E483D] font-normal mb-2">
                  Eles
                </h3>
                <p className="font-serif text-base sm:text-lg leading-relaxed text-[#505F4E] font-normal">
                  Dicas: Calça social ou sarja com camisa. Blazer e gravata opcionais para complementar o look. Sapato social e mocassim para os pés.
                </p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
