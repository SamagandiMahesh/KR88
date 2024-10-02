// pages/user/[id].js
"use client";

import { fetchUserById } from "@/lib/user/userSlice";
import Link from "next/link";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"; // Adjust the import path as necessary

function Page({ params }) {
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state) => state.user);

  useEffect(() => {
    if (!user || user.id !== parseInt(params.id)) {
      dispatch(fetchUserById(params.id));
    }
  }, [dispatch, params.id, user]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Failed to load user: {error}</div>;

  return (
    <>
      <Link href="/">Back to Home</Link>
      {user && <div>
        <h1>User Details</h1>
        <p>ID: {user.id}</p>
        <p>Name: {user.firstName} {user.lastName}</p>
        <p>Email: {user.email}</p>
        <p>Phone: {user.phone}</p>
        <p>Company: {user.company.name}</p>
      </div>
}
    </>
  );
}

export default React.memo(Page);
