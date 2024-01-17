import React, { useState } from 'react'
import "./InputChips.css"

const InputChips = () => {
    const [tag,setTag] = useState("")
    const [tagList,setTagList] = useState([])
    const handleChange = (ele)=>{
        const {value} = ele.target
        setTag(value)
    }
    const handleKeyDown = (e)=>{
        const {key} = e
        console.log(key)
        const newTag = tag.trim()
        if((key === "," || key === "Enter" || key === "Tab" ) && newTag.length && !tagList.includes(newTag)){
            e.preventDefault()
            setTagList(tags=>[...tags, newTag])
            setTag("")  
        }
        else if(key === 'Backspace' && tagList.length && !newTag.length){
            e.preventDefault()
            const tagListDuplicate = [...tagList]
            const lastTag = tagListDuplicate.pop()
            setTagList(tagListDuplicate)
            setTag(lastTag)

        }
        
    }
    const removeTag = (index)=>setTagList(prevTag=>prevTag.filter((tag,i)=> i !== index))
  return (
    <div className='tags-input'>
        {tagList.map((tag,index)=>(
            <div key={index}>
                {tag}
            <button onClick={()=>removeTag(index)}>&times;</button>
                </div>
        ))}
        <input value={tag} onChange={handleChange} onKeyDown={handleKeyDown}/>
    </div>
  )
}

export default InputChips