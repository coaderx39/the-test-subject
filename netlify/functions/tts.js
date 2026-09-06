const { mkdtemp, readFile, rm } = require("node:fs/promises");
const { tmpdir } = require("node:os");
const { join } = require("node:path");
const { EdgeTTS } = require("node-edge-tts");

const MAX_TTS_CHARACTERS = 12000;
const HINDI_VOICE = "hi-IN-MadhurNeural";

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, headers: { Allow: "POST" }, body: "Method Not Allowed" };
  }

  let payload;
  try {
    payload = JSON.parse(event.body || "{}");
  } catch {
    return { statusCode: 400, body: JSON.stringify({ error: "Request body must be valid JSON." }) };
  }

  const text = typeof payload.text === "string" ? payload.text.trim() : "";
  if (!text) return { statusCode: 400, body: JSON.stringify({ error: "Text is required." }) };
  if (text.length > MAX_TTS_CHARACTERS) {
    return { statusCode: 413, body: JSON.stringify({ error: `Text must be ${MAX_TTS_CHARACTERS} characters or less.` }) };
  }

  const workDir = await mkdtemp(join(tmpdir(), "apex-krishna-"));
  const audioPath = join(workDir, "narration.mp3");
  try {
    const tts = new EdgeTTS({
      voice: HINDI_VOICE,
      lang: "hi-IN",
      outputFormat: "audio-24khz-48kbitrate-mono-mp3",
      rate: "-2%",
      pitch: "-2Hz",
      timeout: 20000,
    });
    await tts.ttsPromise(text, audioPath);
    const audio = await readFile(audioPath);
    return {
      statusCode: 200,
      isBase64Encoded: true,
      headers: { "Content-Type": "audio/mpeg", "Cache-Control": "no-store", "Content-Length": String(audio.length) },
      body: audio.toString("base64"),
    };
  } catch (error) {
    console.error("Edge TTS synthesis failed", error);
    return { statusCode: 502, body: JSON.stringify({ error: "Free voice service could not synthesize this reply." }) };
  } finally {
    await rm(workDir, { recursive: true, force: true });
  }
};
