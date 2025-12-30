import { useParams, Link } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronLeft, Send } from "lucide-react";
import { useState, useRef, useEffect } from "react";

const sampleMessages = [
  {
    id: 1,
    senderId: "other",
    body: "Hoi! Ik zag je reactie in het topic over gedachten. Wat je schreef raakte me.",
    timestamp: "14:30",
  },
  {
    id: 2,
    senderId: "me",
    body: "Dankjewel dat je me bereikt. Het voelde goed om het eindelijk eens te delen.",
    timestamp: "14:32",
  },
  {
    id: 3,
    senderId: "other",
    body: "Ik herken het helemaal. Soms helpt het al om te weten dat je niet de enige bent die zo voelt.",
    timestamp: "14:33",
  },
  {
    id: 4,
    senderId: "me",
    body: "Precies. Het is fijn om hier mensen te vinden die het begrijpen.",
    timestamp: "14:35",
  },
  {
    id: 5,
    senderId: "other",
    body: "Dankjewel voor je steun, het betekent veel voor me.",
    timestamp: "14:38",
  },
];

const MessageThread = () => {
  const { threadId } = useParams();
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState(sampleMessages);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const otherUser = "bewust_mens";

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!newMessage.trim()) return;
    
    const now = new Date();
    const timestamp = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
    
    setMessages([
      ...messages,
      {
        id: messages.length + 1,
        senderId: "me",
        body: newMessage,
        timestamp,
      },
    ]);
    setNewMessage("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <Layout isLoggedIn={true} showFooter={false}>
      <div className="flex h-[calc(100vh-4rem)] flex-col">
        {/* Header */}
        <div className="border-b border-border/50 bg-card px-4 py-3">
          <div className="container flex items-center gap-4">
            <Link
              to="/messages"
              className="flex items-center gap-1 text-sm text-muted-foreground transition-smooth hover:text-foreground"
            >
              <ChevronLeft className="h-4 w-4" />
              Terug
            </Link>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-sm font-medium text-primary">
                {otherUser.charAt(0).toUpperCase()}
              </div>
              <div>
                <Link
                  to={`/u/${otherUser}`}
                  className="font-medium text-foreground hover:underline"
                >
                  {otherUser}
                </Link>
                <p className="text-xs text-muted-foreground">Online</p>
              </div>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4">
          <div className="container max-w-3xl space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.senderId === "me" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[75%] rounded-2xl px-4 py-3 ${
                    message.senderId === "me"
                      ? "bg-primary text-primary-foreground rounded-br-md"
                      : "bg-muted text-foreground rounded-bl-md"
                  }`}
                >
                  <p className="text-sm leading-relaxed">{message.body}</p>
                  <p
                    className={`mt-1 text-xs ${
                      message.senderId === "me"
                        ? "text-primary-foreground/70"
                        : "text-muted-foreground"
                    }`}
                  >
                    {message.timestamp}
                  </p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input */}
        <div className="border-t border-border/50 bg-card p-4">
          <div className="container max-w-3xl">
            <div className="flex items-center gap-3">
              <Input
                placeholder="Schrijf een bericht..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-1"
              />
              <Button onClick={handleSend} disabled={!newMessage.trim()}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default MessageThread;
