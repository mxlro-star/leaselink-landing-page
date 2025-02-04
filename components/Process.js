export default function Process() {
  return (
    <section className="py-16 animate-fadeIn bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">
          How It Works
        </h2>
        <div className="flex flex-col md:flex-row justify-between relative">
          {/* Timeline line for desktop */}
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-trust transform -translate-y-1/2" />
          
          <div className="flex-1 text-center p-6 card-neumorphic rounded-xl mb-8 md:mb-0 md:mr-4 relative">
            <div className="bg-trust text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold shadow-lg">1</div>
            <h3 className="text-xl font-semibold mb-2 text-gray-800">Submit Your Property</h3>
            <p className="text-gray-600">Fill out a quick form with your property details. Expect a follow-up within 24 hours.</p>
          </div>
          
          <div className="flex-1 text-center p-6 card-neumorphic rounded-xl mb-8 md:mb-0 md:mx-4 relative">
            <div className="bg-trust text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold shadow-lg">2</div>
            <h3 className="text-xl font-semibold mb-2 text-gray-800">Get Matched</h3>
            <p className="text-gray-600">We identify the best company lease tenant tailored to buy-to-let investors, portfolio, and accidental landlords.</p>
          </div>
          
          <div className="flex-1 text-center p-6 card-neumorphic rounded-xl mb-8 md:mb-0 md:mx-4 relative">
            <div className="bg-trust text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold shadow-lg">3</div>
            <h3 className="text-xl font-semibold mb-2 text-gray-800">Sign Agreement</h3>
            <p className="text-gray-600">Secure a legally binding contract with our pre-designed templates to protect your interests.</p>
          </div>
          
          <div className="flex-1 text-center p-6 card-neumorphic rounded-xl md:ml-4 relative">
            <div className="bg-trust text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold shadow-lg">4</div>
            <h3 className="text-xl font-semibold mb-2 text-gray-800">Start Earning</h3>
            <p className="text-gray-600">Receive guaranteed monthly payments with a hassle-free, streamlined process.</p>
          </div>
        </div>
      </div>
    </section>
  );
} 