// rfc
import React from 'react'

export default function ItemTask(props) {
    let { index, id, name, status, onUpdateStatusTask, onDeleteTask, onUpdateTask } = props;

    // RENDER
    return (
        <tr>
            <td>{index + 1}</td>
            <td>{name}</td>
            <td className="text-center">
                <span
                    className={status === true ? "label label-success" : "label label-danger"}
                    onClick={() => { onUpdateStatusTask(id) }}
                >
                    {status === true ? "Kích Hoạt" : "Ẩn"}
                </span>
            </td>
            <td className="text-center">
                <button 
                    type="button" className="btn btn-warning"
                    onClick={() => { onUpdateTask(id) }}
                >
                    <span className="fa fa-pencil mr-5" />Sửa
                </button>
                &nbsp;
                <button
                    type="button" className="btn btn-danger"
                    onClick={() => { onDeleteTask(id) }}
                >
                    <span className="fa fa-trash mr-5" />Xóa
                </button>
            </td>
        </tr>
    )
}
