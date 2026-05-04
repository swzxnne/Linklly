import { type Request, type Response } from "express";
import * as bcrypt from "bcrypt-ts/node";
import { prisma } from "../../lib/prisma";

export async function fetchUserProfile(req: Request, res: Response) {
  try {
    const { username } = req.params;

    if (!username) {
      return res.status(400).json({ message: "Username is required" });
    }
    const user = await prisma.user.findUniqueOrThrow({
      where: { username: username as string },
      select: {
        username: true,
        email: true,
        profile: {
          omit: { id: true, userId: true },
        },
        links: true,
      },
    });

    return res.status(200).json({
      message: "User profile found",
      data: user,
    });
  } catch (error: any) {
    if (error.code === "P2025") {
      return res.status(404).json({ error: "User not found" });
    }
    console.error(error);
    res.status(500).json({ error: "Database connection failed" });
  }
}

export async function editProfile(req: Request, res: Response) {
  try {
    const { userId } = (req as any).user;
    const { name, bio } = req.body;
    const updatedUser = await prisma.profile.update({
      where: { userId: userId },
      data: { name: name, bio: bio },
    });

    return res
      .status(200)
      .json({ message: "Profile updated", user: updatedUser });
  } catch (error: any) {
    return res.status(500).json({ message: "Update failed", error });
  }
}

export async function resetPassword(req: Request, res: Response) {
  try {
    const { oldPassword, newPassword } = req.body;
    const { userId } = (req as any).user;

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(oldPassword, user!.hashPassword);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid old password" });
    }
    if (newPassword === oldPassword) {
      return res
        .status(400)
        .json({ message: "New password must be different from old password" });
    }
    const newHashPassword = await bcrypt.hash(newPassword, 10);

    await prisma.user.update({
      where: { id: userId },
      data: { password: newHashPassword },
    });

    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
}

export async function deleteUser(req: Request, res: Response) {
  try {
    const { userId } = (req as any).user;

    if (!userId) {
      return res.status(401).json({ error: "Missing or invalid userId/email" });
    }
    await prisma.user.delete({
      where: {
        id: userId,
      },
    });
    return res.status(200).json({ message: "User deleted successfully" });
  } catch (error: any) {
    if (error.code === "P2025") {
      return res
        .status(404)
        .json({ error: "User not found or data doesnt match" });
    } else {
      return res.status(404).json({ error });
    }
  }
}
