import React from "react";
import { Link } from "./Link";
import "twin.macro";

export const Footer: React.FC = () => (
  <footer tw="flex justify-center w-full py-10 mx-auto">
    <div tw="text-center" style={{ color: '#9ca3af' }}>
      <Link
        href="https://github.com/Showfom/og-generator"
        external
        tw="text-accent hover:underline"
      >
        Forked
      </Link>{" "}
      from{" "}
      <Link
        href="https://github.com/railwayapp/og"
        external
        tw="text-accent hover:underline"
      >
        railwayapp/og
      </Link>
    </div>
  </footer>
);
