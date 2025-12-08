import React, { useState, useEffect } from "react";
import './App.css';
import keep from "./keep.jpg";
function App() {
  const [text, setText] = useState("");
  const [lang, setLang] = useState("hi");
  const [translated, setTranslated] = useState("");
  const [audio, setAudio] = useState("");
   useEffect(() => {
    document.body.style.backgroundImage = `url(${keep})`;
  }, []);
  const handleTranslate = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/translate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: text,
          lang: lang,
        }),
      });

      if (!response.ok) {
        throw new Error("Backend error");
      }

      const data = await response.json();

      setTranslated(data.translated_text);
      setAudio(data.audio_base64);

    } catch (err) {
      alert("Error: " + err.message);
    }
  };

  return (
    <div  className="app-container" style={{
      
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        width: "100%",
        height: "100vh",
        color: "black",

      }}>
      <h1>Indian Language Translator</h1>

      <textarea
        rows="5"
        style={{
    width: "100%",
    height: "50px",                
    padding: "5px 10px",          
    fontSize: "14px",             
    border: "1px solid #ccc",      
    borderRadius: "5px",           
    resize: "none",                
  }}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter text to translate"
      ></textarea>

      <br /><br />

      <select value={lang} onChange={(e) => setLang(e.target.value)}  style={{
    width: "20%",
    height: "50px",                
    padding: "5px 10px",          
    fontSize: "14px",             
    border: "1px solid #ccc",      
    borderRadius: "5px",           
    resize: "none",                
  }}>
        <option value="hi">Hindi</option>
        <option value="bn">Bengali</option>
        <option value="te">Telugu</option>
        <option value="mr">Marathi</option>
        <option value="ta">Tamil</option>
        <option value="ur">Urdu</option>
        <option value="gu">Gujarati</option>
        <option value="kn">Kannada</option>
        <option value="or">Odia</option>
        <option value="ml">Malayalam</option>
        <option value="pa">Punjabi</option>
      </select>

      <br /><br />

      <button onClick={handleTranslate} style={{
    width: "20%",
    height: "50px",                
    padding: "5px 10px",          
    fontSize: "14px",             
    border: "1px solid #ccc",      
    borderRadius: "5px",           
    resize: "none",                
  }}>Translate</button>

      <br /><br />

      <h2>Translation:</h2>
      <p>{translated}</p>

      <br />

      {audio && (
        <>
          <h3>Audio:</h3>
          <audio controls src={`data:audio/mp3;base64,${audio}`} />
        </>
      )}
    </div>
  );
}

export default App;
