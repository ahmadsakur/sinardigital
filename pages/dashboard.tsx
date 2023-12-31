import Sidebar from "@/components/Sidebar";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Button } from "@/components/ui/button";
import { PiMagnifyingGlass } from "react-icons/pi";
import { useDebounce } from "@/hooks/useDebounce";
import { AuthService, RoleService, UserService } from "@/services/api-service";
import { IDataResponse, UserRole } from "@/types/user";
import { CreateModal } from "@/components/modal/CreateUserModal";
import DeleteUserModal from "@/components/modal/DeleteUserModal";
import { UpdateModal } from "@/components/modal/UpdateUserModal";
import { useAuth } from "@/store/AuthContext";
import { useRouter } from "next/router";

const renderTag = (role: UserRole) => {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
        role.name === "admin"
          ? "bg-green-100 text-green-800"
          : "bg-yellow-100 text-yellow-800"
      }`}
    >{`${role.name}`}</span>
  );
};

const Dashboard = () => {
  const [limit, setLimit] = useState<string>("10");
  const [keyword, setKeyword] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [roles, setRoles] = useState<any>([]);
  const [tableData, setTableData] = useState<IDataResponse>();
  const { token, isLoggedIn, changeUser, user } = useAuth();
  const debouncedValue = useDebounce<string>(keyword, 500);
  const router = useRouter();
  const handleLimitChange = (value: string) => {
    setLimit(value);
    setPage(1);
  };

  const handleKeywordChange = (value: string) => {
    setKeyword(value);
    setPage(1);
  };

  useEffect(() => {
    const filter = {
      limit: parseInt(limit),
      name: debouncedValue,
      page: page || 1,
    };

    if (!isLoggedIn) {
      router.push("/auth/signin");
    }

    const fetchUser = async () => {
      if (token) {
        const res = await UserService.getUsers(filter, token);
        const { data } = await res.data;
        setTableData(data);
      }
    };

    fetchUser();
  }, [debouncedValue, limit, page, token]);

  useEffect(() => {
    const fetchRole = async () => {
      if (token) {
        const res = await RoleService.getRoles(token);
        const { data } = await res.data;
        setRoles(data);
      }
    };

    const fetchLoggedUser = async () => {
      if (token) {
        const res = await AuthService.getLoggedInUser(token);
        const { data } = await res.data;
        if (data) {
          changeUser(data);
        }
      }
    };

    fetchRole();
    fetchLoggedUser();
  }, []);

  return (
    <>
      <Head>
        <title>Dashboard</title>
        <meta name="description" content="Sinar CMS Dashboard" />
      </Head>
      <div>
        <div className="w-full min-h-screen">
          <div className="flex flex-col md:flex-row items-start relative h-full">
            <div className="w-full md:w-3/12 lg:w-2/12 relative">
              <Sidebar user={user!} />
            </div>
            <div className="flex flex-col items-start justify-start px-4 md:px-6 py-4 md:py-8 w-full md:w-9/12 lg:w-10/12">
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
                      onChange={(e) => handleKeywordChange(e.target.value)}
                    />
                  </div>
                  <Select
                    defaultValue={limit}
                    onValueChange={handleLimitChange}
                  >
                    <SelectTrigger className="w-fit">
                      <SelectValue placeholder="Limit" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="10">10</SelectItem>
                      <SelectItem value="15">15</SelectItem>
                      <SelectItem value="20">20</SelectItem>
                    </SelectContent>
                  </Select>
                  <CreateModal roles={roles} />
                </div>
                <div>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Bio</TableHead>
                        <TableHead className="w-[100px]">Action</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {tableData?.docs && tableData.docs.length > 0 ? (
                        tableData?.docs?.map((user) => (
                          <TableRow key={user._id}>
                            <TableCell className="flex items-center gap-4">
                              <img
                                src={user.avatar}
                                alt={user.name}
                                className="rounded-full w-10 h-10"
                              />
                              <div>
                                <p>{user.name}</p>
                                <p className="text-sm text-neutral-500">
                                  {user.email}
                                </p>
                              </div>
                            </TableCell>
                            <TableCell>
                              {user?.role && renderTag(user.role)}
                            </TableCell>
                            <TableCell className="max-w-[200px] whitespace-pre-wrap">
                              <p className="text-sm text-gray-300">
                                {user.bio}
                              </p>
                            </TableCell>
                            <TableCell className="flex gap-2">
                              <UpdateModal user={user} roles={roles} />
                              <DeleteUserModal user={user} />
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={4} className="text-center">
                            No data found
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                  <div className="flex justify-end w-full items-center gap-2 py-4 mb-16">
                    {tableData?.hasPrevPage && (
                      <Button
                        className="flex items-center gap-2 py-2.5"
                        onClick={() => setPage((prev) => prev - 1)}
                      >
                        Prev
                      </Button>
                    )}
                    {tableData?.hasNextPage && (
                      <Button
                        className="flex items-center gap-2 py-2.5"
                        onClick={() => setPage((prev) => prev + 1)}
                      >
                        Next
                      </Button>
                    )}
                  </div>
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
