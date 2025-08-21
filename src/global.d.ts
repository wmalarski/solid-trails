/// <reference types="@solidjs/start/env" />

declare namespace App {
  interface RequestEventLocals {
    session: import("./auth/services").Session | null;
  }
}
