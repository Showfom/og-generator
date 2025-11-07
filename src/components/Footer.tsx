import React from "react";
import { Link } from "./Link";
import "twin.macro";

export const Footer: React.FC = () => (
  <footer tw="flex justify-center w-full py-10 mx-auto">
    <div tw="text-center" style={{ color: '#9ca3af' }}>
      Forked from{" "}
      <Link
        href="https://github.com/railwayapp/og-generator"
        external
        tw="text-accent hover:underline"
      >
        railwayapp/og-generator
      </Link>
    </div>
  </footer>
);
