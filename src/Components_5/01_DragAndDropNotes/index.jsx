import React, { useState } from "react";
import Notes from "./Notes";

const DragAndDropNotes = () => {
  const [note, setNote] = useState("");
  const [notes, setNotes] = useState([
    {
      id: 1,
      text: "Link in bio for my Frontend Interview Prep Course",
    },
    {
      id: 2,
      text: "Like this Video and Subscribe to Roadside Coder",
    },
  ]);
  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "5px",
          marginTop: "30px",
        }}
      >
        <input
          type="text"
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />
        <button
          style={{ backgroundColor: "lightcoral" }}
          onClick={() => {
            if(note==='') return
            setNotes([...notes, { id: notes.length + 1, text: note }]);
            setNote("");
          }}
        >
          Add Note
        </button>
      </div>
      <Notes notes={notes} setNotes={setNotes} />
    </div>
  );
};

export default DragAndDropNotes;
