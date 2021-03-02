import React from 'react'
import { NavLink } from 'react-router-dom'
import '../../../../../../public/ui/components/task.css';
// import Button from '@material-ui/core/Button';
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ReactHtmlParser from 'react-html-parser';
import { Button } from 'antd';


const styles = {
    heading: {
        width: '100%',
        display: 'flex',
        alignItems: 'baseline',
        justifyContent: 'space-between'
    },
    shadow: {
        width: '100%',
        boxShadow: "0px 0px 1px 0px"
    }
}

export default function New(props) {
    const userId = props.user.id
    return (
        <>
            {props.tasks.map((n) =>
                <div key={n.id} className="task" style={{ width: '100%' }}>
                    <Accordion style={styles.shadow}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                        >
                            <div style={styles.heading}>
                                <small className="price">${n.budget}</small>
                                <small className="type"><i className="flaticon-microphone-1"></i> {n.project.type}</small>
                                <small className="language">{n.language.name}</small>
                                <small className="length"> {n.project.minutes_per_tasks}min</small>
                                <small className="deadline">{n.complete_deadline} </small>
                                <div className="buttons">
                                    <Button size="medium" style={{ marginBottom: 10, marginRight: 10 }} onClick={() => props.Decline(n.uuid, userId)}> Decline</Button>
                                    <NavLink style={{ padding: '10px 15px', background: '#E22A7F', color: 'white', fontSize: 16 }}
                                        onClick={() => props.changeStatus(n.id)} to={`/cabinet/tasks/in_progress`}> Accept</NavLink>
                                </div>
                            </div>
                        </AccordionSummary>
                        <AccordionDetails style={styles.heading} >
                            <div>
                                {ReactHtmlParser(n.project.rules)}
                            </div>
                        </AccordionDetails>
                    </Accordion>
                </div>
            )}
        </>
    )
}

