// rfc
import { fireEvent } from '@testing-library/react';
import React, { useState } from 'react'
import ItemTask from './ItemTask'

export default function TableTask(props) {
    let { tasks, onUpdateStatusTask, onDeleteTask, onUpdateTask, onFilterTasks } = props;
    const [fieldFilter, setFieldFilter] = useState({
        name: '',
        status: -1
    })

    // 8. FILTER:
    const onChangeFilter = (event) => {
        let {name, value, type, checked} = event.target;
                    // console.log(type);
                    // console.log(name);
                    // console.log(value);

        let newFieldFilter = {...fieldFilter};
        newFieldFilter[name] = (type === 'select-one' ? parseInt(value) : value);
        setFieldFilter(newFieldFilter);

        onFilterTasks(newFieldFilter);
    }

    // 
    const showListItem = () => {
        return tasks.map((item, index) => {
            let { id, name, status } = item;
            return <ItemTask
                key={index}
                index={index}
                id={id}
                name={name}
                status={status}
                onUpdateStatusTask={onUpdateStatusTask}
                onUpdateTask={onUpdateTask}
                onDeleteTask={onDeleteTask}
            />
        })
    }

    // RENDER
    return (
        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
            <table className="table table-bordered table-hover">
                <thead>
                    <tr>
                        <th className="text-center">STT</th>
                        <th className="text-center">Tên</th>
                        <th className="text-center">Trạng Thái</th>
                        <th className="text-center">Hành Động</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td />
                        <td>
                            {/* TYPE, NAME, VALUE, CHECKED, ONCHANGE */}
                            <input type="text" name='name' value={fieldFilter.name} onChange={onChangeFilter} className="form-control" />
                        </td>
                        <td>
                            <select name='status' value={fieldFilter.status} onChange={onChangeFilter} className="form-control">
                                <option value={-1}>Tất Cả</option>
                                <option value={0}>Ẩn</option>
                                <option value={1}>Kích Hoạt</option>
                            </select>
                        </td>
                        <td />
                    </tr>
                    {/* TASK ITEM */}
                    {showListItem()}
                    {/* <ItemTask />
                    <ItemTask />
                    <ItemTask />
                    <ItemTask /> */}
                    {/* HẾT - TASK ITEM */}
                </tbody>
            </table>
        </div>
    )
}
