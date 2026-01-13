import { useParams, Link } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronLeft, Send, Loader2 } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { messageBodySchema } from "@/lib/validations";
import { useThread, useThreadMessages, useSendMessage } from "@/hooks/useMessages";
import { useAuth } from "@/hooks/useAuth";
import { formatMessageTime } from "@/lib/dateUtils";

const MessageThread = () => {
  const { threadId } = useParams();
  const { user } = useAuth();
  const [newMessage, setNewMessage] = useState("");
  const [error, setError] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const { data: thread, isLoading: threadLoading } = useThread(threadId);
  const { data: messages, isLoading: messagesLoading } = useThreadMessages(threadId);
  const sendMessage = useSendMessage();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    setError("");
    
    const result = messageBodySchema.safeParse(newMessage);
    if (!result.success) {
      setError(result.error.errors[0]?.message || "Ongeldig bericht");
      return;
    }
    
    try {
      await sendMessage.mutateAsync({
        threadId: threadId!,
        body: newMessage,
      });
      setNewMessage("");
    } catch (err: any) {
      setError(err.message || "Kon bericht niet versturen");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (threadLoading) {
    return (
      <Layout showFooter={false}>
        <div className="flex h-[calc(100vh-4rem)] items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </Layout>
    );
  }

  if (!thread) {
    return (
      <Layout showFooter={false}>
        <div className="container py-8">
          <Link
            to="/messages"
            className="mb-6 inline-flex items-center gap-1 text-sm text-muted-foreground transition-smooth hover:text-foreground"
          >
            <ChevronLeft className="h-4 w-4" />
            Terug naar berichten
          </Link>
          <div className="rounded-xl border border-border/50 bg-card p-8 text-center shadow-soft">
            <p className="text-muted-foreground">Gesprek niet gevonden</p>
          </div>
        </div>
      </Layout>
    );
  }

  const otherUser = thread.otherUser;

  return (
    <Layout showFooter={false}>
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
                {otherUser?.avatar_url ? (
                  <img src={otherUser.avatar_url} alt="" className="h-full w-full rounded-full object-cover" />
                ) : (
                  otherUser?.username?.charAt(0).toUpperCase() || "?"
                )}
              </div>
              <div>
                <Link
                  to={`/u/${otherUser?.username}`}
                  className="font-medium text-foreground hover:underline"
                >
                  {otherUser?.username || "Onbekend"}
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4">
          <div className="container max-w-3xl space-y-4">
            {messagesLoading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="h-6 w-6 animate-spin text-primary" />
              </div>
            ) : messages && messages.length > 0 ? (
              messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender_id === user?.id ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[75%] rounded-2xl px-4 py-3 ${
                      message.sender_id === user?.id
                        ? "bg-primary text-primary-foreground rounded-br-md"
                        : "bg-muted text-foreground rounded-bl-md"
                    }`}
                  >
                    <p className="text-sm leading-relaxed">{message.body}</p>
                    <p
                      className={`mt-1 text-xs ${
                        message.sender_id === user?.id
                          ? "text-primary-foreground/70"
                          : "text-muted-foreground"
                      }`}
                    >
                      {formatMessageTime(message.created_at)}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex items-center justify-center py-12">
                <p className="text-muted-foreground">Start het gesprek...</p>
              </div>
            )}
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
                maxLength={5000}
              />
              <Button 
                onClick={handleSend} 
                disabled={!newMessage.trim() || sendMessage.isPending}
              >
                {sendMessage.isPending ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
              </Button>
            </div>
            {error && (
              <p className="mt-2 text-sm text-destructive">{error}</p>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default MessageThread;
