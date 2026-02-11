// lib/respond.ts

type StressType =
  | "work"
  | "relationship"
  | "anxiety"
  | "burnout"
  | "self_doubt"
  | "general";

function detectStressType(message: string): StressType {
  const text = message.toLowerCase();

  if (text.match(/work|job|boss|deadline|office|career/)) return "work";
  if (text.match(/relationship|friend|partner|family|breakup/)) return "relationship";
  if (text.match(/anxious|panic|fear|overthink|worried/)) return "anxiety";
  if (text.match(/tired|burnt|exhausted|drained|empty/)) return "burnout";
  if (text.match(/failure|not good enough|doubt|confidence/)) return "self_doubt";

  return "general";
}

export function generateResponse(message: string): string {
  const type = detectStressType(message);

  switch (type) {
    case "work":
      return (
        "Work pressure can quietly build up and make everything feel heavy. " +
        "Let’s slow this down for a moment — what part of work is stressing you the most right now?"
      );

    case "relationship":
      return (
        "Relationships can be emotionally draining when things feel unclear or tense. " +
        "Do you feel more hurt, confused, or exhausted by this situation?"
      );

    case "anxiety":
      return (
        "That sounds overwhelming, and it makes sense you’re feeling this way. " +
        "Is your mind racing about one specific thing, or many things at once?"
      );

    case "burnout":
      return (
        "Feeling drained like this is often a sign you’ve been carrying too much for too long. " +
        "When was the last time you truly felt rested?"
      );

    case "self_doubt":
      return (
        "Self-doubt can be incredibly heavy, especially when you’re trying your best. " +
        "What made you start questioning yourself today?"
      );

    default:
      return (
        "I’m really glad you shared this. Let’s unpack it gently. " +
        "What’s the part of this situation that’s bothering you the most?"
      );
  }
}
