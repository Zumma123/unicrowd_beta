import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import {
    SetUserTC,
    SetInProgressTasksTC,
    SetReadyToInvoiceTasksTC,
    SetInvoicesTC,
    SetButtonStatusTC,
    SetLanguagesTC,
    SetCountriesTC,
    Echo
} from '../../redux/cabinet-reducer'
import { Route } from "react-router-dom";

//COMPONENTS
import SideBar from "./SideBar/SideBar";
import Invoices from "./Invoices/Invoices";
import InProgressContainer from './Tasks/InProgress/InProgressContainer'
import ReadyContainer from './Tasks/ReadyToInvoice/ReadyContainer'
import NewContainer from "./Tasks/New/NewContainer";
import ReactHookForm from './Profile/ReactHookForm/ReactHookForm'
import RecorderContainer from './RecordBETA/RecorderContainer'
import DeliveredContainer from './Tasks/Delivered/DeliveredContainer';
import { getUser } from '../../api/api';
//COMPONENTS

class CabinetContainer extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            secondLanguage: '',
            secondCountry: '',
            secondDialect: '',
        }
    }


    componentDidMount() {
        getUser().then(res => {

            this.setState({
                secondLanguage: res.data.data.languages.name,
                secondCountry: res.data.data.languages.pivot.dialect,
                secondDialect: res.data.data.languages.pivot.level,
            })

        })
        this.props.SetUserTC()
        this.props.SetInProgressTasksTC()
        this.props.SetReadyToInvoiceTasksTC()
        this.props.SetInvoicesTC()
        this.props.SetButtonStatusTC()
        this.props.SetLanguagesTC()
        this.props.SetCountriesTC()
        this.props.Echo()
    }
    render() {
        console.log(this.state.secondLanguage)
        console.log(this.state.secondCountry)
        console.log(this.state.secondDialect)
        return (
            <>
                <SideBar user={this.props.user} status={this.props.status} />
                <div className='col'>
                    <Route path='/cabinet/information' render={() => <ReactHookForm
                        secondLanguage={this.state.secondLanguage}
                        secondCountry={this.state.secondCountry}
                        secondDialect={this.state.secondDialect}
                        user={this.props.user}
                        languages={this.props.languages}
                        countries={this.props.countries} />} />
                    <Route path='/cabinet/invoices' render={() => <Invoices invoices={this.props.invoices} />} />
                    <Route path={`/cabinet/tasks/new`} render={() => <NewContainer user={this.props.user} status={this.props.status} />} />
                    <Route path='/cabinet/tasks/in_progress' render={() => <InProgressContainer inProgress={this.props.inProgress} />} />
                    <Route path='/cabinet/tasks/delivered' render={() => <DeliveredContainer />} />
                    <Route path='/cabinet/tasks/ready_to_invoice' render={() => <ReadyContainer readyToInvoice={this.props.readyToInvoice} />} />
                    <div>
                        {this.props.inProgress.map((t, idx) =>
                            <Route key={idx} exact path={`/cabinet/tasks/in_progress${t.id}`} render={() =>
                                <RecorderContainer
                                    user={this.props.user}
                                    desc={t.desc}
                                    title={t.title}
                                    price={t.price}
                                    complete_deadline={t.complete_deadline}
                                    taskId={t.id} />} />
                        )}
                    </div>
                </div>
            </>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        user: state.cabinet.user,
        inProgress: state.cabinet.inProgress,
        readyToInvoice: state.cabinet.readyToInvoice,
        invoices: state.cabinet.invoices,
        status: state.cabinet.status,
        languages: state.cabinet.languages,
        countries: state.cabinet.countries,

    }
}

export default connect(mapStateToProps,
    {
        SetUserTC,
        SetInProgressTasksTC,
        SetReadyToInvoiceTasksTC,
        SetInvoicesTC,
        SetButtonStatusTC,
        SetLanguagesTC,
        SetCountriesTC,
        Echo
    })(CabinetContainer)