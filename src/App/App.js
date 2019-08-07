import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import NoteListNav from '../NoteListNav/NoteListNav';
import NotePageNav from '../NotePageNav/NotePageNav';
import NoteListMain from '../NoteListMain/NoteListMain';
import NotePageMain from '../NotePageMain/NotePageMain';
import Context from '../Context';
import './App.css';

class App extends Component {
  state = {
    notes: [],
    folders: []
  };

  delButton = noteId =>{
    fetch(`http://localhost:9090/notes/${noteId}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json'
      }
    }).then(res => {
      let temp = this.state.notes.filter(note => note.id !== noteId)
      this.setState({notes:temp});
    });
  }

  updateState = input => {
    this.setState({notes: input});
  }

  componentDidMount() {
    // fake date loading from API call

    fetch('http://localhost:9090/folders')
    .then(res => res.json())
    .then(res => {
      this.setState({folders:res});
    });
    fetch('http://localhost:9090/notes')
    .then(res => res.json())
    .then(res => {
      this.setState({notes:res});
    });
  }

  renderNavRoutes() {
    return (
      <>
        {['/', '/folder/:folderId'].map(path => (
          <Route
            exact
            key={path}
            path={path}
            render={routeProps => <NoteListNav {...routeProps} />}
          />
        ))}
        <Route
          path="/note/:noteId"
          render={routeProps => {
            return <NotePageNav {...routeProps} />;
          }}
        />
        <Route path="/add-folder" component={NotePageNav} />
        <Route path="/add-note" component={NotePageNav} />
      </>
    );
  }

  renderMainRoutes() {
    return (
      <>
        {['/', '/folder/:folderId'].map(path => (
          <Route
            exact
            key={path}
            path={path}
            render={routeProps => {
              return <NoteListMain {...routeProps} />;
            }}
          />
        ))}
        <Route
          path="/note/:noteId"
          render={routeProps => {
            return <NotePageMain {...routeProps} />;
          }}
        />
      </>
    );
  }

  render() {


    return (
      <Context.Provider
        value={{ notes: this.state.notes, folders: this.state.folders, delButton: this.delButton, updateState: this.updateState }}
      >
        <div className="App">
          <nav className="App__nav">{this.renderNavRoutes()}</nav>
          <header className="App__header">
            <h1>
              <Link to="/">Noteful</Link>{' '}
              <FontAwesomeIcon icon="check-double" />
            </h1>
          </header>
          <main className="App__main">{this.renderMainRoutes()}</main>
        </div>
      </Context.Provider>
    );
  }
}

export default App;
