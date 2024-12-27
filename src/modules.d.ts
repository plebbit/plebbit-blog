declare module '*.module.css' {
  const classes: { [key: string]: string };
  export default classes;
}

declare module 'memoizee';
declare module 'ext-name';

declare module '*.png' {
  const content: string;
  export default content;
}