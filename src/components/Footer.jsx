import React from "react";

const Footer = () => {
  return (
    <div className="flex w-full items-center justify-center gap-2 bg-dark-primary p-2 text-dark-content">
      Powered by{" "}
      <a href="https://stratz.com/" target="_blank">
        {" "}
        STRATZ
      </a>
    </div>
  );
};

export default Footer;
