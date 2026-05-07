import { type Request, type Response } from "express";
import { prisma } from "../../lib/prisma.ts";
import { rateLimit, ipKeyGenerator } from "express-rate-limit";
import validator from "validator";
import { error } from "console";
export async function createLink(req: Request, res: Response) {
  try {
    const { userId } = (req as any).user;
    const { title, url } = req.body;

    if (
      !validator.isURL(url, {
        protocols: ["http", "https"],
        require_protocol: true,
      })
    ) {
      return res.status(400).json({ message: "Invalid URL", error });
    }
    const link = await prisma.link.create({
      data: {
        title,
        url,
        userId,
        clickCount: 0,
      },
    });

    return res.status(201).json({ message: "Link created", link });
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({ message: "Failed to create link" });
  }
}

export async function getUserLinks(req: Request, res: Response) {
  try {
    const { userId } = (req as any).user;

    const links = await prisma.link.findMany({
      where: { userId },
      orderBy: { clickCount: "desc" },
    });

    return res.status(200).json({ message: "Links retrieved", links });
  } catch (error: any) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Failed to fetch links", error: error.message });
  }
}

export async function updateLink(req: Request, res: Response) {
  try {
    const { userId } = (req as any).user;
    const linkId = Number(req.params.id);
    const { title, url } = req.body;

    if (!Number.isInteger(linkId)) {
      return res.status(400).json({ message: "Invalid link id" });
    }

    const existingLink = await prisma.link.findUnique({
      where: { id: linkId },
    });

    if (!existingLink) {
      return res.status(404).json({ message: "Link not found" });
    }

    if (existingLink.userId !== userId) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    const updatedLink = await prisma.link.update({
      where: { id: linkId },
      data: {
        title: title || existingLink.title,
        url: url || existingLink.url,
      },
    });

    return res.status(200).json({ message: "Link updated", link: updatedLink });
  } catch (error: any) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Failed to update link", error: error.message });
  }
}

export async function deleteLink(req: Request, res: Response) {
  try {
    const { userId } = (req as any).user;
    const linkId = Number(req.params.id);

    if (!Number.isInteger(linkId)) {
      return res.status(400).json({ message: "Invalid link id" });
    }

    const existingLink = await prisma.link.findUnique({
      where: { id: linkId },
    });

    if (!existingLink) {
      return res.status(404).json({ message: "Link not found" });
    }

    if (existingLink.userId !== userId) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    await prisma.link.delete({
      where: { id: linkId },
    });

    return res.status(200).json({ message: "Link deleted successfully" });
  } catch (error: any) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Failed to delete link", error: error.message });
  }
}

export async function incrementClick(req: Request, res: Response) {
  try {
    const linkId = Number(req.params.id);

    if (!Number.isInteger(linkId)) {
      return res.status(400).json({ message: "Invalid link id" });
    }
    const [clickEvent, updatedLink] = await prisma.$transaction([
      prisma.clickEvent.create({
        data: {
          linkId,
          clickedAt: new Date(),
        },
      }),

      prisma.link.update({
        where: { id: linkId },
        data: {
          clickCount: {
            increment: 1,
          },
        },
      }),
    ]);

    return res
      .status(200)
      .json({ message: "Click tracked", link: updatedLink });
  } catch (error: any) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Failed to track click", error: error.message });
  }
}
export const clickLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minute window
  max: 5, // Limit each IP to 5 clicks per linkId per window
  keyGenerator: (req: Request) => {
    const safeIp = ipKeyGenerator(req.ip ?? "");
    // Combine IP and link ID to create a unique identifier for this specific interaction
    return `${safeIp}-${req.params.id}`;
  },
  message: "Too many clicks recorded for this link. Please try again later.",
  standardHeaders: true,
  legacyHeaders: false,
});
