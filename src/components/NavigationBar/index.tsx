/* eslint-disable @next/next/no-img-element */
import { ModeToggle } from "../ModeToggle";

const NavigationBar = () => {
  return (
    <nav className="absolute top-4 px-4 flex justify-between w-full z-10">
      <div></div>
      <ModeToggle />
    </nav>
  );
};

export default NavigationBar;
