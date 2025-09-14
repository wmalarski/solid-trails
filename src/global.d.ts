/// <reference types="@solidjs/start/env" />

declare namespace App {
  interface RequestEventLocals {
    auth: import("./integrations/auth/cookies").AuthState | null;
  }
}
