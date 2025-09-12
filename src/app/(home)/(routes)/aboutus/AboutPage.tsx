"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Image from 'next/image'
import { Target, Eye, Heart, Award, Calendar, MapPin, ArrowRight, Sparkles, Shield, CheckCircle } from 'lucide-react'

const AboutPage = () => {
  const values = [
    {
      icon: <Eye className="h-10 w-10" />,
      title: "Vision",
      description: "To redefine fashion through innovation, quality, and conscious design that inspires confidence."
    },
    {
      icon: <Heart className="h-10 w-10" />,
      title: "Passion",
      description: "We pour our hearts into every design, creating pieces that tell stories and evoke emotion."
    },
    {
      icon: <Target className="h-10 w-10" />,
      title: "Purpose",
      description: "Driven by our commitment to sustainability and positive impact on our community and planet."
    }
  ]

  const milestones = [
    { year: "2015", event: "Founded with a small studio in New York" },
    { year: "2017", event: "Launched first sustainable collection" },
    { year: "2019", event: "Featured in Vogue and other major publications" },
    { year: "2021", event: "Opened flagship store in London" },
    { year: "2023", event: "Reached 1 million customers worldwide" }
  ]

  const processSteps = [
    {
      step: "01",
      title: "Concept & Design",
      description: "Our designers draw inspiration from global trends, art, and nature to create unique concepts.",
      icon: <Sparkles className="h-8 w-8" />
    },
    {
      step: "02",
      title: "Material Sourcing",
      description: "We carefully select sustainable, high-quality materials from ethical suppliers worldwide.",
      icon: <Shield className="h-8 w-8" />
    },
    {
      step: "03",
      title: "Artisan Crafting",
      description: "Skilled artisans bring our designs to life with meticulous attention to detail and quality.",
      icon: <CheckCircle className="h-8 w-8" />
    },
    {
      step: "04",
      title: "Quality Assurance",
      description: "Every product undergoes rigorous quality checks to ensure it meets our high standards.",
      icon: <Award className="h-8 w-8" />
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-[500px] w-full">
        <Image
          src="/clothimage/about1.jpg"
          alt="Our creative process"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="absolute inset-0 flex items-center justify-center text-center">
          <div className="max-w-4xl px-4">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">Our Story</h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              From a small idea to a movement redefining fashion with purpose and passion.
            </p>
          </div>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-16 px-4 container mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <Badge variant="outline" className="mb-4">Since 2015</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Crafting the Future of Fashion</h2>
            <p className="text-muted-foreground text-lg mb-4">
              We began as a small team of designers with a shared vision: to create clothing that not only looks good but does good. 
              Our journey started in a tiny studio, fueled by passion and a commitment to change the fashion industry from within.
            </p>
            <p className="text-muted-foreground text-lg mb-8">
              Today, we're proud to have grown into a community of creators, innovators, and change-makers who believe that fashion 
              should be sustainable, inclusive, and empowering for all.
            </p>
            <Button>
              Explore Our Collections <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
          <div className="relative h-[400px] rounded-lg overflow-hidden">
            <Image
              src="/clothimage/about2.jpg"
              alt="Our design process"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge variant="outline" className="mb-4">Our Philosophy</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Values That Define Us</h2>
            <p className="text-muted-foreground text-lg">
              These core principles guide everything we do, from design to delivery and beyond.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="text-center border-0 shadow-lg">
                <CardHeader>
                  <div className="flex justify-center mb-4">
                    <div className="p-3 bg-primary/10 rounded-full text-primary">
                      {value.icon}
                    </div>
                  </div>
                  <CardTitle>{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-lg">
                    {value.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Our Process Section (Replaces Team Section) */}
      <section className="py-16 container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="outline" className="mb-4">How We Work</Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Creative Process</h2>
          <p className="text-muted-foreground text-lg">
            Every piece we create goes through a meticulous journey from concept to completion.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {processSteps.map((step, index) => (
            <Card key={index} className="text-center border-0 shadow-md hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    {step.icon}
                  </div>
                </div>
                <div className="text-sm text-primary font-semibold mb-2">Step {step.step}</div>
                <CardTitle className="text-xl">{step.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  {step.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Milestones Section - Fixed */}
      <section className="py-16 bg-primary/5">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge variant="outline" className="mb-4">Our Journey</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Milestones & Achievements</h2>
            <p className="text-muted-foreground text-lg">
              Key moments that have shaped our growth and impact over the years.
            </p>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-primary/20"></div>
            
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div key={index} className="relative flex items-center justify-between">
                  {/* Left side content (even indexes) */}
                  <div className={`w-5/12 ${index % 2 === 0 ? '' : 'invisible'}`}>
                    <Card className="ml-auto mr-8 w-full max-w-md">
                      <CardHeader>
                        <div className="flex items-center gap-2 mb-2">
                          <Calendar className="h-5 w-5 text-primary" />
                          <CardTitle>{milestone.year}</CardTitle>
                        </div>
                        <CardDescription className="text-lg">{milestone.event}</CardDescription>
                      </CardHeader>
                    </Card>
                  </div>
                  
                  {/* Timeline dot */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 z-10">
                    <div className="w-6 h-6 rounded-full bg-primary border-4 border-white"></div>
                  </div>
                  
                  {/* Right side content (odd indexes) */}
                  <div className={`w-5/12 ${index % 2 !== 0 ? '' : 'invisible'}`}>
                    <Card className="mr-auto ml-8 w-full max-w-md">
                      <CardHeader>
                        <div className="flex items-center gap-2 mb-2">
                          <Calendar className="h-5 w-5 text-primary" />
                          <CardTitle>{milestone.year}</CardTitle>
                        </div>
                        <CardDescription className="text-lg">{milestone.event}</CardDescription>
                      </CardHeader>
                    </Card>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 container mx-auto px-4">
        <Card className="text-center border-0 py-12 shadow-xl">
          <CardHeader>
            <CardTitle className="text-3xl">Join Our Journey</CardTitle>
            <CardDescription className="text-lg">
              Become part of our story and discover fashion that makes a difference.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="default" size="lg">
              Shop Now
            </Button>
            <Button variant="outline" size="lg">
              Contact Us
            </Button>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}

export default AboutPage