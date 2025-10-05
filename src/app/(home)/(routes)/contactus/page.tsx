"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import ContactForm from '../../homecomp/contactform/ContactForm'

const ContactUs = () => {
  const contactInfo = [
    {
      title: "Visit Our Store",
      description: "Come visit us at our physical location to experience our fabrics and services in person.",
      details: "123 Fashion Street\nStyle District, City 10001",
      icon: "🏪"
    },
    {
      title: "Call Us",
      description: "Speak directly with our customer service team during business hours.",
      details: "+1 (555) 123-4567\nMon-Sat: 9AM-7PM",
      icon: "📞"
    },
    {
      title: "Email Us",
      description: "Send us an email and we'll respond within 24 hours.",
      details: "hello@oritina.com\nsupport@oritina.com",
      icon: "✉️"
    }
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission here
    console.log('Contact form submitted')
  }

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Contact Us
        </h1>
        <p className="text-xl max-w-3xl mx-auto">
          Get in touch with Oritina Cloth Store. We're here to help you with all your clothing needs and answer any questions you may have.
        </p>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Contact Information */}
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Get in Touch</CardTitle>
              <CardDescription>
                We'd love to hear from you. Choose the most convenient way to reach us.
              </CardDescription>
            </CardHeader>
          </Card>

          {contactInfo.map((info, index) => (
            <Card key={index} className="hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <div className="text-3xl mb-2">{info.icon}</div>
                <CardTitle className="text-lg">{info.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="mb-3">
                  {info.description}
                </CardDescription>
                <p className="text-sm whitespace-pre-line">
                  {info.details}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Contact Form */}
        <ContactForm />
      </div>

      {/* FAQ Section */}
      <div className="max-w-4xl mx-auto mt-16">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Frequently Asked Questions</CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            <div className="space-y-6">
              <div>
                <h4 className="font-semibold mb-2">What are your business hours?</h4>
                <p className="text-sm">
                  We're open Monday through Saturday from 9:00 AM to 7:00 PM. Closed on Sundays.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">How long do alterations usually take?</h4>
                <p className="text-sm">
                  Standard alterations take 3-5 business days. Rush services are available for an additional fee.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Do you offer virtual consultations?</h4>
                <p className="text-sm">
                  Yes! We offer virtual styling consultations via video call. Book through our contact form.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">What is your return policy?</h4>
                <p className="text-sm">
                  Custom-tailored items cannot be returned, but we offer free adjustments. Ready-made items can be returned within 14 days with tags attached.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default ContactUs