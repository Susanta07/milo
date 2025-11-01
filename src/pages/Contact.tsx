import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Phone, Mail, MapPin, MessageCircle } from "lucide-react";
import { toast } from "sonner";
import { getCartCount } from "@/lib/cart";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Please fill in all fields");
      return;
    }

    const whatsappMessage = `
*Contact Form Message*

Name: ${formData.name}
Email: ${formData.email}

Message:
${formData.message}
    `.trim();

    const whatsappUrl = `https://wa.me/918001627251?text=${encodeURIComponent(whatsappMessage)}`;
    window.open(whatsappUrl, "_blank");

    toast.success("Message sent! We'll contact you soon.");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header cartCount={getCartCount()} />
      <main className="flex-1">
        <section className="py-12 md:py-16 bg-gradient-to-b from-background to-accent/20">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-12 animate-fade-up">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Get in Touch</h1>
              <p className="text-muted-foreground text-lg">
                We'd love to hear from you. Send us a message!
              </p>
            </div>

            <div className="grid gap-8 lg:grid-cols-2">
              <div className="animate-fade-in space-y-8">
                <div className="bg-card border border-border rounded-2xl p-8">
                  <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="bg-primary/10 p-3 rounded-lg">
                        <Phone className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">Phone</h3>
                        <a
                          href="tel:+918001627251"
                          className="text-muted-foreground hover:text-primary transition-colors"
                        >
                          +91-8001627251
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="bg-primary/10 p-3 rounded-lg">
                        <Mail className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">Email</h3>
                        <a
                          href="mailto:sushantasardar1551@gmail.com"
                          className="text-muted-foreground hover:text-primary transition-colors"
                        >
                          sushantasardar1551@gmail.com
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="bg-primary/10 p-3 rounded-lg">
                        <MapPin className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">Location</h3>
                        <p className="text-muted-foreground">India</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="bg-primary/10 p-3 rounded-lg">
                        <MessageCircle className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">WhatsApp</h3>
                        <a
                          href="https://wa.me/918001627251"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-muted-foreground hover:text-primary transition-colors"
                        >
                          Chat with us
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-accent/20 rounded-2xl p-6">
                  <h3 className="font-semibold mb-2">Business Hours</h3>
                  <p className="text-muted-foreground text-sm">
                    Monday - Sunday: 9:00 AM - 9:00 PM
                  </p>
                </div>
              </div>

              <div className="animate-fade-up">
                <form onSubmit={handleSubmit} className="bg-card border border-border rounded-2xl p-8 space-y-6">
                  <h2 className="text-2xl font-bold mb-6">Send us a Message</h2>
                  
                  <div>
                    <Label htmlFor="name">Name *</Label>
                    <Input
                      id="name"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Your name"
                    />
                  </div>

                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="your.email@example.com"
                    />
                  </div>

                  <div>
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="How can we help you?"
                      rows={5}
                    />
                  </div>

                  <Button type="submit" size="lg" className="w-full">
                    Send Message
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
