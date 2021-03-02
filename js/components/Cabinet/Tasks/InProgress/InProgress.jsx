import React from 'react'
import { NavLink } from 'react-router-dom'

import '../../../../../../public/ui/components/task.css';

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

export default function InProgress(props) {
    return (
        <div>
            {props.tasks.map((i) =>
                <div key={i.id} className="task" style={styles.task}>
                    <div>
                    <small className="price">${i.budget}</small>
                    </div>
                    <small className="type"><i className="flaticon-microphone-1"></i> {i.project.type}</small>
                    <small className="language">{i.language.name}</small>
                    <small className="length"> {i.project.minutes_per_tasks}min</small>
                    <span>
                        <small className="deadline">{i.complete_deadline} </small>
                    </span>
                    <div className="buttons">
                    <NavLink style={styles.a} to={`/cabinet/tasks/in_progress${i.id}`} className="delivered"><i
                                className="flaticon-add"></i> Start</NavLink>
                    </div>
                </div>
            )}
        </div>
    )
}
