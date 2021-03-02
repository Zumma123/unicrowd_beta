import React from 'react';
import CheckBox from './CheckBox';
import * as axios from 'axios'
import { NavLink } from 'react-router-dom';

export default function CheckBoxList({ tasks, isCheckedAll, onCheck }) {
    const SendTasks = () => {
        axios.post(`/cabinet/generate-invoice/`, { tasks })
    }

    const checkBoxOptions = tasks.map((r, index) =>
        <div key={index} >
            {r.checked == true
                ? <div className="task" style={{ width: '100%', background: 'gainsboro', marginTop: '25px' }}>
                    <div>
                    <small className="price">${r.budget}</small>
                    </div>
                    <small className="type"><i className="flaticon-microphone-1"></i> {r.project.type}</small>
                    <small className="language">{r.language.name}</small>
                    <small className="length"> {r.project.minutes_per_tasks}min</small>
                    <span>
                        <small className="deadline">{r.complete_deadline} </small>
                    </span>
                </div>
                : <div className="task" style={{ width: '100%', marginTop: '25px' }}>
                   <div>
                    <small className="price">${r.budget}</small>
                    </div>
                    <small className="type"><i className="flaticon-microphone-1"></i> {r.project.type}</small>
                    <small className="language">{r.language.name}</small>
                    <small className="length"> {r.project.minutes_per_tasks}min</small>
                    <span>
                        <small className="deadline">{r.complete_deadline} </small>
                    </span>
                </div>}
        </div>
    )

    const checked = isCheckedAll === true ? <a href="/cabinet/invoices" style={{ borderRadius: 15, padding: '10px 20px', alignItems: 'center', background: '#E22A7F', color: 'white' }} variant="contained" color="secondary" onClick={() => SendTasks()}>Send</a>
        : <NavLink  to="/cabinet/tasks/invoices" disabled style={{ borderRadius: 15, padding: '10px 20px', alignItems: 'center', background: 'gray', color: 'white' }} variant="contained" color="secondary" onClick={() => SendTasks()}>Send</NavLink>


    return (
        <div className="checkbox-list">

            <div>
                <CheckBox
                    name="select-all"
                    value="Check all"
                    tick={isCheckedAll}
                    onCheck={(e) => onCheck('all', e.target.checked)}
                />
            </div>
            {checked}
            {checkBoxOptions}
        </div>
    );
}
