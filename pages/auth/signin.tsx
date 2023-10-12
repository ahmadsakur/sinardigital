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

  const handleLogin = async (
    values: { email: string; password: string },
    { setErrors, setSubmitting }: any
  ) => {
    setSubmitting(true);
    try {
      const response = await AuthService.login(values);
      const { access_token } = response.data.data;
      sessionStorage.setItem("access_token", access_token);
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
          <div className="bg-neutral-900 hidden md:w-1/2 lg:w-3/5 md:block min-h-screen relative bg-top bg-cover bg-no-repeat"></div>
          <div className="bg-black w-full md:w-1/2 lg:w-2/5 h-full min-h-screen px-4 md:px-6 lg:px-8 py-8 md:py-16">
            <div className="max-w-xs mx-auto">
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
                        placeholder="masukkan email anda"
                        icon={<BiAt />}
                      />
                      <PasswordInput
                        id="password"
                        name="password"
                        label="Password"
                        placeholder="masukkan password anda"
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

                {/* <p className="text-gray-500 text-xs py-2 text-left mx-auto">
                  belum punya akun ? daftar{" "}
                  <Link
                    href={"/register"}
                    className="text-blue-400 font-medium"
                  >
                    di sini.
                  </Link>
                </p> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
