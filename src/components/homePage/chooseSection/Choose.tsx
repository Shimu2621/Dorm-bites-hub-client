import Container from "@/utils/container/Container";
import Image from "next/image";

const Choose = () => {
  return (
    <div className="bg-white py-20">
      <div className="text-center mx-auto ">
        <h1 className="text-blue-500 font-bold italic text-3xl">
          Why Choose Us
        </h1>
        <p className="text-gray-500">
          {" "}
          From healthy bowls to comfort food, we have something for everyone.
        </p>
      </div>

      <Container>
        {/* Choose Us section */}
        <div className="grid grid-cols-3 mx-auto items-center gap-8 pt-10">
          {/* Left section */}
          <div className="">
            <ul>
              <li className="flex items-start gap-4 pb-6">
                <div className="flex flex-col items-end">
                  <h1 className="text-xl font-semibold mb-2">Fast Delivery</h1>
                  <p className="text-end">
                    Get your favorite meals delivered to our dorm quickly and on
                    time, ensure you never go hungry.
                  </p>
                </div>
                <div className="">
                  <Image
                    src={"/services/time.png"}
                    alt="choose-icons"
                    width={35}
                    height={35}
                    className="w-24 h-16 object-contain"
                  />
                </div>
              </li>
              <li className="flex gap-4 pb-6">
                <div className="flex flex-col items-end justify-end">
                  <h1 className="text-xl font-semibold mb-2">
                    Affordable Prices
                  </h1>
                  <p className="text-end">
                    Enjoy delicious food at budget-friendly prices, perfect for
                    students looking for quality meals.
                  </p>
                </div>
                <div className="">
                  <Image
                    src={"/services/affordable.png"}
                    alt="choose-icons"
                    width={35}
                    height={35}
                    className="w-24 h-16 object-contain"
                  />
                </div>
              </li>
              <li className="flex gap-4 pb-6">
                <div className="flex flex-col items-end justify-end">
                  <h1 className="text-xl font-semibold mb-2">
                    Variety of Meals
                  </h1>
                  <p className="text-end">
                    Choose from a diverse menu, including local favorites,
                    international cuisines, and healthy meal.
                  </p>
                </div>
                <div className="pt-3">
                  <Image
                    src={"/services/options.png"}
                    alt="choose-icons"
                    width={35}
                    height={35}
                    className="w-24 h-16 object-contain"
                  />
                </div>
              </li>
            </ul>
          </div>
          {/* Middle section */}
          <div className="flex justify-center w-auto">
            <Image
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWXmNKvVembJkn5Fp0TlSXU0MRoNu3oqYZBZBmJF00SUQTyDj5penVnLi0aMnqUeG1Cjw&usqp=CAU"
              alt="choose-icons"
              width={320}
              height={320}
              className="w-80 h-80 object-contain"
            />
          </div>
          {/* Right section */}
          <div className="flex flex-col ">
            <ul>
              {/* First list */}
              <li className="flex gap-4 pb-6">
                <div className="pt-2">
                  <Image
                    src={"/services/online-order.png"}
                    alt="choose-icons"
                    width={35}
                    height={35}
                    className="w-24 h-16 object-contain"
                  />
                </div>
                <div>
                  <h1 className="text-xl font-semibold mb-2">Easy Ordering</h1>
                  <p>
                    Our user-friendly app makes ordering seamless, and you can
                    track your order in real time.
                  </p>
                </div>
              </li>
              {/* Second list */}
              <li className="flex gap-4 pb-6">
                <div className="pt-2">
                  <Image
                    src={"/icons/customer-care.png"}
                    alt="choose-icons"
                    width={35}
                    height={35}
                    className="w-24 h-16 object-contain"
                  />
                </div>
                <div>
                  <h1 className="text-xl font-semibold mb-2">
                    24/7 Availability
                  </h1>
                  <p>
                    Whether it`&apos;s an early breakfast or a late-night study
                    snack, we’re always available to serve you.
                  </p>
                </div>
              </li>
              {/* Third list */}
              <li className="flex gap-4 pb-6">
                <div className="pt-2">
                  <Image
                    src={"/services/low-price.png"}
                    alt="choose-icons"
                    width={35}
                    height={35}
                    className="w-24 h-16 object-contain"
                  />
                </div>
                <div className="">
                  <h1 className="text-xl font-semibold mb-2">
                    Exclusive Discounts
                  </h1>
                  <p>
                    Unlock special offers, discounts, and meal combos designed
                    exclusively for students.
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Choose;
