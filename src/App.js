import { useState } from "react";

const App =()=> {

  const [image, setImage] = useState(null)

  const uploadImages = async (e) =>{
    
    const formData = new FormData()
    formData.append('file',e.target.files[0])
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

  return (
    <div className="app">
      {image && <img src={URL.createObjectURL(image)}/>}
      <label htmlFor="files">Upload an image</label>
      <input onChange={uploadImages} id="files" accept="image/*" type="file" hidden />
    </div>
  );
}

export default App;
