import SectionTitle from "@/components/Shared/SectionTitle";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

const About = () => {
  return (
    <div className="custom-container">
      <SectionTitle
        heading="About Us"
        subTitle="Discover quality stationery that inspires creativity and productivity."
      />

      {/* Mission Section */}
      <div className="">
        <h2 className="text-xl font-semibold text-gray-800 font-heading">Our Mission</h2>
        <p className="text-gray-600 mt-2">
          At <span className="font-bold">Stationary Shop</span>, we provide
          premium stationery products that fuel creativity, enhance
          productivity, and bring joy to everyday tasks. From students to
          professionals, we have something for everyone.
        </p>
      </div>

      {/* What We Offer Section */}
      <div className="mt-7">
        <h2 className="text-xl font-semibold text-gray-800 font-heading">What We Offer</h2>
        <Accordion type="single" collapsible className="w-full mt-2">
          <AccordionItem value="writing">
            <AccordionTrigger>✍️ Writing Essentials</AccordionTrigger>
            <AccordionContent>
              Find the finest pens, pencils, and markers from top brands.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="office">
            <AccordionTrigger>📂 Office & School Supplies</AccordionTrigger>
            <AccordionContent>
              Organize your workspace with notebooks, planners, and more.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="art">
            <AccordionTrigger>🎨 Art & Craft Materials</AccordionTrigger>
            <AccordionContent>
              Unleash creativity with sketchbooks, paints, and craft supplies.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="tech">
            <AccordionTrigger>💻 Tech Accessories</AccordionTrigger>
            <AccordionContent>
              Stay ahead with smart gadgets, digital notebooks, and more.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      {/* Why Choose Us Section */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold text-gray-800 font-heading">Why Choose Us?</h2>
        <ul className="pl-2 text-gray-600 mt-2 space-y-1">
          <li>✅ High-quality, curated stationery items</li>
          <li>✅ Affordable prices for students and professionals</li>
          <li>✅ Fast and secure shipping</li>
          <li>✅ 100% customer satisfaction guaranteed</li>
        </ul>
      </div>

      {/* Contact Section */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold text-gray-800 font-heading">Visit Us</h2>
        <p className="text-gray-600 mt-2">
          Drop by our store or browse our online collection. Let’s make your
          writing and creativity experience better!
        </p>
      </div>
    </div>
  );
};

export default About;
