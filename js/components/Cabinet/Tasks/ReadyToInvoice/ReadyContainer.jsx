import React, { Component } from "react";
import '../../../../../../public/ui/components/task.css';
import '../Tabs.css'
import { getReadytoInvoiceTasks } from "../../../../api/api";
import ReadyToInvoiceList from "./ReadyToInvoiceList";
import TasksButtons from '../TasksButtons';
import '../../../../../../public/css/components/block.css'

export default class ReadyContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAllSelected: false,
      tasks: [

      ]
    };
  }
  componentDidMount() {
    getReadytoInvoiceTasks()
      .then(res => {
        this.setState({
          tasks: res.data.data
        })
      })
      .catch(err => alert(err));
  }

  onCheckBoxChange(checkName, isChecked) {
    let isAllChecked = checkName === "all" && isChecked;
    let isAllUnChecked = checkName === "all" && !isChecked;
    const checked = isChecked;

    const tasks = this.state.tasks.map((c, index) => {
      if (isAllChecked || c.value === checkName) {
        return Object.assign({}, c, {
          checked
        });
      } else if (isAllUnChecked) {
        return Object.assign({}, c, {
          checked: false
        });
      }

      return c;
    });

    let isAllSelected =
      tasks.findIndex(item => item.checked === false) === -1 ||
      isAllChecked;

    this.setState({
      tasks,
      isAllSelected
    });
  }

  render() {
    return (
      <>
        <TasksButtons />
        <div className="block" >
          <div className="block-content" >
            <ReadyToInvoiceList
              tasks={this.state.tasks}
              isCheckedAll={this.state.isAllSelected}
              onCheck={this.onCheckBoxChange.bind(this)}
            />
          </div>
        </div>
      </>
    );
  }
}
