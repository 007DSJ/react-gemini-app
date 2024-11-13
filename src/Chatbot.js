import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './index.css';

const Chatbot = () =>{

    const [value, setValue] = useState("")
    const [response, setResponse] = useState("")
    const [error, setError] = useState("")
    const [chatHistoy, setChatHistory] = useState([])

    const surpriseOptions = [
        "Does the image have a movie character?",
        "Is the image resembles a coin?",
        "Does the image resembles a famous place?"
    ]

    const surprise = () => {
        const randomPrompt = surpriseOptions[Math.floor(Math.random() * surpriseOptions.length)]
        setValue(randomPrompt)
    }

    const clear = () => {
        setValue("")
        setResponse("")
        setError("")
    }

    const getResponse = async() => {
        if (!value) {
          setError("Error !! Please ask a question")
          return
        }
    
        try {
          const options = {
            method: 'POST',
            body: JSON.stringify({
              history: chatHistoy,  
              message:value
            }),
            headers:{
              "Content-Type": "application/json"
            }
          }
          const response = await fetch('http://localhost:8000/gemini-chat/', options)
          const data = await response.text()
          setChatHistory(oldChatHistory => [...oldChatHistory,{
            role:'user',
            parts:[{ text: value }],
          },
          {
            role:'model',
            parts:[{ text: data }],
          }
        ])
        // console.log(data)
        // console.log(value)
        setValue("")
        } catch (error) {
          console.error(error)
          setError("Something didn't work please try again")
        }
    }
    

    return(
        <div className='app'>
        <div>
          <Link className="link-to" to={'/chat-bot'}>Chatbot</Link>
          <Link className="link-to" to={'/'}>Imagebot</Link>
        </div>
            <section className='search-section'>
                <p>What do you need?
                    <button onClick={surprise} disabled={chatHistoy} className='surprise'>Go</button>
                </p>
                <div className='input-container'>
                    <input
                        value={value}
                        placeholder="What are you looking for ???"
                        onChange={e => setValue(e.target.value)}
                    />
                    {!error && <button onClick={getResponse}>Ask Me</button>}
                    {error && <button onClick={clear}>Clear</button>}
                </div>
                <div className='search-result'>
                    {
                      chatHistoy.map((chatItem, _index)=>
                        <div key={_index}>
                          {/* <p className='answer'>
                            {chatItem.role} : {chatItem.parts}
                          </p> */}
                          {<p className="answer">
                            {chatItem.role}:{" "}
                            {chatItem.parts.map((item) => item.text)}
                          </p>}
                        </div>
                      )
                    }
                </div>
            </section>
        </div>
    )
}

export default Chatbot;