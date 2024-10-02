import React from "react";

type Props = {
  name: string;
};

const Header = ({ name }: Props) => {
  return (
    <div className="mb-5 flex w-full items-center justify-between">
      <h1 className="text-2xl font-medium dark:text-tertiary-300 md:text-3xl">
        {name}
      </h1>
    </div>
  );
};

export default Header;
