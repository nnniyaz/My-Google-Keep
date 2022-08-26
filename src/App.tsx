import './App.scss';
import SideBar from './components/SideBar/SideBar';

import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Note from './components/Note';

import AddAlertOutlinedIcon from '@mui/icons-material/AddAlertOutlined';
import PersonAddOutlinedIcon from '@mui/icons-material/PersonAddOutlined';
import ColorLensOutlinedIcon from '@mui/icons-material/ColorLensOutlined';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import ArchiveOutlinedIcon from '@mui/icons-material/ArchiveOutlined';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import { TextareaAutosize, TextField } from '@mui/material';

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

function App() {
  const [expanded, setExpanded] = React.useState(false);
  const [notes, setNotes] = React.useState([
    { id: 1, title: 'Some note', body: 'Test note' },
    { id: 2, title: 'Any note', body: 'Cool note' },
    { id: 3, title: 'This note', body: 'Good note' },
  ])
  const [note, setNote] = React.useState({
    title: '', body: ''
  })
  const [searchQuery, setSearchQuery] = React.useState('');

  const searchedPosts = React.useMemo(() => {
    return [...notes].filter(note => note.title.toLowerCase().includes(searchQuery) || note.body.toLowerCase().includes(searchQuery))
  }, [searchQuery, notes])

  const handleBlur = (e: any) => {
    const target = e.relatedTarget;
    const parent = e.currentTarget;
    if (!parent.contains(parent)) {
      setExpanded(false)
    }
    if (!parent.contains(target)) {
      setExpanded(false)
    }
  }

  const createNote = (e: any) => {
    e.preventDefault()
    if (note.title === '' && note.body === '') return;
    setNotes([{ ...note, id: Date.now() }, ...notes]);
    setNote({ title: '', body: '' })
  }

  const editNote = (updatedNote: any) => {
    const copiedNotes = [...notes];
    for (let i = 0; i < notes.length; i++) {
      if (updatedNote.id === notes[i].id) {
        copiedNotes[i] = updatedNote;
        setNotes(copiedNotes);
      }
    }
  }


  return (
    <div className="Main">
      <Box sx={{ display: 'flex' }}>
        <SideBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <Box className='container'>
          <DrawerHeader />
          <form
            className='form'
            onBlur={(e) => handleBlur(e)}
          >
            <label
              className={expanded ? 'input-expanded' : 'input-short'}
              onClick={() => setExpanded(true)}
            >
              {
                expanded
                  ?
                  <input
                    value={note.title}
                    onChange={e => { setNote({ ...note, title: e.currentTarget.value }) }}
                    className='input'
                    type="text"
                    placeholder='Title'
                    style={{
                      fontSize: '18px'
                    }}
                  />
                  :
                  ''
              }
              <TextareaAutosize
                value={note.body}
                onChange={e => setNote({ ...note, body: e.currentTarget.value })}
                aria-label="empty textarea"
                placeholder="Take a note..."
                className='textfield'
              />
              {
                expanded
                  ?
                  <div className='bottom'>
                    <div className='options'>
                      <div className='option'>
                        <AddAlertOutlinedIcon className='icon' />
                      </div>
                      <div className='option'>
                        <PersonAddOutlinedIcon className='icon' />
                      </div>
                      <div className='option'>
                        <ColorLensOutlinedIcon className='icon' />
                      </div>
                      <div className='option'>
                        <ImageOutlinedIcon className='icon' />
                      </div>
                      <div className='option'>
                        <ArchiveOutlinedIcon className='icon' />
                      </div>
                      <div className='option'>
                        <MoreVertOutlinedIcon className='icon' />
                      </div>
                    </div>

                    <button className='btn' onClick={createNote}>
                      Close
                    </button>
                  </div>
                  :
                  ''
              }
            </label>
          </form>
          {
            searchedPosts.length
              ?
              searchedPosts.map(note =>
                <Note data={note} updateNote={editNote} key={note.id} />
              )
              :
              <div>No matching results.</div>
          }
        </Box>
      </Box>
    </div >
  );
}

export default App;
