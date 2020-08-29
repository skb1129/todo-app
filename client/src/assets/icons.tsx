import React from "react";

const icons = {
  menu: (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} viewBox="0 0 100 80">
      <rect width="100" height="20" />
      <rect y="30" width="100" height="20" />
      <rect y="60" width="100" height="20" />
    </svg>
  ),
};

export default icons;
