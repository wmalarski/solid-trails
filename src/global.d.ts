/// <reference types="@solidjs/start/env" />

declare namespace App {
  interface RequestEventLocals {
    auth: import("./auth/cookies").AuthState | null;
  }
}
