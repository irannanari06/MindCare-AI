import { NextResponse } from "next/server";

const crisisPhrases = ["i want to die", "i want to hurt myself"];

const systemInstruction = `
You are MindCare AI, a kind mental wellness assistant for students.
Rules:
- Give emotional support only.
- Never diagnose illness.
- Never prescribe medicine.
- Never claim to replace a therapist, doctor, counselor, or emergency support.
- Personalize every answer to the user's latest message and mood history when provided.
- Do not repeat the same generic answer for different moods.
- Offer practical coping strategies, journaling prompts, grounding, breathing, study focus tips, and encouragement.
- If the user sounds unsafe or mentions self-harm, urge them to contact a trusted person or emergency helpline immediately.
- Keep replies warm, concise, and easy for a student to understand.
- Use this reply pattern: validate the feeling, give 2-3 specific steps, then ask one gentle follow-up question.
`;

function detectCrisis(messages) {
  const latest = messages[messages.length - 1]?.text?.toLowerCase() || "";
  return crisisPhrases.some((phrase) => latest.includes(phrase));
}

function latestUserText(messages) {
  return [...messages].reverse().find((message) => message.role === "user")?.text || "";
}

function moodSummary(moodHistory = []) {
  if (!Array.isArray(moodHistory) || moodHistory.length === 0) {
    return "No mood tracker entries yet.";
  }

  return moodHistory
    .slice(0, 7)
    .map((entry) => `${entry.date}: ${entry.mood}`)
    .join(", ");
}

function fallbackReply(messages = [], moodHistory = []) {
  const text = latestUserText(messages).toLowerCase();
  const latestMood = Array.isArray(moodHistory) ? moodHistory[0]?.mood?.toLowerCase() : "";

  if (text.includes("lonely") || latestMood === "sad") {
    return "That sounds lonely and heavy, and I am glad you said it out loud here. Try sending one simple message to someone safe, sit somewhere with a little light or movement, and write one sentence that starts with 'Right now I need...'. Who is one trusted person you could check in with today?";
  }

  if (text.includes("focus") || text.includes("study") || latestMood === "tired") {
    return "Focus can feel hard when your mind is tired or overloaded. Pick one tiny task, set a 10 minute timer, and keep only the material for that task in front of you. After the timer, take a short stretch break. What subject or task are you trying to focus on?";
  }

  if (text.includes("stress") || text.includes("stressed") || latestMood === "anxious") {
    return "Stress can make everything feel urgent at once. Try this: breathe in for 4, breathe out for 6, then write the top three worries and circle only the one you can act on first. What is the biggest pressure on your mind right now?";
  }

  if (text.includes("angry") || latestMood === "angry") {
    return "Anger usually means something important feels unfair, blocked, or overwhelming. Step away for a minute if you can, unclench your jaw and hands, then write what you wish people understood. What happened right before the anger rose?";
  }

  if (text.includes("calm") || latestMood === "calm" || latestMood === "happy") {
    return "It is good to notice a steadier moment. You can protect it by naming what helped, taking one slow breath, and choosing one small thing that keeps the day gentle. What helped you feel this way?";
  }

  return "I hear you, and your feelings make sense. Take one slow breath, name the emotion as clearly as you can, and choose one small next step like drinking water, writing a sentence, or asking someone safe for support. What feeling is strongest right now?";
}

export async function POST(request) {
  try {
    const { messages = [], moodHistory = [] } = await request.json();

    if (detectCrisis(messages)) {
      return NextResponse.json({
        reply: "Please contact a trusted person or emergency helpline immediately. If you are in immediate danger, call local emergency services now."
      });
    }

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json({ reply: fallbackReply(messages, moodHistory) });
    }

    const contents = [
      {
        role: "user",
        parts: [
          {
            text: `Mood tracker context for personalization: ${moodSummary(moodHistory)}`
          }
        ]
      },
      {
        role: "model",
        parts: [
          {
            text: "Understood. I will use the mood context gently without diagnosing, and I will tailor the support to the latest message."
          }
        ]
      },
      ...messages.map((message) => ({
        role: message.role === "assistant" ? "model" : "user",
        parts: [{ text: message.text }]
      }))
    ];

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          system_instruction: {
            parts: [{ text: systemInstruction }]
          },
          contents,
          generationConfig: {
            temperature: 0.95,
            topP: 0.9,
            maxOutputTokens: 260
          }
        })
      }
    );

    if (!response.ok) {
      return NextResponse.json({ reply: fallbackReply(messages, moodHistory) });
    }

    const data = await response.json();
    const reply = data.candidates?.[0]?.content?.parts?.map((part) => part.text).join(" ").trim();
    return NextResponse.json({ reply: reply || fallbackReply(messages, moodHistory) });
  } catch (error) {
    return NextResponse.json({ reply: fallbackReply([], []) }, { status: 200 });
  }
}
