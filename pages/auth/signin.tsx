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
      const { token } = response.data.data;
      console.log(token);
    } catch (error: any) {
      setErrors({ email: error.response.data.message });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
    <Head>
      <title>SIM PPOB - Ahmad Sakur</title>
    </Head>
    <div className="max-w-7xl mx-auto min-h-screen h-full bg-white text-black">
      <div className="flex items-center h-full w-full">
        <div className="bg-white w-full md:w-1/2 h-full mx-auto flex flex-col justify-center items-center min-h-screen px-4 md:px-6 lg:px-8 py-8">
          <div className="flex gap-2 items-center">
            <div className="aspect-square">
              <Image
                src="/assets/icons/main-logo.png"
                width={30}
                height={30}
                alt="SIM-PPOB Logo"
              />
            </div>
            <h1 className="text-2xl font-bold">SIM-PPOB</h1>
          </div>
          <div className="max-w-xl md:max-w-sm text-3xl font-medium text-gray-800 text-center py-8">
            Masuk atau buat akun untuk memulai
          </div>
          <div className="w-full lg:w-2/3 mx-auto">
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
                    placeholder="masukkan email anda"
                    icon={<BiAt />}
                  />
                  <PasswordInput
                    id="password"
                    name="password"
                    placeholder="masukkan password anda"
                    icon={<BiLock />}
                  />
                  <div className="flex flex-col gap-2 mt-4">
                    <button
                      type="submit"
                      className={`bg-[#ff4d00] text-white rounded-md py-2 ${
                        isSubmitting ? "cursor-wait opacity-50" : ""
                      }`}
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Loading..." : "Masuk"}
                    </button>
                  </div>
                </Form>
              )}
            </Formik>

            <p className="text-gray-500 text-sm py-4 text-center mx-auto">
              belum punya akun ? daftar{" "}
              <Link href={"/register"} className="text-[#ff4d00] font-medium">
                di sini.
              </Link>
            </p>
          </div>
        </div>
        <div
          className="bg-[#fff1f0] hidden md:w-1/2 md:block min-h-screen relative bg-top bg-cover bg-no-repeat"
          style={{
            backgroundImage: "url('/assets/images/login-illustration.png')",
          }}
        ></div>
      </div>
    </div>
    </>
  );
};

export default LoginPage;
