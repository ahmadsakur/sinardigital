import { AuthService } from "@/services/api-service";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import { BiAt, BiLock } from "react-icons/bi";
import TextInput from "@/components/input/TextInput";
import PasswordInput from "@/components/input/PasswordInput";
import { useRouter } from "next/router";
import Head from "next/head";

const LoginPage = () => {
  const router = useRouter();
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string().required("Password is required").min(8),
  });

  return (
    <Formik
      initialValues={{
        name: "",
        email: "",
        password: "",
        bio: "",
        avatar: "",
        roleId: "",
      }}
      // validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting, setErrors }) => {
        // handleCreateUser(values, { setSubmitting, setErrors });
        console.log(`values`);
      }}
    >
      {({ isSubmitting }) => (
        <Form className="flex flex-col gap-2">
          {/* <TextInput
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
                      readonly={true}
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
                      <Select name="roleId">
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Limit" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="10">10</SelectItem>
                          <SelectItem value="15">15</SelectItem>
                          <SelectItem value="20">20</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div> */}
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
  );
};

export default LoginPage;
