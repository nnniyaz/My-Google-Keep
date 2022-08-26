import AddAlertOutlinedIcon from '@mui/icons-material/AddAlertOutlined';
import PersonAddOutlinedIcon from '@mui/icons-material/PersonAddOutlined';
import ColorLensOutlinedIcon from '@mui/icons-material/ColorLensOutlined';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import ArchiveOutlinedIcon from '@mui/icons-material/ArchiveOutlined';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import { useState } from 'react';
import { TextareaAutosize } from '@mui/material';

interface NoteCard {
    data: {
        id: number
        title: string
        body: string
    }
    updateNote: any
}

const Note = ({ data, updateNote }: NoteCard) => {

    const [expandNote, setExpandNote] = useState(false);
    const [note, setNote] = useState({ title: data.title, body: data.body })

    const handleBlur = (e: any) => {
        const target = e.relatedTarget;
        const parent = e.currentTarget;
        if (!parent.contains(parent)) {
            setExpandNote(false)
        }
        if (!parent.contains(target)) {
            setExpandNote(false)
        }
    }

    const editNote = () => {
        const updatedNote = { title: note.title, body: note.body };
        updateNote(updatedNote);
        setExpandNote(false);
    }

    return (
        <div
            className='card'
            tabIndex={0}
            onFocus={() => setExpandNote(true)}
            onBlur={(e) => handleBlur}
        >
            {
                expandNote
                    ?
                    <form>
                        <input
                            value={note.title}
                            onChange={e => setNote({ ...note, title: e.currentTarget.value })}
                            className='input'
                            type="text"
                            placeholder='Title'
                            style={{
                                fontSize: '18px'
                            }}
                        />

                        <TextareaAutosize
                            value={note.body}
                            onChange={e => setNote({ ...note, body: e.currentTarget.value })}
                            aria-label="empty textarea"
                            placeholder="Take a note..."
                            className='textfield'
                        />
                    </form>
                    :
                    <>
                        <div className='title' > {note.title}</div >
                        <div className='text'>{note.body}</div>
                    </>
            }

            <div className='bottom'>
                <div
                    className='options'
                    style={{
                        opacity: expandNote ? '1' : ''
                    }}
                >
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

                {
                    expandNote
                        ?
                        <button onClick={editNote} className='btn'>
                            Close
                        </button>
                        :
                        ''
                }
            </div>
        </div >
    );
}

export default Note;