import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ReactComponent as ArrowLeft } from '../assets/arrow-left.svg';

const SingleNotePage = () => {
    const {id} = useParams(); // Access the id parameter directly
    const [note, setNote] = useState({});

    useEffect(() => {
        getObjectData();
    }, [id]);

    const updateNote = () => {
        const headers = new Headers({
            "Content-Type": "application/json",
        });
        const data = {
            "body": note.body
        };
        const body = JSON.stringify(data);
        fetch(`https://tuhinbarman.pythonanywhere.com/api/notes/${id}/`, {
            method: 'PATCH',
            headers: headers,
            body: body
        })
        .then((response) => response.json())
        .then((response) => {
            console.log(response);
        })
        .catch((error) => {
            console.error('Error updating note:', error);
        });
    };

    const getObjectData = () => {
        const headers = new Headers({
            "Content-Type": "application/json",
        });
        fetch(` https://tuhinbarman.pythonanywhere.com/api/notes/${id}/`, {
            method: 'GET',
            headers: headers
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error('Failed to fetch note');
            }
            return response.json();
        })
        .then((response) => {
            setNote(response);
        })
        .catch((error) => {
            console.error('Error fetching note:', error);
        });
    };

    const handleSubmit = () => {

        if(id !== 'new' && note.body === ''){
            deleteNode();
        }else if(id !== 'new'){
            updateNote();
        }else if(id === 'new' && note.body !== null){
            createNode();
        }
        
    };

    const onChangeText = (event) => {
        setNote((prev) => ({
            ...prev,
            body: event.target.value
        }));
    };

    const deleteNode = () => {
        const headers = new Headers({
            "Content-Type": "application/json",
        });
        fetch(` https://tuhinbarman.pythonanywhere.com/api/notes/${id}/`, {
                method: 'DELETE',
                headers: headers,
            }).then((response)=>{
                return response.json()
            }).then((response)=>{
                console.log(response)
            }).catch((error)=>{
                console.log(error)
            })
    }

    const createNode = () => {
        const headers = new Headers({
            "Content-Type": "application/json",
        });
        const data = {
            "body": note.body
        };
        const body = JSON.stringify(data);
        fetch(` https://tuhinbarman.pythonanywhere.com/api/notes/`, {
            method: 'POST',
            headers: headers,
            body: body
        })
        .then((response) => response.json())
        .then((response) => {
            console.log(response);
        })
        .catch((error) => {
            console.error('Error updating note:', error);
        });
    }

    return (
        <div className='note'>
            <div className="note-header">
                <h3>
                    <Link to='/'>
                        <ArrowLeft onClick={handleSubmit} />
                    </Link> 
                </h3>
                {id !== 'new' ? (<Link to="/">
                        < button onClick={deleteNode}>Delete</button>
                </Link>) : (<Link to="/">
                        < button onClick={createNode}>Done</button>
                </Link>)}
                
            </div>
            <textarea value={note.body} onChange={onChangeText}></textarea>
        </div>
    );
};

export default SingleNotePage;

// import React, { useState, useEffect } from 'react'
// import { ReactComponent as ArrowLeft } from '../assets/arrow-left.svg'
// // import { Link } from 'react-router-dom'

// const NotePage = ({ match, history }) => {

//     let noteId = match.params.id
//     let [note, setNote] = useState({})

//     useEffect(() => {
//         getNote()
//     }, [noteId])


//     let getNote = async () => {
//         if (noteId === 'new') return

//         let response = await fetch(`/api/notes/${noteId}/`)
//         let data = await response.json()
//         setNote(data)
//     }

//     let createNote = async () => {
//         fetch(`/api/notes/`, {
//             method: "POST",
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify(note)
//         })
//     }


//     let updateNote = async () => {
//         fetch(`/api/notes/${noteId}/`, {
//             method: "PUT",
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify(note)
//         })
//     }


//     let deleteNote = async () => {
//         fetch(`/api/notes/${noteId}/`, {
//             method: 'DELETE',
//             'headers': {
//                 'Content-Type': 'application/json'
//             }
//         })
//         history.push('/')
//     }

//     let handleSubmit = () => {
//         console.log('NOTE:', note)
//         if (noteId !== 'new' && note.body === '') {
//             deleteNote()
//         } else if (noteId !== 'new') {
//             updateNote()
//         } else if (noteId === 'new' && note.body !== null) {
//             createNote()
//         }
//         history.push('/')
//     }

//     let handleChange = (value) => {
//         setNote(note => ({ ...note, 'body': value }))
//         console.log('Handle Change:', note)
//     }

//     return (
//         <div className="note" >
//             <div className="note-header">
//                 <h3>
//                     <ArrowLeft onClick={handleSubmit} />
//                 </h3>
//                 {noteId !== 'new' ? (
//                     <button onClick={deleteNote}>Delete</button>
//                 ) : (
//                     <button onClick={handleSubmit}>Done</button>
//                 )}

//             </div>
//             <textarea onChange={(e) => { handleChange(e.target.value) }} value={note?.body}></textarea>
//         </div>
//     )
// }

// export default NotePage

