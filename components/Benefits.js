export default function Benefits() {
  return (
    <section className="py-16 bg-gradient-to-b from-gray-50 to-white animate-fadeIn">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-gray-800">
          Why Choose a Company Lease?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="card-neumorphic p-6 rounded-xl interactive-hover">
            <div className="text-primary text-4xl mb-4">💰</div>
            <h3 className="text-xl font-semibold mb-2 text-gray-800">Guaranteed Rent</h3>
            <p className="text-gray-600">No void periods, consistent income.</p>
          </div>
          <div className="card-neumorphic p-6 rounded-xl interactive-hover">
            <div className="text-primary text-4xl mb-4">🏠</div>
            <h3 className="text-xl font-semibold mb-2 text-gray-800">Stress-Free Management</h3>
            <p className="text-gray-600">
              Tenant handling is done for landlords. Enjoy a free consultation and legal
              agreement templates to ensure hassle-free onboarding.
            </p>
          </div>
          <div className="card-neumorphic p-6 rounded-xl interactive-hover">
            <div className="text-primary text-4xl mb-4">🔧</div>
            <h3 className="text-xl font-semibold mb-2 text-gray-800">Property Maintenance</h3>
            <p className="text-gray-600">Maintenance is covered by the provider.</p>
          </div>
          <div className="card-neumorphic p-6 rounded-xl interactive-hover">
            <div className="text-primary text-4xl mb-4">📋</div>
            <h3 className="text-xl font-semibold mb-2 text-gray-800">Long-Term Leases</h3>
            <p className="text-gray-600">Secure 3-10 year contracts.</p>
          </div>
        </div>
      </div>
    </section>
  );
} 