import React from "react";

import {ReactComponent as WifiIcon} from "./icon.svg";

import "./Header.scss";

const Icon = () => {
  return <WifiIcon className="header-icon"/>;
};

const Header = () => {
  return (
    <div className="header-ctn">
      <div className="header-child">
        <Icon />
      </div>
      <div className="header-child header-text text-large">
        Eratosthene's Sieve for prime numbers
      </div>
      <div className="header-child">
        {/* Add hambuger menu. Here to keep text middle */}
      </div>
    </div>
  );
};

export default Header;
