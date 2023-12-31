import React from "react";

const Header1 = ({ title }: { title: String }) => {
  return (
    <div className="w-full h-40 bg-slate-600 flex items-center">
      <h1 className="text-white w-full text-4xl font-black text-center">
        {title}
      </h1>
    </div>
  );
};

export default Header1;
