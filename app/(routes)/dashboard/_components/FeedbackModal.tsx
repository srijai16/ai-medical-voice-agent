"use client"
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { X, Star, MessageCircle, Loader } from "lucide-react";

interface FeedbackModalProps {
    sessionData: {
        doctorName?: string;
        callDuration?: string;
        sessionId?: string;
    };
    onSubmit: (rating: number, comment: string) => Promise<void>;
    onClose: () => void;
    onSkip: () => void;
}

export default function FeedbackModal({ 
    sessionData, 
    onSubmit, 
    onClose, 
    onSkip 
}: FeedbackModalProps) {
    const [rating, setRating] = useState<number | null>(null);
    const [comment, setComment] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [hoverRating, setHoverRating] = useState<number | null>(null);

    const handleSubmit = async () => {
        if (!rating) return;
        
        setIsSubmitting(true);
        try {
            await onSubmit(rating, comment);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-2xl max-w-md w-full overflow-hidden">
                {/* Header */}
                <div className="p-6 border-b">
                    <div className="flex justify-between items-center mb-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                                <MessageCircle className="h-5 w-5 text-blue-600" />
                            </div>
                            <div>
                                <h3 className="font-bold text-lg text-gray-900">Share Your Experience</h3>
                                <p className="text-sm text-gray-600">
                                    Help us improve MediVoice AI
                                </p>
                            </div>
                        </div>
                        <button 
                            onClick={onClose}
                            className="text-gray-400 hover:text-gray-600"
                        >
                            <X className="h-5 w-5" />
                        </button>
                    </div>
                    
                    {sessionData.doctorName && (
                        <div className="text-sm text-gray-700 bg-blue-50 p-3 rounded-lg">
                            <span className="font-medium">Session with Dr. {sessionData.doctorName}</span>
                            {sessionData.callDuration && (
                                <span className="text-gray-600"> • {sessionData.callDuration}</span>
                            )}
                        </div>
                    )}
                </div>

                {/* Content */}
                <div className="p-6">
                    {/* Rating */}
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-900 mb-3">
                            How would you rate this session? *
                        </label>
                        <div className="flex justify-center gap-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                    key={star}
                                    type="button"
                                    onClick={() => setRating(star)}
                                    onMouseEnter={() => setHoverRating(star)}
                                    onMouseLeave={() => setHoverRating(null)}
                                    className="text-4xl focus:outline-none transition-transform hover:scale-110"
                                >
                                    <Star 
                                        className={`
                                            ${(hoverRating || rating) && star <= (hoverRating || rating!) 
                                                ? 'text-yellow-400 fill-yellow-400' 
                                                : 'text-gray-300'
                                            }
                                            transition-colors duration-200
                                        `}
                                    />
                                </button>
                            ))}
                        </div>
                        <div className="flex justify-between mt-2 text-sm text-gray-500">
                            <span>Poor</span>
                            <span>Excellent</span>
                        </div>
                    </div>

                    {/* Comment */}
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-900 mb-2">
                            Your feedback (optional)
                        </label>
                        <Textarea
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            placeholder="What did you like? What could we improve?"
                            className="min-h-[100px] resize-none"
                        />
                    </div>
                </div>

                {/* Footer */}
                <div className="p-6 border-t bg-gray-50 flex gap-3">
                    <Button
                        variant="outline"
                        onClick={onSkip}
                        className="flex-1"
                    >
                        Skip
                    </Button>
                    <Button
                        onClick={handleSubmit}
                        disabled={!rating || isSubmitting}
                        className="flex-1 bg-blue-600 hover:bg-blue-700"
                    >
                        {isSubmitting ? (
                            <>
                                <Loader className="animate-spin mr-2 h-4 w-4" />
                                Submitting...
                            </>
                        ) : (
                            'Submit Feedback'
                        )}
                    </Button>
                </div>
            </div>
        </div>
    );
}