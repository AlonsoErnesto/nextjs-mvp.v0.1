import { z } from "zod";

// User schema
export const userSchema = z.object({
  id: z.string().uuid().optional(),
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Invalid email address" }),
  age: z
    .number()
    .min(18, { message: "Must be at least 18 years old" })
    .optional(),
});

export type User = z.infer<typeof userSchema>;

// Login schema
export const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
});

export type LoginInput = z.infer<typeof loginSchema>;

// Product schema
export const productSchema = z.object({
  id: z.string().uuid().optional(),
  name: z
    .string()
    .min(2, { message: "Product name must be at least 2 characters" }),
  description: z.string().optional(),
  price: z.number().positive({ message: "Price must be positive" }),
  category: z.enum(["electronics", "clothing", "food", "other"]),
  inStock: z.boolean().default(true),
});

export type Product = z.infer<typeof productSchema>;
