import React from 'react';
import Note from '../Note/Note';
import Context from '../Context';
import { findNote } from '../notes-helpers';
import './NotePageMain.css';

class NotePageMain extends React.Component {
  static contextType = Context;
  render() {
    const { notes } = this.context;
    const { noteId } = this.props.match.params;
    const note = findNote(notes, noteId);
    return (
      <section className="NotePageMain">
        <Note id={note.id} name={note.name} modified={note.modified} />
        <div className="NotePageMain__content">
          {note.content.split(/\n \r|\n/).map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
      </section>
    );
  }
}

NotePageMain.defaultProps = {
  note: {
    content: ''
  }
};

export default NotePageMain;
