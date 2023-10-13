import Sidebar from "@/components/Sidebar";
import Head from "next/head";
import React, { useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

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
            <div className="flex flex-col items-start justify-start px-6 py-8 w-full md:w-10/12">
              <div className="max-w-5xl w-full">
              <h2 className="text-2xl md:text-3xl font-medium leading-relaxed mb-4">
                Users
              </h2>
              <p className="max-w-md text-sm text-neutral-400">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat
                dolor obcaecati accusantium corpori
              </p>

              <div className="flex justify-end gap-2 w-full">
                Searchbar here
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">INV001</TableCell>
                    <TableCell>Paid</TableCell>
                    <TableCell>Credit Card</TableCell>
                    <TableCell className="text-right">$250.00</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
