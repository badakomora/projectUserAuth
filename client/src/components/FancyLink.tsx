import React from "react";

interface NavLinks {
  href: string;
  name:string | null,
  onclick: React.MouseEventHandler<HTMLAnchorElement>;
}

export const FancyLink: React.FC<NavLinks> = ({
  href,
  name,
  onclick
}) => {
  return (
    <li>
        <a href={href} className="m-2" onClick={onclick}>
            {name}
        </a>
    </li>
  );
};
