import Link from "next/link";
import React from "react";

const Home = () => {
  return (
    <div>
      <h3>Home</h3>
      <Link href="/auth/signin">
        <p>Go to Auth</p>
      </Link>
      <Link href="/dashboard">
        <p>Go to Dashboard</p>
      </Link>
    </div>
  );
};

export default Home;
