"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useRouter } from "next/navigation";
import { ScrollArea } from "@/components/ui/scroll-area";
import axios from "axios";

export default function MessageDashboard() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<{ text: string; sender: "me" | "them" }[]>([]);
  const [userToken, setUserToken] = useState<string | null>(null);

  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("jwt");
      setUserToken(token);

      if (!token) {
        router.replace("/sign-in");
      }
    }
  }, [router]);

  useEffect(() => {

    const messageHistory = axios.get(`http://localhost:1337/api/messages?filters[userID][$eq]=${localStorage.getItem("userID")}`,
      {
        headers: {
          "Authorization": "bearer " + localStorage.getItem('jwt')
        }
      }
    )
      .then((data) => {
        let messageArr = []
        for (let index = 0; index < data.data.data.length; index++) {
          // console.log(data.data.data[index].message);
          const oldMessage = data.data.data[index].message;
          messageArr.push({ text: oldMessage, sender: "me" as const })
        }

        //here we push all the message 
        setMessages(messageArr)


        console.log(data.data.data.messages)
        // console.log(messageHistory);
      })

  }, [])

  const handleSendMessage = async () => {
      if (message.trim()) {
      const newMessage = { text: message, sender: "me" as const };

      console.log(localStorage.getItem('userID'));

      try {
        const response = await axios.post('http://localhost:1337/api/messages', {
          data: {
            userID: localStorage.getItem('userID'),
            message,
          }
        }, {
          headers: {
            "Authorization": "bearer " + localStorage.getItem('jwt')
          }
        })
        setMessage('')
        setMessages([...messages, newMessage])
        console.log(response.data);

      } catch (error) {
        console.log("message response error", error);
      }
    }
  };



  const handleLogout = () => {
    // localStorage.removeItem("user");
    localStorage.removeItem("jwt");
    localStorage.removeItem("userID");
    setUserToken(null);
    router.replace("/sign-in");
  };

  if (!userToken) {
    return null;
  }

  return (
    <div className="flex flex-col h-screen bg-gray-100 dark:bg-gray-900">
      {/* Navigation */}
      <nav className="p-4 shadow-md bg-white dark:bg-gray-800">
        <div className="container mx-auto flex justify-between items-center">
          <a className="text-4xl text-black font-bold" href="#">Chat App</a>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>
      </nav>

      <Separator />

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        <div className="flex-1 flex flex-col">
          {(
            <>
              <ScrollArea className="flex-1 p-4">
                <div className="flex flex-col gap-3">
                  {messages.map((msg, index) => (
                    <div
                      key={index}
                      className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[70%] p-3 rounded-lg ${msg.sender === 'me'
                          ? 'bg-blue-500 text-white rounded-br-none'
                          : 'bg-gray-700 dark:bg-gray-700 rounded-bl-none'
                          }`}
                      >
                        {msg.text}
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>

              {/* Message Input */}
              <div className="p-4 border-t bg-black dark:bg-gray-800 flex gap-2">
                <Input
                  className="flex-1"
                  type="text"
                  placeholder="Type a message..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                />
                <Button onClick={handleSendMessage}>Send</Button>
              </div>
            </>
          )
          }
        </div>
      </div>
    </div>
  );
}