import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

export default function Home() {
  return (
    <>
     
      <nav className="p-4 md:p-4 shadow-md">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">   
          <a className="text-xl font-bold mb-4 md:mb-0" href="#">Chat App</a>
          <Link href="/sign-in" className="text-blue-500 hover:text-blue-700">
              Sign in
          </Link>
        </div>
      </nav>

      <Separator className="my-4" />
    
      <main className="flex-grow flex flex-col items-center justify-center px-4 md:px-24 py-12">
        <section className="text-center mb-8 md:mb-12">
          <h1 className="text-3xl md:text-4xl font-bold">
            Dive into the World of Anonymous Conversation
          </h1>
          <p className="mt-3 md:mt-4 text-base md:text-lg">
            Explore the Chat App - where your identity remains a secret.
          </p>
        </section>

        <Button className="bg-white text-black hover:bg-gray-300">
          Start Chatting
        </Button>
      </main>

     
      <footer className="text-center p-4 md:p-6">
        © 2025 Chat App. All rights reserved.
      </footer>
    </>
  );
}
