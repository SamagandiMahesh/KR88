"use client";

import { fetchUsers } from "@/lib/user/userSlice";
import Link from "next/link";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

const UserRow = ({ user }) => (
  <li className="flex justify-between gap-x-6 py-5">
    <Link
      href={`/user/${user.id}`}
      className="w-full flex justify-between gap-x-6"
    >
      <p className="text-sm leading-6 text-gray-900 w-1/6">{user.firstName}</p>
      <p className="text-sm leading-6 text-gray-900 w-1/6">{user.lastName}</p>
      <p className="text-sm leading-6 text-gray-900 w-1/4">{user.email}</p>
      <p className="text-sm leading-6 text-gray-900 w-1/4">{user.phone}</p>
      <p className="text-sm leading-6 text-gray-900 w-1/6">
        {user.company.name}
      </p>
    </Link>
  </li>
);

const UserList = ({ users }) => (
  <ul role="list" className="divide-y divide-gray-100 w-full">
    <li className="flex justify-between gap-x-6 py-5">
      <p className="text-sm leading-6 text-gray-900 w-1/6">FirstName</p>
      <p className="text-sm leading-6 text-gray-900 w-1/6">LastName</p>
      <p className="text-sm leading-6 text-gray-900 w-1/4">Email</p>
      <p className="text-sm leading-6 text-gray-900 w-1/4">Phone</p>
      <p className="text-sm leading-6 text-gray-900 w-1/6">Company.name</p>
    </li>
    {users.map((user) => (
      <UserRow key={user.id} user={user} />
    ))}
  </ul>
);

export default function Users() {

  const { users, loading, value } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  console.log(loading, value, users);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  if (loading) return <div>Loading...</div>;
  if (!users) return <div>Failed to load users.</div>;

  return (
    <section className="flex flex-col gap-8 row-start-2 items-center sm:items-start w-full">
      <UserList users={users} />
    </section>
  );
}
