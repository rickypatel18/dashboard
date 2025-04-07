import React from "react";
import { SessionProvider } from "next-auth/react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main>
      <SessionProvider>{children}</SessionProvider>
    </main>
  );
};

export default layout;
