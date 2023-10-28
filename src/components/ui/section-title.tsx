import { ComponentProps } from "react";

const SectionTitle = ({ children, ...props }: ComponentProps<"p">) => {
  return (
    <p className="font-bold px-5 mb-2 uppercase" {...props}>
      {children}
    </p>
  );
};

export default SectionTitle;
