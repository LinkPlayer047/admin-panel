"use client";
import React from "react";

const UserCard = ({ user }) => {
  return (
    <div className="border p-4 rounded shadow">
      <h2 className="font-bold text-lg">{user.name}</h2>
      <p className="text-gray-600">{user.email}</p>
    </div>
  );
};

export default UserCard;
