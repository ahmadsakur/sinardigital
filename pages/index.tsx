import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

const Home = () => {
  const router = useRouter();
  useEffect(() => {
    router.push("/auth/signin");
  }, [router]);

  return <></>;
};

export default Home;
