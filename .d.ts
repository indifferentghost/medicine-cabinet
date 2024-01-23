/// <reference types="react-dom/experimental" />
/// <reference types="@auth/core" />

declare module '@auth/core' {
  interface AdapterUser {
    password: string;
  }
}
