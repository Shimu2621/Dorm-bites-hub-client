import Image from "next/image";
import React from "react";

const AboutPage = () => {
  return (
    <div className="container mx-auto  ">
      {/* Banner Section */}
      <div className="relative w-full h-[30vh] md:h-[40vh] ">
        <Image
          src="https://townsquare.media/site/10/files/2022/08/attachment-RS37782_GettyImages-502840530.jpg?w=780&q=75"
          alt="Banner Image"
          fill
          quality={100}
          priority
          className="w-full h-full object-cover"
        />

        {/* opacity for shade */}
        <div className="absolute inset-0 bg-black/70">
          {/* text */}
          <div className="relative mt-20 text-white flex flex-col items-center justify-center">
            <h2 className="text-4xl md:text-7xl font-bold mb-4">About Us</h2>
            <p className="md:text-2xl text-lg text-center font-bold px-4">
              Welcome to Dorm Bites Hub – your go-to platform for delicious,
              affordable, and <br /> convenient meals right from your dorm!
            </p>
          </div>
        </div>
      </div>

      {/* Our Vision Section */}
      <div className="flex flex-col pt-14 md:flex-row items-center justify-between mb-16 max-w-[1440px] mx-auto gap-20">
        {/* Left Section - Text */}
        <div className="w-full md:w-1/2 pt-24 px-2">
          <h4 className="text-xl italic text-primary font-semibold mb-4">
            Our Vision
          </h4>
          <h1 className="text-2xl md:text-3xl italic font-bold text-gray-800 mb-6">
            Revolutionizing Dorm Dining:
            <br /> A Future of Convenience, Quality, and Community
          </h1>
          <p className="text-lg text-gray-color">
            At Dorm Bites Hub, we envision a world where every student enjoys
            fresh, affordable, and hassle-free meals without compromising on
            taste, quality, or convenience. We believe that food should be more
            than just a necessity—it should be an experience that brings
            comfort, energy, and joy, even in the busiest college schedules.{" "}
            <br />
            Our goal is to revolutionize dorm dining by creating a platform that
            caters to students’ unique needs, offering quick, delicious, and
            budget-friendly meals right at their doorstep. Whether it&apos;s a
            nutritious breakfast to kickstart the day, a power-packed lunch
            between classes, or a satisfying midnight snack for those late-night
            study sessions, Dorm Bites Hub is committed to being the ultimate
            food companion for students.
          </p>
        </div>

        {/* Right Section - Image */}
        <div className="w-full md:w-1/2 h-[50vh]">
          <div>
            <Image
              className="w-[90%] h-[60vh] m-4 object-cover rounded-sm"
              src="https://www.cutzamalamexfood.com/wp-content/uploads/2022/09/Couples-toasting-with-thier-wine-glasses-and-nice-restaurant.jpg"
              alt=""
              width={612}
              height={353}
              unoptimized
            />
          </div>
        </div>
      </div>

      {/* Our Mission Section */}
      <div className="flex flex-col pt-16 md:flex-row items-center justify-between mb-16 max-w-[1440px] mx-auto gap-20">
        {/* Left Section - Image */}
        <div className="w-full md:w-1/2 h-[50vh]">
          <div>
            <Image
              className="w-[90%] h-[55vh] m-4 object-cover rounded-sm"
              src="https://img.freepik.com/premium-photo/image-restaurants-customer-review-wall-testimonial-display-highlighting-positive-feedback_1314467-43708.jpg"
              alt=""
              width={612}
              height={353}
              unoptimized
            />
          </div>
        </div>

        {/* Right Section - Text */}
        <div className="w-full md:w-1/2 px-2 pt-24" data-aos="fade-left">
          <h4 className="text-xl italic text-primary font-semibold mb-4">
            Our Mission
          </h4>
          <h1 className="text-2xl md:text-3xl italic font-bold text-gray-800 mb-6">
            Our Mission is to Empowering Students with Effortless, Affordable,
            and Quality Dining
          </h1>
          <p className="text-lg text-gray-color">
            At Dorm Bites Hub, our mission is to revolutionize student dining by
            providing easy, affordable, and high-quality meals right at the
            doorstep of every dorm resident. We understand the challenges
            students face—tight schedules,and the constant struggle of balancing
            academics with daily meals. That’s why we have built a seamless,
            technology-driven platform that ensures nutritious, delicious, and
            budget-friendly food is always within reach. <br />
            We offer competitive pricing tailored to student budgets without
            compromising on quality. we encourage students to connect over food,
            creating a culture of shared experiences and support.
          </p>
        </div>
      </div>

      {/* Our Volunteer */}
      <div className="max-w-[1440px] pt-28 mx-auto text-center">
        <div data-aos="fade-left">
          <p className="italic text-xl pt-10 mb-2 text-primary font-semibold">
            Our Strength
          </p>
          <h1 className="text-4xl font-bold">Meet Our Team Members</h1>
          <p className="text-gray-color pt-2 mb-10">
            Meet the minds behind Dorm Bites Hub—leaders, innovators, and
            problem-solvers working together to make
            <br /> student life easier, healthier, and more enjoyable.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 max-w-[1440px] mx-auto px-10 gap-6 mb-20">
          {/* Team Member 1 */}
          <div className="flex flex-col items-center justify-center text-center">
            <Image
              className="w-80 h-[45vh] object-cover rounded-sm"
              src="https://img.freepik.com/premium-photo/portrait-confident-mature-businessman-standing-with-arms-crossed-modern-office-generative-ai_804788-58280.jpg"
              alt="Team Member"
              width={406}
              height={255}
              unoptimized
            />
            <h3 className="pt-4 text-lg italic text-primary font-semibold">
              Co-Founder & CEO
            </h3>
            <h2 className="font-bold text-xl">Ava Thompson</h2>
            <p className="text-center text-gray-color">
              Passionate about transforming student dining with affordability,
              and quality meals.
            </p>
          </div>

          {/* Team Member 2 */}
          <div className="flex flex-col items-center justify-center text-center">
            <Image
              className="w-80 h-[45vh] object-cover rounded-sm"
              src="https://img.freepik.com/premium-photo/portrait-senior-businessman-with-eyeglasses-standing-office-lobby-generative-ai_804788-135739.jpg"
              alt="Team Member"
              width={406}
              height={255}
              unoptimized
            />
            <h3 className="pt-4 text-lg italic text-primary font-semibold">
              Head of Operations
            </h3>
            <h2 className="font-bold text-xl">Liam Patel</h2>
            <p className="text-center text-gray-color">
              Ensures smooth logistics and timely deliveries to make Dorm Bites
              Hub efficient.
            </p>
          </div>

          {/* Team Member 3 */}
          <div className="flex flex-col items-center justify-center text-center">
            <Image
              className="w-80 h-[45vh] object-cover rounded-sm"
              src="https://img.freepik.com/premium-photo/young-woman-with-magnifier-tablet-computer-blue-background_483949-14010.jpg"
              alt="Team Member"
              width={406}
              height={255}
              unoptimized
            />
            <h3 className="pt-4 text-lg italic text-primary font-semibold">
              Lead Chef & Nutritionist
            </h3>
            <h2 className="font-bold text-xl">Sophia Martinez</h2>
            <p className="text-center text-gray-color">
              Curates nutritious, delicious meals tailored to students&lsquo;
              dietary needs and preferences.
            </p>
          </div>

          {/* Team Member 4 */}
          <div className="flex flex-col items-center justify-center text-center">
            <Image
              className="w-80 h-[45vh] object-cover rounded-sm"
              src="https://img.freepik.com/premium-photo/portrait-professional-woman-suit-business-woman-standing-office-generative-ai_868783-4132.jpg"
              alt="Team Member"
              width={406}
              height={255}
              unoptimized
            />
            <h3 className="pt-4 text-lg italic text-primary font-semibold">
              Tech Lead & Developer
            </h3>
            <h2 className="font-bold text-xl">Noah Kim</h2>
            <p className="text-center text-gray-color">
              Develops and optimizes the platform for a seamless, and
              user-friendly experience.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
