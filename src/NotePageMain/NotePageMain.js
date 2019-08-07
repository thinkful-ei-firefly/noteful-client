import React from 'react';
import Note from '../Note/Note';
import Context from '../Context';
import { findNote } from '../notes-helpers';
import ReactDom from 'react-router-dom';
import './NotePageMain.css';

class NotePageMain extends React.Component {
  static contextType = Context;

  delButton = noteId =>{
    fetch(`http://localhost:9090/notes/${noteId}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json'
      }
    }).then(res => {
      let temp = this.context.notes.filter(item => item.id !== noteId);
      this.props.history.push('/');
      this.context.updateState(temp);
    });
  }

  render() {
    const { notes } = this.context;
    const { noteId } = this.props.match.params;
    const note = findNote(notes, noteId);
    if (note !== undefined){
      return (
        <Context.Provider
        value={{ notes: this.context.notes, folders: this.context.folders, delButton: this.delButton }}
      >
        <section className="NotePageMain">
          <Note id={note.id} name={note.name} modified={note.modified} />
          <div className="NotePageMain__content">
            {note.content.split(/\n \r|\n/).map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
        </section>
      </Context.Provider>
      );
    } else {
      return '';
    }
  }
}

NotePageMain.defaultProps = {
  note: {
    content: ''
  }
};

export default NotePageMain;
