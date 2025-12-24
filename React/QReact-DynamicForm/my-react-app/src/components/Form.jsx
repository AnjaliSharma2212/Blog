import { useState } from "react"

export default function Form(){
    const [questions,setQuestions]= useState([
        {id:Date.now(), label:"",type:"text" }]
    )
const addQuestion=()=>{
    setQuestions(prev=> [...prev, {id:Date.now(), label:"", type:"text"}])
}
const deleteQuestion=(id)=>{
    setQuestions(prev=> prev.filter(q=> q.id!=id))
}
    const updateQuestions=(id,field,value)=>{
    setQuestions((prev)=>prev.map(q=> q.id===id ? {...q,[field]:value}: q))
    }
return(
    <>
    <div style={{ padding: "20px", maxWidth: "600px" }}>
        <h1>Dynamic Form Survey</h1>
    {questions.map((q, index) =>(
        <div key={q.id} style={{ marginBottom: "10px" }}>
            <input 
            type="text"
            value={q.label}
            placeholder={`Question ${index +1}`}
            onChange={(e)=> updateQuestions(q.id,"label",e.target.value)}/>
             <select
            value={q.type}
            onChange={(e) =>
              updateQuestions(q.id, "type", e.target.value)
            }
          >
            <option value="text">Text</option>
            <option value="number">Number</option>
            <option value="email">Email</option>
          </select>
            <button onClick={()=>deleteQuestion(q.id)}>Remove</button>
        </div>
    ))}

    <button onClick={addQuestion}>Add Question</button>
    <hr />

    <h4>Live Preview</h4>
     {questions.map(q => (
        <div key={q.id}>
          <label>{q.label || "Untitled Question"}</label>
          <input type={q.type} disabled />
        </div>
      ))}
    </div>

    
    </>
)
}