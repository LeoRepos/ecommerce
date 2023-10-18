import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth";

const hundler = NextAuth(authOptions);

export { hundler as GET, hundler as POST };
