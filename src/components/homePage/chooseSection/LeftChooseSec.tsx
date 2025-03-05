import Image from "next/image";

const LeftChooseSec = () => {
  return (
    <div className="">
      <ul>
        <li className="flex items-start gap-4 pb-6">
          <div className="flex flex-col items-end">
            <h1 className="text-xl font-semibold mb-2">Fast Delivery</h1>
            <p className="text-end">
              Get your favorite meals delivered to our dorm quickly and on time,
              ensure you never go hungry.
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
            <h1 className="text-xl font-semibold mb-2">Affordable Prices</h1>
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
            <h1 className="text-xl font-semibold mb-2">Variety of Meals</h1>
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
  );
};

export default LeftChooseSec;
