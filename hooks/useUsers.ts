import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { User } from "@/lib/db";
import { userSchema } from "@/schemas/zod-schemas";

// Fetch all users
async function fetchUsers(): Promise<User[]> {
  const response = await fetch("/api/users");
  if (!response.ok) {
    throw new Error("Failed to fetch users");
  }
  return response.json();
}

// Create a new user
async function createUser(userData: Omit<User, "id">): Promise<User> {
  // Validate with Zod before sending
  const validatedData = userSchema.parse(userData);

  const response = await fetch("/api/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(validatedData),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to create user");
  }

  return response.json();
}

// Hook for fetching users
export function useUsers() {
  return useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });
}

// Hook for creating a user
export function useCreateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      // Invalidate and refetch the users query
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
}
