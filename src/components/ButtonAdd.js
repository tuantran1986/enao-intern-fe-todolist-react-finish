// rfc
import React from 'react'

export default function ButtonAdd(props) {
    let { toggleFormAddEdit } = props;

    // 
    return (
        <button onClick={toggleFormAddEdit} type="button" className="btn btn-primary">
            <span className="fa fa-plus mr-5" />Thêm Công Việc
        </button>
    )
}
