"use server";

import { hash } from "bcryptjs";
import { loginSchema, signupSchema, type LoginSchema, type SignupSchema } from "~/schemas/auth";
import { db } from "~/server/db";
import crypto from "crypto";
import { signIn as authSignIn } from "~/server/auth";

export async function registerUser(data: SignupSchema) {
  try {
    // Server-side validation
    const result = signupSchema.safeParse(data);
    if (!result.success) {
      return { error: "Invalid data" };
    }

    const { name, email, password } = data;

    // Check if user exist
    const existingUser = await db.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return { error: "User already exist" };
    }

    const hashedPassword = await hash(password, 12);

    await db.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        apiQuota: {
          create: {
            secretKey: `sa_live_${crypto.randomBytes(24).toString("hex")}`,
          },
        },
      },
    });

    // Automatically sign in after signup
    await authSignIn("credentials", {
      email,
      password,
      redirectTo: "/dashboard",
    });

    return { success: true };
  } catch (error) {
    return { error: "Something went wrong" };
  }
}

export async function login(values: LoginSchema) {
  const validatedFields = loginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { email, password } = validatedFields.data;

  try {
    await authSignIn("credentials", {
      email,
      password,
      redirectTo: "/dashboard",
    });
  } catch (error: any) {
    console.error("Login error:", error);
    return { error: error.message || "Invalid credentials!" };
  }
}

export async function signup(values: SignupSchema) {
  const validatedFields = signupSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { email, password, name } = validatedFields.data;

  const existingUser = await db.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    return { error: "Email already exists!" };
  }

  const hashedPassword = await hash(password, 10);

  await db.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  // Automatically sign in after signup
  await authSignIn("credentials", {
    email,
    password,
    redirectTo: "/dashboard",
  });

  return { success: "User created!" };
}   