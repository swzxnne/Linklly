import { type Request, type Response } from "express";
import * as bcrypt from "bcrypt-ts/node";
import { signToken } from "../utils/jwt.ts";
import { prisma } from "../../lib/prisma.ts";

export async function registerNewUser(req: Request, res: Response) {
  const newHashPassword = await bcrypt.hash(req.body.password, 10);

  const user = await prisma.user.create({
    data: {
      email: req.body.email,
      username: req.body.username,
      hashPassword: newHashPassword,
    },
    omit: { hashPassword: true },
  });

  await prisma.profile.create({
    data: {
      bio: "",
      name: "",
      userId: user.id,
    },
  });

  res.status(201).json({ message: "User registered successfully", user });
}

export async function loginUser(req: Request, res: Response) {
  const { username, password } = req.body;
  const user = await prisma.user.findUnique({
    where: { username: username },
  });
  if (username == null) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const isMatch = await bcrypt.compare(password, user!.hashPassword);

  if (isMatch) {
    const token = signToken({ userId: user!.id });
    return res
      .status(200)
      .json({ message: "User logged in successfully", token });
  } else {
    return res.status(401).json({ message: "Invalid password" });
  }
}
