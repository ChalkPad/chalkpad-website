"use server";

import React, { ReactNode } from "react";

async function Layout({ children }: { children: ReactNode }) {
  return <div>{children}</div>;
}

export default Layout;
