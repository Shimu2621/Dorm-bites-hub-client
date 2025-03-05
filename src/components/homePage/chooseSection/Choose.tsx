import Container from "@/utils/container/Container";
import Image from "next/image";
import LeftChooseSec from "./LeftChooseSec";
import RightChooseSec from "./RightChooseSec";

const Choose = () => {
  return (
    <div className="bg-background py-20">
      <div className="text-center mx-auto ">
        <h1 className="text-blue-500 font-bold italic text-3xl">
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
          <LeftChooseSec/>
          {/* Middle section */}
          <div className="flex justify-center w-auto">
            <Image
              src="https://img.freepik.com/premium-photo/friends-gathering-daily-life-drinking-eating-together_936393-789.jpg"
              alt="choose-icons"
              width={320}
              height={320}
              className="w-80 h-80 object-contain rounded-2xl"
            />
          </div>
          {/* Right section */}
          <RightChooseSec/>
        </div>
      </Container>
    </div>
  );
};

export default Choose;
