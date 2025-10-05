"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import ContactForm from '../../homecomp/contactform/ContactForm'

const Services = () => {
  const services = [
    {
      title: "Custom Tailoring",
      description: "Bespoke tailoring services to create perfectly fitted garments that match your unique style and measurements.",
      icon: "🎯"
    },
    {
      title: "Fabric Consultation",
      description: "Expert guidance on selecting the perfect fabrics for your clothing needs, considering durability and comfort.",
      icon: "📚"
    },
    {
      title: "Alterations & Repairs",
      description: "Professional alteration services to ensure your clothes fit perfectly and repair services to extend garment life.",
      icon: "✂️"
    },
    {
      title: "Wardrobe Styling",
      description: "Personal styling consultations to help you build a cohesive and fashionable wardrobe that reflects your personality.",
      icon: "👔"
    },
    {
      title: "Bulk Orders",
      description: "Specialized services for corporate orders, wedding parties, and group events with competitive pricing.",
      icon: "👥"
    },
    {
      title: "Dry Cleaning",
      description: "Professional cleaning and maintenance services to keep your premium garments in perfect condition.",
      icon: "🧼"
    }
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission here
    console.log('Form submitted')
  }

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Our Services
        </h1>
        <p className="text-xl max-w-3xl mx-auto">
          At Oritina Cloth Store, we offer comprehensive clothing solutions tailored to your needs. 
          From custom tailoring to professional styling, we're here to elevate your wardrobe.
        </p>
      </div>

      {/* Services Grid */}
      <div className="max-w-7xl mx-auto mb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <div className="text-4xl mb-4">{service.icon}</div>
                <CardTitle className="text-xl">{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  {service.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Contact Form Section */}
      <div className="max-w-4xl mx-auto">
        <ContactForm />
      </div>

      {/* Additional Info */}
      <div className="max-w-4xl mx-auto mt-16 text-center">
        <Card>
          <CardContent className="p-8">
            <h3 className="text-2xl font-bold mb-4">Why Choose Oritina Cloth Store?</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h4 className="font-semibold mb-2">🎖️ Expert Craftsmanship</h4>
                <p className="text-sm">Years of experience in delivering quality clothing solutions</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">⏱️ Quick Turnaround</h4>
                <p className="text-sm">Efficient services without compromising on quality</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">💯 Customer Satisfaction</h4>
                <p className="text-sm">We guarantee your satisfaction with our services</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default Services