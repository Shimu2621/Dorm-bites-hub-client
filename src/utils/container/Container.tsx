import React from "react";
import clsx from "clsx"; // Optional for better class management

interface ContainerProps {
  children: React.ReactNode;
  className?: string; // Allow className as a prop
}

const Container: React.FC<ContainerProps> = ({ children, className }) => {
  return (
    <div className={clsx("max-w-7xl mx-auto px-4", className)}>{children}</div>
  );
};

export default Container;
