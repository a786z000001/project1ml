import { NextResponse } from "next/server";
import { connectDB } from "../../../lib/db";
import Session from "../../../models/Session";
import { generateResponse } from "../../../lib/respond";
console.log("ENV CHECK:", process.env.MONGODB_URI);
export async function POST(req: Request) {
  console.log("✅ API HIT");
//try starts
  try {
    await connectDB();

    const { message, sessionId } = await req.json();

    if (!message || !sessionId) {
      return NextResponse.json(
        { error: "Missing message or sessionId" },
        { status: 400 }
      );
    }

    let session = await Session.findOne({ sessionId });

    if (!session) {
      session = await Session.create({
        sessionId,
        messages: [],
      });
    }

    // store user message
    session.messages.push({
      role: "user",
      content: message,
    });

    // generate personalized reply
    const reply = generateResponse(message);

    session.messages.push({
      role: "assistant",
      content: reply,
    });

    await session.save();
console.log("✅ SENDING REPLY:", reply);

    return NextResponse.json({ reply });

  } 
  
  // try ends
  catch (err) {
  console.error("API ERROR:", err);

  return NextResponse.json(
    {
      reply: "I’m here with you. Something unexpected happened — tell me a bit more."
    },
    { status: 200 }
  );
}

}
