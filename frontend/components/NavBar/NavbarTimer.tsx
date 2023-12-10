import Image from "next/image";
import Countdown from "react-countdown";

const NavbarTimer = ({ userTimer }: { userTimer: number }) => {
  return (
    <div className="flex flex-row justify-center items-center space-x-3">
      <div className="flex flex-col justify-center items-center space-y-3 mb-2">
        <Image
          src="/images/CREATE/flame-yellow-small.jpeg"
          alt="yellow flame"
          width={70}
          height={70}
          className="rounded-md "
        />
        <Image
          src="/images/CREATE/clock.svg"
          alt="yellow flame"
          width={15}
          height={15}
          className="rounded-md "
        />
      </div>
      <div className="flex flex-col justify-center items-center space-y-4">
        <Image
          src="/images/CREATE/dragontime.svg"
          alt="dragon and representation of the timer"
          width={150}
          height={150}
          className="rounded-md "
        />
        <div className="flex flex-row flex-nowrap justify-center items-end space-x-2">
          {userTimer ? (
            <Countdown date={userTimer} />
          ) : (
            <p className="uppercase text-xs">Burn a dice</p>
          )}
          <div className="text-gray-500 uppercase text-xs">Min left</div>
        </div>
      </div>
    </div>
  );
};

export default NavbarTimer;
