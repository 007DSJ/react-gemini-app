import { useState } from "react";

const App = () => {

  const [image, setImage] = useState(null)
  const [value, setValue] = useState("")
  const [response, setResponse] = useState("")
  const [error, setError] = useState("")

  const surpriseOptions = [
    "Does the image have a movie character?",
    "Is the image resembles a coin?",
    "Does the image resembles a famous place?"
  ]

  const uploadImages = async (e) => {

    const formData = new FormData()
    formData.append('file', e.target.files[0])
    setImage(e.target.files[0])

    try {
      const options = {
        method: 'POST',
        body: formData
      }

      const response = await fetch('http://localhost:8000/upload', options)
      const data = await response.json()

    } catch (error) {
      console.error(error)
    }

  }

  const surprise = () => {
    const randomPrompt = surpriseOptions[Math.floor(Math.random() * surpriseOptions.length)]
    setValue(randomPrompt)
  }

  const analyzeImage = async() => {
    if (!image) {
      setError("Error !! No Images present")
      return
    }

    try {
      const options = {
        method: 'POST',
        body: JSON.stringify({
          message:value
        }),
        headers:{
          "Content-Type": "application/json"
        }
      }
      const response = await fetch('http://localhost:8000/gemini/', options)
      const data = await response.text()
      setResponse(data)

    } catch (error) {
      console.error(error)
      setError("Something didn't work please try again")
    }
  }

  const clear = () => {
    setImage(null)
    setValue("")
    setResponse("")
    setError("")
  }

  return (
    <div className="app">
      <section className="search-section">
        <div className="image-container">
          {image && <img className="image" src={URL.createObjectURL(image)} />}
        </div>

       {!response && <p className="extra-info">
          <span>
            <label htmlFor="files">Upload an image</label>
            <input onChange={uploadImages} id="files" accept="image/*" type="file" hidden />
          </span>
          ask questions about it.
        </p>}

        <p>
          What do you want to know about the image?
          <button className="surprise" onClick={surprise} disabled={response}> Surpirse Me </button>
        </p>

        <div className="input-container">
          <input
            value={value}
            placeholder="What is it???"
            onChange={e => setValue(e.target.value)}
          />
          {(!response && !error) && <button onClick={analyzeImage}>Ask Me</button>}
          {(response || error) && <button onClick={clear}>Clear</button>}
        </div>

        {error && <p>{error}</p>}
        {response && <p className="answer">{response}</p>}
      </section>
    </div>
  );
}

export default App;
