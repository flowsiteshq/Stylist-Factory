/*
  STYLIST FACTORY — Reviews Page
  Design: Review cards with star rating, reply functionality
*/

import { useState } from "react";
import { Star, MessageSquare, CheckCircle } from "lucide-react";
import { mockReviews } from "@/lib/mockData";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export default function Reviews() {
  const [reviews, setReviews] = useState(mockReviews);
  const [replyText, setReplyText] = useState<Record<string, string>>({});
  const [replyingTo, setReplyingTo] = useState<string | null>(null);

  const avgRating = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;

  const submitReply = (reviewId: string) => {
    const text = replyText[reviewId];
    if (!text?.trim()) { toast.error("Please enter a reply"); return; }
    setReviews((prev) => prev.map((r) => r.id === reviewId ? { ...r, isReplied: true, reply: text } : r));
    setReplyingTo(null);
    toast.success("Reply sent successfully!");
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Reviews</h1>
          <p className="text-muted-foreground text-sm mt-0.5">{reviews.length} customer reviews</p>
        </div>
        <div className="flex items-center gap-2 bg-amber-50 px-4 py-2 rounded-xl">
          <Star size={18} className="text-amber-500 fill-amber-500" />
          <span className="text-xl font-bold text-foreground" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{avgRating.toFixed(1)}</span>
          <span className="text-sm text-muted-foreground">avg rating</span>
        </div>
      </div>

      {/* Rating Distribution */}
      <Card className="border-0 shadow-sm">
        <CardContent className="p-4">
          <div className="grid grid-cols-5 gap-2">
            {[5, 4, 3, 2, 1].map((star) => {
              const count = reviews.filter((r) => r.rating === star).length;
              const pct = (count / reviews.length) * 100;
              return (
                <div key={star} className="text-center">
                  <div className="flex items-center justify-center gap-0.5 mb-1">
                    <Star size={12} className="text-amber-500 fill-amber-500" />
                    <span className="text-xs font-medium">{star}</span>
                  </div>
                  <div className="h-1.5 bg-muted rounded-full overflow-hidden mb-1">
                    <div className="h-full bg-amber-500 rounded-full" style={{ width: `${pct}%` }} />
                  </div>
                  <span className="text-xs text-muted-foreground">{count}</span>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Reviews List */}
      <div className="space-y-4">
        {reviews.map((review) => (
          <Card key={review.id} className="border border-border/60 shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <img src={review.customerImage} alt={review.customerName} className="w-10 h-10 rounded-full object-cover flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="font-semibold text-sm text-foreground">{review.customerName}</p>
                      <p className="text-xs text-muted-foreground">{review.service} · {new Date(review.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</p>
                    </div>
                    <div className="flex items-center gap-0.5 flex-shrink-0">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} size={13} className={cn(i < review.rating ? "text-amber-500 fill-amber-500" : "text-gray-300")} />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-foreground mt-2">{review.comment}</p>

                  {review.isReplied && review.reply && (
                    <div className="mt-3 pl-3 border-l-2 border-primary/30 bg-muted/30 rounded-r-lg p-2">
                      <p className="text-xs font-semibold text-primary mb-0.5 flex items-center gap-1">
                        <CheckCircle size={11} />Your reply
                      </p>
                      <p className="text-xs text-foreground">{review.reply}</p>
                    </div>
                  )}

                  {!review.isReplied && (
                    <div className="mt-3">
                      {replyingTo === review.id ? (
                        <div className="space-y-2">
                          <textarea
                            className="w-full text-sm border border-border rounded-lg p-2.5 resize-none focus:outline-none focus:border-primary"
                            rows={2}
                            placeholder="Write your reply..."
                            value={replyText[review.id] || ""}
                            onChange={(e) => setReplyText((prev) => ({ ...prev, [review.id]: e.target.value }))}
                          />
                          <div className="flex gap-2">
                            <Button size="sm" className="h-7 text-xs bg-primary hover:bg-primary/90 text-white" onClick={() => submitReply(review.id)}>
                              Send Reply
                            </Button>
                            <Button size="sm" variant="outline" className="h-7 text-xs" onClick={() => setReplyingTo(null)}>
                              Cancel
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <Button size="sm" variant="outline" className="h-7 text-xs gap-1" onClick={() => setReplyingTo(review.id)}>
                          <MessageSquare size={11} />Reply
                        </Button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
