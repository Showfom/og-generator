// twin.d.ts
import "twin.macro";
import styledImport, { CSSProp, css as cssImport } from "styled-components";

declare module "twin.macro" {
  // The styled and css imports
  const styled: typeof styledImport;
  const css: typeof cssImport;
}

declare module "react" {
  // The css prop
  interface HTMLAttributes<T> {
    css?: CSSProp;
    tw?: string;
  }

  // The inline svg css prop
  interface SVGProps<T> {
    css?: CSSProp;
    tw?: string;
  }
}

// The 'as' prop on styled components
declare global {
  namespace JSX {
    interface IntrinsicAttributes {
      as?: string | React.ComponentType;
    }
  }
}
