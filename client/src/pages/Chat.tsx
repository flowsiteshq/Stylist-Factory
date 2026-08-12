/*
  STYLIST FACTORY — Chat / Inbox Page
  Design: Two-panel chat layout with conversation list + message thread
*/

import { useState } from "react";
import { Send, Search } from "lucide-react";
import { mockMessages } from "@/lib/mockData";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export default function Chat() {
  const [conversations, setConversations] = useState(mockMessages);
  const [activeConv, setActiveConv] = useState(mockMessages[0]);
  const [newMessage, setNewMessage] = useState("");

  const sendMessage = () => {
    if (!newMessage.trim()) return;
    const updatedConvs = conversations.map((conv) => {
      if (conv.id === activeConv.id) {
        const updated = {
          ...conv,
          lastMessage: newMessage,
          time: "Just now",
          messages: [...conv.messages, { id: conv.messages.length + 1, text: newMessage, sender: "owner" as const, time: "Just now" }],
        };
        setActiveConv(updated);
        return updated;
      }
      return conv;
    });
    setConversations(updatedConvs);
    setNewMessage("");
  };

  return (
    <div className="flex h-[calc(100vh-4rem)] lg:h-screen">
      {/* Conversation List */}
      <div className="w-72 flex-shrink-0 border-r border-border flex flex-col bg-white">
        <div className="p-4 border-b border-border">
          <h1 className="text-lg font-bold text-foreground mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Messages</h1>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Search..." className="pl-9 h-8 text-sm" />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          {conversations.map((conv) => (
            <button
              key={conv.id}
              onClick={() => setActiveConv(conv)}
              className={cn(
                "w-full flex items-start gap-3 p-4 text-left hover:bg-muted/50 transition-colors border-b border-border/30",
                activeConv.id === conv.id && "bg-primary/5 border-l-2 border-l-primary"
              )}
            >
              <img src={conv.customerImage} alt={conv.customerName} className="w-10 h-10 rounded-full object-cover flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-0.5">
                  <p className="font-semibold text-sm text-foreground truncate">{conv.customerName}</p>
                  <span className="text-xs text-muted-foreground flex-shrink-0">{conv.time}</span>
                </div>
                <p className="text-xs text-muted-foreground truncate">{conv.lastMessage}</p>
              </div>
              {conv.unread > 0 && (
                <Badge className="bg-primary text-white border-0 text-xs px-1.5 py-0 h-5 min-w-5 flex items-center justify-center flex-shrink-0">
                  {conv.unread}
                </Badge>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Message Thread */}
      <div className="flex-1 flex flex-col bg-background">
        {/* Chat Header */}
        <div className="flex items-center gap-3 px-5 py-3.5 border-b border-border bg-white">
          <img src={activeConv.customerImage} alt={activeConv.customerName} className="w-9 h-9 rounded-full object-cover" />
          <div>
            <p className="font-semibold text-sm text-foreground" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{activeConv.customerName}</p>
            <p className="text-xs text-green-500">Online</p>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-5 space-y-3">
          {activeConv.messages.map((msg) => (
            <div key={msg.id} className={cn("flex", msg.sender === "owner" ? "justify-end" : "justify-start")}>
              <div className={cn(
                "max-w-xs lg:max-w-md px-4 py-2.5 rounded-2xl text-sm",
                msg.sender === "owner"
                  ? "bg-primary text-white rounded-br-sm"
                  : "bg-white border border-border text-foreground rounded-bl-sm shadow-sm"
              )}>
                <p>{msg.text}</p>
                <p className={cn("text-xs mt-1", msg.sender === "owner" ? "text-white/60" : "text-muted-foreground")}>
                  {msg.time}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Message Input */}
        <div className="p-4 border-t border-border bg-white">
          <div className="flex gap-2">
            <Input
              placeholder="Type a message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              className="flex-1"
            />
            <Button onClick={sendMessage} className="bg-primary hover:bg-primary/90 text-white px-4">
              <Send size={16} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
