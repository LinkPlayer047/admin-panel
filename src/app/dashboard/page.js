"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getToken } from "../../utils/auth";
import Navbar from "../../components/Navbar";
import ProtectedRoute from "@/components/ProtectedRoutes";

export default function Dashboard() {
  const router = useRouter();

  return (
    <ProtectedRoute >
    <Navbar>
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <p className="mt-4">Welcome to the admin dashboard!</p>
    </Navbar>
    </ProtectedRoute>
  );
}
