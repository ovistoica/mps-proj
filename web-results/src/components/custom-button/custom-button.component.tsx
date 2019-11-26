import React from "react";

import { CustomButtonContainer } from "./custom-button.styles";

interface CustomButtonProps {
  children?: React.ReactNode;
  onClick?: () => void;
}

const CustomButton: React.FC<CustomButtonProps> = ({ children, ...props }) => (
  <CustomButtonContainer {...props}>{children}</CustomButtonContainer>
);

export default CustomButton;
