import React from "react";

interface CardProps {
  children: any,
  className: string,
  onClick: () => void
}

export default function ({children, ...rest}: CardProps & JSX.IntrinsicAttributes) {
  return (
    <li {...rest}>
      {children}
    </li>
  );
}