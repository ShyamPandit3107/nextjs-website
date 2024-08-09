import React, { Suspense } from "react";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return <Suspense fallback={<div>Loading...</div>}></Suspense>;
};

export default MainLayout;
