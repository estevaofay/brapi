declare module '*.mdx' {
  export const meta: {
    title: string;
    author: string;
    description?: string;
    date?: string;
    tags?: string[];
  };
}

declare module '*.svg' {
  import React = require('react');
  export const ReactComponent: React.SFC<React.SVGProps<SVGSVGElement>>;
  const src: string;
  export default src;
}
