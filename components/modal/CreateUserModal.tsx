import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { PiPlus } from "react-icons/pi";
import TextInput from "../input/TextInput";
import PasswordInput from "../input/PasswordInput";
import { BiAt, BiFont, BiInfoCircle, BiLock, BiUser } from "react-icons/bi";
import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RoleService, UserService } from "@/services/api-service";
import toast from "react-hot-toast";

type CreateUserPayload = {
  name: string;
  email: string;
  password: string;
  bio: string;
  avatar?: string;
  roleId?: string;
};
export function CreateModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [roles, setRoles] = useState([]);
  const [selectedRole, setSelectedRole] = useState("");

  const token = localStorage.getItem("access_token") || "";
  const createUserSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string().required("Password is required").min(8),
    bio: Yup.string().required("Bio is required"),
  });

  const handleRoleChange = (value: string) => {
    setSelectedRole(value);
  }

  useEffect(() => {
    const fetchRole = async () => {
      const res = await RoleService.getRoles(token);
      const { data } = await res.data;
      setRoles(data);
    };

    fetchRole();
  }, []);

  const handleCreateUser = async (
    values: CreateUserPayload,
    { setErrors, setSubmitting }: any
  ) => {
    setSubmitting(true);
    const generatedAvatarUrl = `https://ui-avatars.com/api/?name=${values.name}&background=random`;
    const payload = {
      ...values,
      roleId: selectedRole,
      avatar: generatedAvatarUrl,
    };
    
    try {
      const res = await UserService.createUser(payload, token);
      const { data } = await res.data;
      if (data) {
        toast.success("User created successfully");
        setIsOpen(false);
      }
    } catch (error: any) {
      setErrors({ name: error.response.data.message });
      toast.error(error.response.data.message);
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="default">
          <PiPlus />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create User</DialogTitle>
        </DialogHeader>
        <div>
          <Formik
            initialValues={{
              name: "",
              email: "",
              password: "",
              bio: "",
              avatar: "",
            }}
            validationSchema={createUserSchema}
            onSubmit={(values, { setSubmitting, setErrors }) => {
              handleCreateUser(values, { setSubmitting, setErrors });
            }}
          >
            {({ isSubmitting }) => (
              <Form className="flex flex-col gap-2">
                <TextInput
                  id="name"
                  name="name"
                  type="text"
                  label="Name"
                  placeholder="enter your name"
                  icon={<BiFont />}
                />
                <TextInput
                  id="email"
                  name="email"
                  type="email"
                  label="Email Address"
                  placeholder="enter your email"
                  icon={<BiAt />}
                />
                <PasswordInput
                  id="password"
                  name="password"
                  label="Password"
                  placeholder="****"
                  icon={<BiLock />}
                />
                <TextInput
                  id="bio"
                  name="bio"
                  type="text"
                  label="Bio"
                  placeholder="enter your bio"
                  icon={<BiInfoCircle />}
                />
                <div className="grid grid-cols-4 gap-2 w-full">
                  <div className="col-span-3">
                    <TextInput
                      id="avatar"
                      name="avatar"
                      type="text"
                      label="Avatar"
                      placeholder="autofilled with ui-avatar API"
                      readOnly={true}
                      icon={<BiUser />}
                    />
                  </div>
                  <div className="col-span-1">
                    <div className="flex flex-col gap-2">
                      <label
                        htmlFor="roleId"
                        className="text-neutral-200 text-sm font-medium"
                      >
                        Role
                      </label>
                      <Select name="roleId" value={selectedRole} onValueChange={handleRoleChange}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Role" />
                        </SelectTrigger>
                        <SelectContent>
                          {
                            roles.map((role: any) => (
                              <SelectItem key={role._id} value={role._id}>{role.name}</SelectItem>
                            ))
                          }
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
                <button
                  type="submit"
                  className={`bg-blue-600 text-sm text-white rounded-md px-6 py-4 hover:bg-blue-500 ${
                    isSubmitting ? "cursor-wait opacity-50" : ""
                  }`}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Loading..." : "Create"}
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </DialogContent>
    </Dialog>
  );
}
