import Container from "@/utils/container/Container";
import Image from "next/image";
import LeftChooseSec from "./LeftChooseSec";
import RightChooseSec from "./RightChooseSec";

const Choose = () => {
  return (
    <div className="bg-background py-20 pt-32">
      <div className="text-center mx-auto ">
        <h1 className="text-blue-500 font-bold italic text-4xl">
          Why Choose Us
        </h1>
        <p className="text-gray-color">
          From healthy bowls to comfort food, we have something for everyone.
        </p>
      </div>

      <Container>
        {/* Choose Us section */}
        <div className="grid grid-cols-3 mx-auto items-center gap-8 pt-10">
          {/* Left section */}
          <LeftChooseSec />
          {/* Middle section */}
          <div className="flex justify-center w-auto">
            <Image
              src="https://img.freepik.com/premium-photo/chef-standing-full-lunch-service-station-with-assortment-food-trays-isolated-with_660230-38662.jpg"
              alt="Choose-icon"
              width={320}
              height={320}
              className="w-90 h-90 object-contain rounded-2xl"
            />
          </div>
          {/* Right section */}
          <RightChooseSec />
        </div>
      </Container>
    </div>
  );
};

export default Choose;
