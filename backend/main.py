from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from deep_translator import GoogleTranslator
from gtts import gTTS
import base64
from io import BytesIO

app = FastAPI()

# CORS so frontend (localhost:3000) can access backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

translator = GoogleTranslator(source='auto', target='en')

class RequestBody(BaseModel):
    text: str
    lang: str

@app.post("/translate")
def translate(req: RequestBody):
    # translation
    translated = GoogleTranslator(source='auto', target=req.lang).translate(req.text)

    # audio generation
    buf = BytesIO()
    tts = gTTS(translated, lang=req.lang)
    tts.write_to_fp(buf)
    buf.seek(0)
    
    audio_base64 = base64.b64encode(buf.read()).decode()

    return {
        "translated_text": translated,
        "audio_base64": audio_base64
    }
