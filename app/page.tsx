import { generateMetadata } from "@/lib/metadata";
import UserList from "@/components/UserList";

export const metadata = generateMetadata({
  title: "Home",
  description: "Welcome to the Next.js MVP application",
});

export default function Home() {
  return (
    <main className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Next.js MVP</h1>
      <p className="mb-4">
        Welcome to the Next.js MVP application with Zustand, Zod, TanStack
        Query, and more!
      </p>

      <UserList />
    </main>
  );
}
