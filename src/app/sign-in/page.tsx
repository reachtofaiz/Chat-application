'use client';

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { Loader2 } from "lucide-react";

// Define the form schema using Zod
const formSchema = z.object({
  identifier: z.string().min(1, "Email/Username is required"),
  password: z.string().min(1, "Password is required"),
});

// Define types for Strapi response
interface StrapiUser {
  id: number;
  username: string;
  email: string;
}

interface StrapiAuthResponse {
  error: any;
  jwt: string;
  user: StrapiUser;
}

export default function SignInForm() {
  const router = useRouter();
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Initialize the form
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      identifier: "",
      password: "",
    },
  });

  // Handle form submission
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsLoading(true);
      setError('');

      // Get your Strapi URL from environment variable
      const strapiUrl = 'http://localhost:1337';
      
      const response = await fetch(`${strapiUrl}/api/auth/local`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
       
        body: JSON.stringify({
          identifier: values.identifier, 
          password: values.password,
        }),
      });

      const data: StrapiAuthResponse = await response.json();

      console.log(data.jwt);
      console.log(data.user.id);
      

      if (!response.ok) {
        throw new Error(data.error?.message || 'Invalid credentials');
      }

      if (data.jwt) {
  
        localStorage.setItem('jwt', data.jwt);
        localStorage.setItem('userID', JSON.stringify(data.user.id));
        
        router.replace('/message-dashboard');

      } else {
        throw new Error('Authentication failed');
      }

    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('Something went wrong during sign in');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-black text-white">
      <div className="w-full max-w-md p-8 space-y-8 bg-gray-900 rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
            Join Chat Application
          </h1>
          <p className="mb-4">Sign-in to start your anonymous talks</p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="gap-4 flex flex-col justify-center items-center">
            <div className="w-full">
              <FormField
                control={form.control}
                name="identifier"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email or Username</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your email or username" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="w-full">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your password" type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {error && (
              <div className="text-red-500 text-sm">{error}</div>
            )}

            <Button
              type="submit"
              className="w-fit items-center"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Signing in...
                </>
              ) : (
                'Sign in'
              )}
            </Button>
          </form>
        </Form>
        <div>
          <p className="text-center">
            Don't have an account?{" "}
            <Link href="/sign-up" className="text-blue-500 hover:text-blue-700">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}