// rfc
import React, { useEffect, useState } from 'react'
import TableTask from './TableTask'

const initTask = {
    id: null,
    name: '',
    status: true,
}

export default function FormAddOrEdit(props) {
    // 
    let { onAddOrEditTask, closeFormAddEdit, taskEdit } = props;
    // 
    const [task, setTask] = useState(initTask);

    // KHI CÓ - TASKEDIT - thì phun DATA lên giao diện
    useEffect(() => {
      setTask(taskEdit);
    }, [taskEdit])
    

    // 
    const onChangeSaveTask = (event) => {
        let { type, name, value, checked } = event.target;

        let newTask = { ...task };
        // CHÚ Ý - SELECT trả lên STRING - phải chuyển sang BOOLEAN
        if (type === 'select-one') {
            newTask[name] = (value === 'true' ? true : false);
        } else {
            newTask[name] = value;
        }
        
        setTask(newTask);

    }

    // 
    const onSubmit = (event) => {
        event.preventDefault();
        onAddOrEditTask(task);
        setTask(initTask);
    }
    const onReset = (event) => {
        event.preventDefault();
        setTask(initTask);
    }


    // 
    return (
        <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
            <div className="panel panel-warning">
                <div className="panel-heading ">
                    <h3 className="panel-title">{task.id === null ? "Thêm Công Việc" : "Sửa Công Việc"}</h3>
                    <i onClick={closeFormAddEdit} className='fa fa-close' style={{float: 'right', marginTop: '-15px' }}></i>
                </div>
                <div className="panel-body ">
                    <form>
                        <div className="form-group">
                            <label>Tên :</label>
                            {/* FORM: NAME, VALUE, TYPE, CHECKED, ONCHANGE */}
                            <input type="text" name='name' value={task.name} onChange={onChangeSaveTask} className="form-control" />
                        </div>
                        <label>Trạng Thái :</label>
                        {/* FORM: NAME, VALUE, TYPE, CHECKED, ONCHANGE */}
                        <select name='status' value={task.status} onChange={onChangeSaveTask} className="form-control" required="required">
                            <option value={true}>Kích Hoạt</option>
                            <option value={false}>Ẩn</option>
                        </select>
                        <br />
                        <div className="text-center">
                            <button onClick={onSubmit} type="submit" className="btn btn-warning">{task.id === null ? "Thêm" : "Sửa"}</button>&nbsp;
                            <button onClick={onReset} type="reset" className="btn btn-danger">Hủy Bỏ</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
