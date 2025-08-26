import { FaTruck, FaShieldAlt, FaExchangeAlt, FaTags, FaHeadset, FaTshirt } from 'react-icons/fa';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const Services = () => {
  const services = [
    {
      icon: <FaTruck className="text-3xl text-blue-600" />,
      title: "Fast & Free Shipping",
      description: "Free shipping on all orders over $50. Get your favorite tees delivered quickly to your doorstep."
    },
    {
      icon: <FaShieldAlt className="text-3xl text-green-600" />,
      title: "Secure Payment",
      description: "Shop with confidence. Our payment system is encrypted and secure for all your transactions."
    },
    {
      icon: <FaExchangeAlt className="text-3xl text-purple-600" />,
      title: "Easy Returns",
      description: "Not satisfied? We offer 30-day hassle-free returns on all unused items."
    },
    {
      icon: <FaTags className="text-3xl text-orange-600" />,
      title: "Great Discounts",
      description: "Regular sales, seasonal discounts, and special offers on premium quality t-shirts."
    },
    {
      icon: <FaHeadset className="text-3xl text-red-600" />,
      title: "24/7 Support",
      description: "Our customer service team is always ready to help with any questions or concerns."
    },
    {
      icon: <FaTshirt className="text-3xl text-indigo-600" />,
      title: "Premium Quality",
      description: "All our t-shirts are made from high-quality materials for maximum comfort and durability."
    }
  ];

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Why Choose <span className='uppercase'>Oritina</span>?
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            We're committed to providing the best t-shirt shopping experience with premium products and exceptional service.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <Card 
              key={index} 
              className="h-full transition-all duration-300 hover:shadow-lg border-gray-200 dark:border-gray-800"
            >
              <CardHeader className="pb-4">
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-gray-100 dark:bg-gray-800 rounded-full">
                    {service.icon}
                  </div>
                </div>
                <CardTitle className="text-center text-xl">{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center text-base">
                  {service.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;