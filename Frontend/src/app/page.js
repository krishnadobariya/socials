"use client"
import Link from "next/link";
import HomePage from "./components/Home/HomePage";
import withAuth from "@/app/utils/withAuth";

const Home =() => {
    return (
      <HomePage/>
    );
}

export default withAuth(Home)