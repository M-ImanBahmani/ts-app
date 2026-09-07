import type { FC, ReactElement } from "react";


type PropTypes = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  element?: any;
  className?: string;
  children: ReactElement | string;
};


const DsTypography: FC<PropTypes> = ({ element, className, children }) => {
  const TagComponent = element ? element : "span";
  return <TagComponent className={className}>{children}</TagComponent>;
};

export default DsTypography;