import React, {useState,useEffect} from 'react'
import ListItem from '../components/ListItem'
import AddButton from '../components/AddButton'

function NotesListPage() {

    const [notes,setNotes] = useState([])

    useEffect(()=>{
        getNotes()
    },[])

    const getNotes = () => {
        fetch(` https://tuhinbarman.pythonanywhere.com/api/notes/`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then((data) => {
            setNotes(data); // Set the notes state with response data
        })
        .catch((error) => {
            console.error('Error fetching data:', error);
        });
    };

    console.log(notes)

    return (
        <div className='notes'>
            <div className='notes-header' >
                <h2 className='notes-title' >&#9782; Notes </h2>
                <p className='notes-count'>{notes.length}</p>
            </div>

            <div className="notes-list">
                
                {notes && notes.map((item) => (
                    <ListItem key={item.id} note={item} />
                ))}
            </div>
            <AddButton/>

        </div>
      );
      
}

export default NotesListPage
