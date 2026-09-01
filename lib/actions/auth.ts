"use server";

import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { connectDB } from "@/lib/db";
import { AdminUser } from "@/lib/models/AdminUser";
import { createSession, deleteSession } from "@/lib/session";

const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export type LoginState = {
  error?: string;
} | null;

export async function loginAction(
  _prev: LoginState,
  formData: FormData
): Promise<LoginState> {
  const parsed = LoginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    return { error: "Invalid email or password." };
  }

  await connectDB();
  const user = await AdminUser.findOne({ email: parsed.data.email }).lean();

  if (!user) return { error: "Invalid email or password." };

  const valid = await bcrypt.compare(parsed.data.password, user.passwordHash);
  if (!valid) return { error: "Invalid email or password." };

  await createSession({
    userId: String(user._id),
    email: user.email,
    name: user.name,
    role: user.role,
  });

  redirect("/admin");
}

export async function logoutAction(): Promise<void> {
  await deleteSession();
  redirect("/admin/login");
}
