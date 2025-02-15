"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function MessageDashboard() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<string[]>([]);

  const handleSendMessage = () => {
    if (message.trim()) {
      setMessages([message, ...messages]); 
      setMessage("");
    }
  };

  return (
    <>
   
      <nav className="p-4 md:p-4 shadow-md">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
          <a className="text-xl font-bold mb-4 md:mb-0" href="#">Chat App</a>
          <button 
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
            Logout
        </button>
        </div>
      </nav>

      <Separator className="my-4" />

      <div className="flex flex-col h-[80vh] max-w-lg mx-auto border rounded-lg shadow-md p-4">
        <h2 className="text-xl font-bold text-center mb-2">Message Dashboard</h2>

        <div className="flex-grow overflow-y-auto flex flex-col-reverse">
          {messages.map((msg, index) => (
            <Card key={index} className="mt-2">
              <CardContent className="p-2">{msg}</CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-4 flex gap-2">
          <Input
            type="text"
            placeholder="Type a message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <Button onClick={handleSendMessage}>Send</Button>
        </div>
      </div>
    </>
  );
}
