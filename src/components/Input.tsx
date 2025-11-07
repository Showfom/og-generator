import React from "react";
import tw from "twin.macro";
import styled from "styled-components";

export const Input = styled.input`
  ${tw`appearance-none w-full border rounded`}
  ${tw`px-3 py-1 h-9`}
  ${tw`hover:border-gray-400`}
  ${tw`focus:outline-none focus:border-transparent focus:ring-2 focus:ring-accent`}
  background-color: #1c2128;
  color: #e6edf3;
  border-color: #30363d;

  &:hover {
    border-color: #484f58;
  }
`;
