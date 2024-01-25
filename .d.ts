/// <reference types="react-dom/experimental" />
/// <reference types="@auth/core" />

declare module '@auth/core' {
  interface AdapterUser {
    password: string;
  }
}

type ThemeColors = 'card' | 'popover' | 'primary' | 'secondary' | 'muted' | 'accent' | 'destructive'

declare module 'csstype' {
  interface Properties {
    '--background': string;
    '--foreground': string;
    [index: `--${ThemeColors}`]: string;
    [index: `--${ThemeColors}-foreground`]: string;
    '--border': string;
    '--input': string;
    '--ring': string;
    '--radius': string;
  }
}