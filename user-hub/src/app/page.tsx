"use client";

import { useState, useEffect } from "react";

// Separate API call logic
const fetchUsers = async () => {
  try {
    const res = await fetch("https://dummyjson.com/users");
    if (!res.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await res.json();
    return data.users;
  } catch (error) {
    console.error("Failed to fetch users:", error);
    return null;
  }
};

// UserList component for better separation of concerns
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
      <li className="flex justify-between gap-x-6 py-5" key={user.id}>
        <p className="text-sm leading-6 text-gray-900 w-1/6">{user.firstName}</p>
        <p className="text-sm leading-6 text-gray-900 w-1/6">{user.lastName}</p>
        <p className="text-sm leading-6 text-gray-900 w-1/4">{user.email}</p>
        <p className="text-sm leading-6 text-gray-900 w-1/4">{user.phone}</p>
        <p className="text-sm leading-6 text-gray-900 w-1/6">{user.company.name}</p>
      </li>
    ))}
  </ul>
);

export default function Page() {
  const [users, setUsers] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUsers = async () => {
      const fetchedUsers = await fetchUsers();
      setUsers(fetchedUsers);
      setLoading(false);
    };
    getUsers();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (!users) return <div>Failed to load users.</div>;

  return (
   <section className="flex flex-col gap-8 row-start-2 items-center sm:items-start w-full">
        <UserList users={users} />
      </section>
   
  );
}
