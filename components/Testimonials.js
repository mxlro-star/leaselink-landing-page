export default function Testimonials() {
  return (
    <section className="py-16 bg-gradient-to-b from-gray-50 to-white animate-fadeIn">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-gray-800">
          Success Stories from Satisfied Landlords
        </h2>
        <p className="text-center text-lg mb-12 text-gray-600 max-w-3xl mx-auto">
          Our trusted service has helped numerous landlords achieve consistent rental income and stress-free property management.
        </p>
        <div className="flex space-x-6 overflow-x-auto py-4 px-2 -mx-2">
          <div className="min-w-[300px] card-neumorphic rounded-xl p-8 interactive-hover">
            <div className="text-primary text-4xl mb-4">⭐️</div>
            <p className="italic mb-6 text-gray-600">
              "Thanks to this service, I never had to worry about tenant issues again!"
            </p>
            <div className="flex items-center">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold">
                JD
              </div>
              <div className="ml-4">
                <h4 className="font-semibold text-gray-800">John Doe</h4>
                <p className="text-gray-600 text-sm">Landlord</p>
              </div>
            </div>
          </div>
          
          <div className="min-w-[300px] card-neumorphic rounded-xl p-8 interactive-hover">
            <div className="text-primary text-4xl mb-4">⭐️</div>
            <p className="italic mb-6 text-gray-600">
              "A hassle-free and reliable way to generate income from my property."
            </p>
            <div className="flex items-center">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold">
                JS
              </div>
              <div className="ml-4">
                <h4 className="font-semibold text-gray-800">Jane Smith</h4>
                <p className="text-gray-600 text-sm">Property Owner</p>
              </div>
            </div>
          </div>
          
          <div className="min-w-[300px] card-neumorphic rounded-xl p-8 interactive-hover">
            <div className="text-primary text-4xl mb-4">⭐️</div>
            <p className="italic mb-6 text-gray-600">
              "Professional and efficient. Highly recommended!"
            </p>
            <div className="flex items-center">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold">
                AJ
              </div>
              <div className="ml-4">
                <h4 className="font-semibold text-gray-800">Alex Johnson</h4>
                <p className="text-gray-600 text-sm">Landlord</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 