declare module '*.jsx' {
  import type { ComponentType } from 'react';

  const Component: ComponentType<any>;
  export default Component;
}

declare module '*.mdx' {
  import type { ComponentType } from 'react';
  import type { PostFrontmatter } from './index';

  const Component: ComponentType<any>;
  export const frontmatter: PostFrontmatter;
  export default Component;
}
