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
import { Button } from "@/components/ui/button";
import { PiMagnifyingGlass, PiPen, PiPlus, PiTrash } from "react-icons/pi";

const Dashboard = () => {
  return (
    <>
      <Head>
        <title>Dashboard</title>
        <meta name="description" content="Sinar CMS Dashboard" />
      </Head>
      <div>
        <div className="w-full min-h-screen">
          <div className="flex flex-col md:flex-row items-start relative">
            <div className=" w-full md:w-2/12 relative">
              <Sidebar />
            </div>
            <div className="flex flex-col items-start justify-start px-4 md:px-6 py-4 md:py-8 w-full md:w-10/12">
              <div className="max-w-5xl w-full mx-auto">
                <h2 className="text-2xl md:text-3xl font-medium leading-relaxed mb-4">
                  Users
                </h2>

                <div className="flex justify-between md:justify-end gap-2 w-full">
                  <div className="relative w-fit">
                    <div
                      className={`absolute inset-y-0 left-2 flex items-center pl-2 text-neutral-200`}
                    >
                      <PiMagnifyingGlass />
                    </div>
                    <input
                      autoComplete="off"
                      className={` bg-black border text-sm text-neutral-300 focus:border-neutral-200 rounded-lg px-4 focus:outline-none pl-10 py-2.5 w-full placeholder:text-neutral-600 placeholder:text-sm border-neutral-700
                      `}
                    />
                  </div>
                  <Button className="flex items-center gap-2 py-2.5">
                    <PiPlus />
                  </Button>
                </div>
                <div className="overflow-x-scroll">
                <Table className="w-fit">
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead className="w-[100px]">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>Adrian Pauline Setiawan</TableCell>
                      <TableCell>adrian@gmail.com</TableCell>
                      <TableCell>Super Admin</TableCell>
                      <TableCell className="flex gap-2 items-center">
                        <Button variant="default" size="sm">
                          <PiPen />
                        </Button>
                        <Button variant="destructive" size="sm">
                          <PiTrash />
                        </Button>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
