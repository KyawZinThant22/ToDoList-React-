import { useEffect, useState } from "react";
import Header from "./Header";

function App() {


  const [data , setData] = useState([]);
  const [todo , setTodo] = useState("");
  const [click , setClick ] = useState(false)
  const [Edit , setEdit] = useState(null);
  const [EditText ,setEditText ] = useState('')


  useEffect(() => {
    const DataJson = localStorage.getItem("Data")
    if ( DataJson) {
      setData(JSON.parse(DataJson))
    }
  },[])

  useEffect(() => {
    const Data = JSON.stringify(data)
    localStorage.setItem("Data" , Data)
  } , [data])

  const handleSubmit = (e) => {
    e.preventDefault();

   const  newTodo = {
      id : new Date().getTime(),
      text : todo,
      completed : false
    }

    setData([...data].concat(newTodo))
    setTodo("");
    setClick(false)
  }

  const handleClick = () => {
    click? setClick(false) : setClick(true)
  }


  const handleDelete = (id) => {
    const updatedTodo = [...data].filter((item) => item.id !== id)
    setData(updatedTodo)
  }


  const handleEdit = (id) => {

      const updatedTodo = [...data].map((item) => {
        if(item.id === id) {
          item.text = EditText
        }
        return item
      })

      setData(updatedTodo)
      setEdit(null)
  }

  return (
    <div className="App">
      <div className="caontaienr">
         <Header/>

          { click && <form onSubmit={handleSubmit} >
              <input type="text" className="input-form" required  autoFocus value={todo} onChange = { (e) => setTodo(e.target.value)}/>
              <button className="btn btn-primary form-btn">Add +</button>
          </form>}

       { Edit &&  <form className = "form--edit" >
              <input type="text" className="input-form" required  autoFocus value={EditText} onChange = { (e) => setEditText(e.target.value)}/>
         </form>}

         <div className="container-todo">

           

            {data.map((item) => (
                  <div key={item.id}>
                    <div className="todo" >

                          <div className="box">
                              <input type='checkbox'  />
                            <p>{item.text}</p>
                            </div>
                          <div className="btn-flx">
                              <button className="btn btn-primary" onClick={() => setEdit(item.id)}>Edit</button>
                              <button className="btn btn-danger"  onClick={() => handleDelete(item.id)}>Delete</button>
                          </div>
                          </div>
                          
                          { Edit && <div className="btn-div"> <button className="btn btn-main edit" onClick={() => handleEdit(item.id)}>Edit +</button> </div>}
                          

                    </div>
                   
            ))}

            <div className="btn-div">
              { !Edit && <button className="btn btn-main" onClick ={handleClick} >+ New Task</button>}
           
            
            </div> 


           

           

          </div>
          
      </div>
    </div>
  );
}

export default App;
