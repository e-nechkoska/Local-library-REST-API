import React from "react";

interface HeaderProps {
  value: React.ReactNode;
}

const Header: React.FunctionComponent<HeaderProps> = (props) => {
  return (
    <header className="header">
     <h1>{props.value}</h1>
    </header>
  )
}

export default Header;

