import * as yup from "yup";

// User schema with Yup
export const userYupSchema = yup.object({
  name: yup
    .string()
    .required("Name is required")
    .min(2, "Name must be at least 2 characters"),
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
  age: yup.number().min(18, "Must be at least 18 years old").optional(),
});

// Login schema with Yup
export const loginYupSchema = yup.object({
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters"),
});

// Product schema with Yup
export const productYupSchema = yup.object({
  name: yup
    .string()
    .required("Product name is required")
    .min(2, "Product name must be at least 2 characters"),
  description: yup.string().optional(),
  price: yup
    .number()
    .required("Price is required")
    .positive("Price must be positive"),
  category: yup
    .string()
    .oneOf(["electronics", "clothing", "food", "other"], "Invalid category")
    .required("Category is required"),
  inStock: yup.boolean().default(true),
});
