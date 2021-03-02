import React from 'react'
import '../../../../../../public/ui/components/task.css';
import { NavLink } from 'react-router-dom'
import ReactAudioPlayer from 'react-audio-player';
const styles = {
    a: {
        display: 'flex',
        alignItems: 'center',
        background: '#E22A7F',
        color: 'white',
        fontSize: '16px'
    },
    navLink: {
        display: 'flex',
        alignItems: 'center',
        background: '#303094',
        color: 'white',
        fontSize: '16px'
    },
    task: {
        width: '100%'
    }
}


export default function Delivered(props) {
    return (
        <>
            {props.delivered.map((d) =>
                <div key={d.id} className="task" style={{ width: '100%' }}>
                    <small className="price">${d.budget}</small>
                    <small className="type"><i className="flaticon-microphone-1"></i> {d.project.type}</small>
                    <small className="language">{d.language.name}</small>
                    <small className="length"> {d.project.minutes_per_tasks}min</small>
                    <small className="deadline">{d.complete_deadline} </small>
                    <div className="buttons">
                        {d.records !== null ?
                            <div className="d-flex align-items-center">
                                <ReactAudioPlayer style={{marginRight: '10px'}} controls src={d.records !== null ? d.records.path : '/'} />
                                <NavLink
                                    style={{ display: 'flex', alignItems: 'center', background: '#E22A7F', color: 'white', fontSize: '16px' }}
                                    onClick={() => props.SendTasks(d.id, "checked")} to={`/cabinet/tasks/new`}>Send</NavLink>
                            </div> : <NavLink style={styles.a} to={`/cabinet/tasks/in_progress${d.id}`} className="delivered"><i
                                className="flaticon-add"></i> Start</NavLink>}
                    </div>
                </div>
            )}
        </>
    )
}
