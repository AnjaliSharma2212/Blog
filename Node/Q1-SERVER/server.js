const express = require("express")

const app= express()
app.use(express.json())

let tasks =[]
let idCounter=1;

//create Task

app.post("/tasks", (req,res)=>{
    const {title, description,status}= req.body;

    if(!title || !description){
        return res.status(400).json({message:"Title and description are required."})
    }

    const task= {
        id:idCounter++,
        title,
        description, 
        status: status || "pending",
    }

    tasks.push(task)
    res.status(201).json(task)
})

//update Task

app.put("/task/:id",(req,res)=>{
    const task= tasks.find(t => t.id ===Number(req.params.id))


    if(!task){
         return res.status(404).json({ message: "Tsk not found" });
    }

    const {title, description, status}= req.body;

    if(status && !["pending", "In-progress","completed"].includes(status)){
          return res.status(400).json({ message: "Invalid status value" });
    }
    
  task.title = title ?? task.title;
  task.description = description ?? task.description;
  task.status = status ?? task.status;

  res.status(200).json(task);
})


// delte a task

app.delete("tasks/:id", (req,res)=>{
    const index= tasks.findIndex(t=> t.id===Number(req.params.id))
    if(index===-1){
     return res.status(404).json({ message: "Task not found" });
    }
    tasks.splice(index,1)
    res.status(204).send();
})



const PORT=3000;
app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`)
})