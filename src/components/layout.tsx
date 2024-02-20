import Head from "next/head";
import React, { ReactNode } from "react";

interface AppLayoutProps {
  title?: string;
  description?: string;
  children: ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({
  title,
  description,
  children,
}) => {
  return (
    <>
      <Head>
        <title>
          {title ? title + " | JSON Blog" : "JSON Blog | Lorem ipsum dolorum"}
        </title>
        {description && <meta name="description" content={description} />}
      </Head>
      <main className="min-h-screen mx-auto container max-w-4xl">
        {children}
      </main>
    </>
  );
};

export default AppLayout;
