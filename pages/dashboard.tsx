import Sidebar from "@/components/Sidebar";
import Head from "next/head";
import React from "react";

const Dashboard = () => {
  return (
    <>
      <Head>
        <title>Dashboard</title>
        <meta name="description" content="Sinar CMS Dashboard" />
      </Head>
      <div>
        <div className="w-full min-h-screen">
          <div className="flex items-start relative">
            <div className="hidden md:block md:w-2/12 relative">
              <Sidebar />
            </div>
            <div className="flex flex-col items-start justify-start px-4 py-8">
              <h1 className="text-2xl md:text-3xl font-medium leading-relaxed">
                Dashboard
              </h1>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
