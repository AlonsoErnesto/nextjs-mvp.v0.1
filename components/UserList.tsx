"use client";

import { useUsers, useCreateUser } from "@/hooks/useUsers";
import { useAppStore } from "@/store/useStore";
import { useState } from "react";
import { userSchema } from "@/schemas/zod-schemas";
import { z } from "zod";

export default function UserList() {
  const { data: users, isLoading, error } = useUsers();
  const createUserMutation = useCreateUser();
  const [formData, setFormData] = useState({ name: "", email: "" });
  const [validationErrors, setValidationErrors] = useState<z.ZodFormattedError<{
    name: string;
    email: string;
  }> | null>(null);

  // Get user from Zustand store
  const { user, setUser } = useAppStore();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Validate with Zod
      userSchema.parse(formData);
      setValidationErrors(null);

      // Submit the form
      createUserMutation.mutate(
        {
          ...formData,
          password: "", // Add a default password or handle it appropriately
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          onSuccess: (newUser) => {
            // Update Zustand store with the new user
            setUser({
              id: newUser.id,
              name: newUser.name,
              email: newUser.email,
            });

            // Reset form
            setFormData({ name: "", email: "" });
          },
        }
      );
    } catch (error) {
      if (error instanceof z.ZodError) {
        setValidationErrors(error.format());
      }
    }
  };

  if (isLoading) return <div>Loading users...</div>;
  if (error) return <div>Error loading users: {error.message}</div>;

  return (
    <div className="user-list-container">
      <h2>Users</h2>

      {/* Current user from store */}
      {user.id && (
        <div className="current-user">
          <h3>Current User</h3>
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
        </div>
      )}

      {/* User list */}
      <ul>
        {users?.map((user) => (
          <li key={user.id}>
            {user.name} ({user.email})
          </li>
        ))}
      </ul>

      {/* Create user form */}
      <form onSubmit={handleSubmit}>
        <h3>Create New User</h3>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />
          {validationErrors?.name && (
            <p className="error">{validationErrors.name._errors.join(", ")}</p>
          )}
        </div>

        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
          {validationErrors?.email && (
            <p className="error">{validationErrors.email._errors.join(", ")}</p>
          )}
        </div>

        <button type="submit" disabled={createUserMutation.isPending}>
          {createUserMutation.isPending ? "Creating..." : "Create User"}
        </button>

        {createUserMutation.isError && (
          <p className="error">Error: {createUserMutation.error.message}</p>
        )}
      </form>
    </div>
  );
}
