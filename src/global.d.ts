/// <reference types="@solidjs/start/env" />

declare namespace App {
  interface RequestEventLocals {
    auth: import("./auth/init").Auth;
    session: import("better-auth").Session | null;
    user: import("better-auth").User | null;
  }
}
