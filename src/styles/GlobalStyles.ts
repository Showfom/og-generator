import { createGlobalStyle } from "styled-components";
import tw from "twin.macro";

export const GlobalStyles = createGlobalStyle`
  body {
    ${tw`antialiased`}
    ${tw`leading-relaxed`}
    ${tw`font-sans`}
    background-color: #0f1419;
    color: #e6edf3;
  }
`;
