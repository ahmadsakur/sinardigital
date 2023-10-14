import { AuthService } from "@/services/api-service";
import Image from "next/image";
import Link from "next/link";
import React, { use, useEffect } from "react";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import { BiAt, BiCheckDouble, BiLock } from "react-icons/bi";
import TextInput from "@/components/input/TextInput";
import PasswordInput from "@/components/input/PasswordInput";
import { useRouter } from "next/router";
import Head from "next/head";
import { PiCheckFill } from "react-icons/pi";
import { useAuth } from "@/store/AuthContext";

const LoginPage = () => {
  const router = useRouter();
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string().required("Password is required").min(8),
  });

  const { changeToken, isLoggedIn } = useAuth();

  useEffect(() => {
    if (isLoggedIn) {
      router.push("/dashboard");
    }
  }, [isLoggedIn, router]);

  const handleLogin = async (
    values: { email: string; password: string },
    { setErrors, setSubmitting }: any
  ) => {
    setSubmitting(true);
    try {
      const response = await AuthService.login(values);
      const { access_token } = response.data.data;
      changeToken(access_token);
      router.push("/dashboard");
    } catch (error: any) {
      setErrors({ email: error.response.data.message });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Head>
        <title>Sinar CMS - Sign In</title>
      </Head>
      <div className="mx-auto min-h-screen h-full">
        <div className="flex items-center h-full w-full">
          <div
            className="bg-neutral-900 hidden md:w-1/2 lg:w-3/5 md:block min-h-screen relative bg-top bg-cover bg-no-repeat"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')",
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-transparent" />
            <div className="inset-0 absolute">
              <div className="p-8 flex flex-col justify-between h-full">
                <div>
                  <Image
                    src={"/logo.png"}
                    width={150}
                    height={40}
                    alt="company-logo"
                  />
                </div>
                <div>
                  <h1 className="text-3xl font-bold">
                    Welcome to Sinar Digital CMS
                  </h1>
                  <p className="text-neutral-400 text-sm max-w-md py-2">
                    Easyly manage your content with Sinar CMS
                  </p>
                  <div className="grid grid-cols-2 gap-4 py-4">
                    <div className="flex gap-4 items-center">
                      <BiCheckDouble className="text-green-500 text-2xl" />
                      <p className="">Manage User</p>
                    </div>
                    <div className="flex gap-4 items-center">
                      <BiCheckDouble className="text-green-500 text-2xl" />
                      <p className="">Manage Articles</p>
                    </div>
                    <div className="flex gap-4 items-center">
                      <BiCheckDouble className="text-green-500 text-2xl" />
                      <p className="">Manage Categories</p>
                    </div>
                    <div className="flex gap-4 items-center">
                      <BiCheckDouble className="text-green-500 text-2xl" />
                      <p className="">Roles and Permission</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-black w-full md:w-1/2 lg:w-2/5 h-full min-h-screen px-4 md:px-6 lg:px-8 py-8 md:py-16">
            <div className="max-w-xs mx-auto">
              <div className="md:hidden">
              <Image
                src={"/logo.png"}
                width={150}
                height={40}
                alt="company-logo"
              />
              </div>
              <h1 className="text-4xl font-semibold text-left py-8">Log in</h1>
              <div className="w-full">
                <Formik
                  initialValues={{ email: "", password: "" }}
                  validationSchema={validationSchema}
                  onSubmit={(values, { setSubmitting, setErrors }) => {
                    handleLogin(values, { setSubmitting, setErrors });
                  }}
                >
                  {({ isSubmitting }) => (
                    <Form className="flex flex-col gap-8">
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
                        placeholder="enter your password"
                        icon={<BiLock />}
                      />
                      <div className="flex flex-col gap-2 mt-4">
                        <button
                          type="submit"
                          className={`bg-blue-600 text-sm text-white rounded-md px-6 py-4 hover:bg-blue-500 ${
                            isSubmitting ? "cursor-wait opacity-50" : ""
                          }`}
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? "Loading..." : "Sign In"}
                        </button>
                      </div>
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
