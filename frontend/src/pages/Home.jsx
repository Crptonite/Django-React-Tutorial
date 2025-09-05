import { useState, useEffect } from "react"
import api from "../api"
import Note from "../components/Note"
import "../styles/Home.css"
function Home(){
  const [notes, setNotes] = useState([]);
  const [content, setContent] = useState("")
  const [title, setTitle] = useState("")

  useEffect(() => {
    getNotes();
  }, [])
  const getNotes = () =>{
    api
    .get("/api/notes/")
    .then((res) => res.data)
    .then((data) => { setNotes(data); console.log(data) })
    .catch((err) => alert(err));
  };
    const deleteNote = (id) => {
        api
            .delete(`/api/notes/delete/${id}/`)
            .then((res) => {
                if (res.status === 204) alert("Note deleted!");
                else alert("Failed to delete note.");
                getNotes();
            })
            .catch((error) => alert(error));
    };
  const createNote = (e) => {
    e.preventDefault()
    api.post("/api/notes/", { content, title }).then((res)=>
    {
      if (res.status === 201) alert("Note created!")
      else alert("Failed to make note.")
      getNotes();

    }).catch((err) => alert(err))
  }

  return <div>
    <div>
      <h2>Notes</h2>
    </div>
    <div>
      <h2>Create a Note</h2>
      <form onSubmit={createNote}>
        <label htmlFor="title">Title:</label>
        <br />
        <input type="text" id="title" name="title" required onChange={(e) => setTitle(e.target.value)} value={title} />
        <label htmlFor="content">Content: </label>
        <br />
        <textarea name="content" id="content" value={content} onChange={(e) => setContent(e.target.value)}></textarea>
        <br />
        <input type="submit" value="Submit"></input>
      </form>
        {notes.map((note) => (<Note note={note} onDelete={deleteNote} key={note.id}/>))}
    </div>
  </div>
}

export default Home


// import { useState, useEffect } from "react";
// import api from "../api";
// import Note from "../components/Note"

// function Home() {
//   const [notes, setNotes] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [title, setTitle] = useState("");
//   const [content, setContent] = useState("");

//   // Fetch notes when component mounts
//   useEffect(() => {
//     getNotes();
//   }, []);

//   const getNotes = () => {
//     api
//       .get("/api/notes/")
//       .then((res) => {
//         setNotes(res.data);
//         setLoading(false);
//       })
//       .catch((err) => {
//         alert("Failed to fetch notes.");
//         setLoading(false);
//       });
//   };

//   const addNote = (e) => {
//     e.preventDefault();
//     if (!title || !content) {
//       alert("Please fill out both fields.");
//       return;
//     }

//     api
//       .post("/api/notes/", { title, content })
//       .then((res) => {
//         alert("Note added!");
//         setTitle("");
//         setContent("");
//         getNotes(); // Refresh the list
//       })
//       .catch((err) => {
//         if (err.response) {
//           console.error("Error:", err.response.data);
//           alert("Error: " + JSON.stringify(err.response.data));
//         } else {
//           console.error(err);
//           alert("Network error. Is the backend running?");
//         }
//       });
//   };

//   const deleteNote = (id) => {
//     api
//       .delete(`/api/notes/delete/${id}/`)
//       .then((res) => {
//         if (res.status === 204) {
//           alert("Note deleted!");
//           getNotes();
//         } else {
//           alert("Failed to delete note.");
//         }
//       })
//       .catch((err) => {
//         if (err.response) {
//           console.error("Error:", err.response.data);
//           alert("Error: " + JSON.stringify(err.response.data));
//         } else {
//           console.error(err);
//           alert("Network error. Is the backend running?");
//         }
//       });
//   };

//   return (
//     <div className="home-container">
//       <h1>Your Notes</h1>

//       {/* Add Note Form */}
//       <form onSubmit={addNote} style={{ marginBottom: "30px" }}>
//         <input
//           type="text"
//           placeholder="Title"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//           style={{ display: "block", marginBottom: "10px", width: "100%" }}
//         />
//         <textarea
//           placeholder="Content"
//           value={content}
//           onChange={(e) => setContent(e.target.value)}
//           rows="4"
//           style={{ display: "block", marginBottom: "10px", width: "100%" }}
//         />
//         <button type="submit">Add Note</button>
//       </form>

//       {/* List Notes */}
//       {loading ? (
//         <p>Loading...</p>
//       ) : notes.length === 0 ? (
//         <p>No notes yet.</p>
//       ) : (
//         <ul>
//           {notes.map((note) => (
//             <li key={note.id} style={{ marginBottom: "20px" }}>
//               <h3>{note.title}</h3>
//               <p>{note.content}</p>
//               <button onClick={() => deleteNote(note.id)}>Delete</button>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// }

// export default Home;
