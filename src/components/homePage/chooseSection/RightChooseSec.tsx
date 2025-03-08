import Image from "next/image";

const RightChooseSec = () => {
  return (
    <div className="flex flex-col ">
      <ul>
        <li className="flex gap-4 pb-6">
          <div className="pt-2">
            <Image
              src={"/services/online-order.png"}
              alt="choose-icons"
              width={35}
              height={35}
              className="w-24 h-12 object-contain"
            />
          </div>
          <div>
            <h1 className="text-xl font-bold mb-2">Easy Ordering</h1>
            <p>
              Our user-friendly app makes ordering seamless, and you can track
              your order in real time.
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
              className="w-24 h-12 object-contain"
            />
          </div>
          <div>
            <h1 className="text-xl font-bold mb-2">24/7 Availability</h1>
            <p>
              Whether it`&apos;s an early breakfast or a late-night study snack,
              we’re always available to serve you.
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
              className="w-24 h-12 object-contain"
            />
          </div>
          <div className="">
            <h1 className="text-xl font-bold mb-2">Exclusive Discounts</h1>
            <p>
              Unlock special offers, discounts, and meal combos designed
              exclusively for students.
            </p>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default RightChooseSec;
