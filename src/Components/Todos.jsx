import React, { useEffect, useState } from 'react'
import './style.css'

const getData = ()=>{
    const lists = localStorage.getItem("todos");
    if (lists) {
        return JSON.parse(lists)
    }else{
        return []
    }
}

const Todos = (props) => {
    const [inputdata,setInputData] = useState("");
    const [items,setItems] = useState(getData());
    const [edit,setEdit] = useState("");

    const addItems = ()=>{
      console.log("lll")
        if (!inputdata) {
            alert("Input Data Not be Empty...")
        }else if(inputdata){
            setItems(
                items.map((curElem)=>{
                    if (curElem.id === edit) {
                        return {...curElem, name : inputdata}
                    }
                    return curElem
                })
            )
        }else{
            const objectId = {
                id : new Date().getTime().toString(),
                name : inputdata,
            }
            setItems([...items, objectId])
            setInputData("")
        }
    }

    const updated = (index)=>{
        const editjan = items.find((curElem)=>{
            return curElem.id === index
        })
        setInputData(editjan.name)
        setEdit(index)
    }

    const deletedItem = (index)=>{
        const deleted = items.filter((curElem)=>{
            return curElem.id !== index;
        })
        setItems(deleted)
    }
    const removeAll = ()=>{
        setItems([])
    }

    useEffect(()=>{
        localStorage.setItem("todos",JSON.stringify(items))
    },[items])
  return (
    <>
      <div className="main-div" style={{background : props.mode}}>
        <div className="child-div">
          <span className='absolute left-4 top-3'>💡 <span className='font-bold text-2xl cursor-pointer' style={{color: props.mode === "#060822"?"white":"black"}} onClick={()=>props.toggleMode()}>Enable Modes</span></span>
          <figure>
            <figcaption style={{color: props.mode === "#060822"?"white":"black"}}>Add Your List Here ✌</figcaption>
          </figure>
          <div className="addItems">
            <input
              type="text"
              placeholder="✍ Add Item"
              className="form-control"
              value={inputdata}
              onChange={(event)=>setInputData(event.target.value)}
              style={{background: props.mode === "#060822"?"white":"black"}}
            />
              <i className=" absolute left-[85rem] top-[20.5rem] cursor-pointer" onClick={addItems}>➕</i>
          </div>
          {/* show our items  */}
          <div className="showItems"> 
            {
                items.map((curElem,index)=>{
                    return (
                  <div className="eachItem" key={index} style={{background: props.mode === "#060822"?"rgb(85, 41, 220)":"black"}}>
                      <h3 style={{color: props.mode === "#060822"?"white":"rgb(85, 41, 220)"}}>{curElem.name}</h3>
                  <div className="todo-btn">
                    <i className="far fa-edit add-btn" onClick={()=>updated(curElem.id)}>📑</i>
                    <i className="far fa-trash-alt add-btn" onClick={()=>deletedItem(curElem.id)}>🗑</i>
                  </div>
                </div>
                    )
                })
            }          
          </div>

          {/* rmeove all button  */}
          <div className="showItems">
            <button
              className="btn effect04"
              data-sm-link-text="Remove All"
              onClick={removeAll}
              >
              <span> CHECK LIST</span>
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Todos
