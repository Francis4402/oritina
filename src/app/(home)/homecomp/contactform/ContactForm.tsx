import { contactusValidation, contactusValidationSchema } from '@/app/zodvalidation/contactusvalidation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { sendMessage } from '@/services/SendMessages'
import { zodResolver } from '@hookform/resolvers/zod'
import { useSession } from 'next-auth/react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'sonner'


const ContactForm = () => {

    const {data: session} = useSession();

    const form = useForm({
        resolver: zodResolver(contactusValidationSchema),
        defaultValues: {
            name: "",
            email: "",
            phone: "",
            message: ""
        }
    });

    const {formState: {isSubmitting}} = form;

    const onSubmit: SubmitHandler<contactusValidation> = async (data) => {
        try {
            const res = await sendMessage(data);

            if (res) {
                toast.success("Message Sent Successfully");

                form.reset();
            } else {
                toast.error("Message Send Failed");
            }
        } catch (error) {
            console.log(error);
        }
    }

  return (
    <div className="lg:col-span-2">
        <Card className="shadow-lg">
            <CardHeader className="text-center">
            <CardTitle className="text-3xl">Send us a Message</CardTitle>
            <CardDescription className="text-lg">
                Fill out the form below and we'll get back to you as soon as possible.
            </CardDescription>
            </CardHeader>
            <CardContent className="p-8">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                            <FormField control={form.control} name='name' render={({field}) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input type='text' {...field} value={field.value} placeholder='Enter Your Name' />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FormField control={form.control} name='email' render={({field}) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input type='email' {...field} value={field.value} placeholder='Enter Your Email' />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />

                            <FormField control={form.control} name='phone' render={({field}) => (
                                <FormItem>
                                    <FormLabel>Phone</FormLabel>
                                    <FormControl>
                                        <Input {...field} value={field.value} placeholder='Enter Your Phone' />
                                    </FormControl>
                                </FormItem>
                            )} />
                        </div>
                    
                        
                        <FormField control={form.control} name='message' render={({field}) => (
                            <FormItem>
                                <FormLabel>Message</FormLabel>
                                <FormControl>
                                    <Textarea {...field} value={field.value} placeholder='Enter Your Message' />
                                </FormControl>
                            </FormItem>
                        )} />
                        
                        <Button 
                            type="submit" 
                            
                            disabled={isSubmitting}
                            >
                            {isSubmitting ? "Sending..." : "Send Message"}
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    </div>
  )
}

export default ContactForm