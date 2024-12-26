// rfc
import React, { useState } from 'react'

export default function ButtonSort(props) {
    let {onSort} = props;
    const [fieldSort, setfieldSort] = useState({
        by: 'name',
        type: 1,
    })

    // 
    const handleSort = (by, type) => {
        let newFieldSort = {
            by: by,
            type: type,
        };
        
        setfieldSort(newFieldSort);
        onSort(by, type);
    }

    // RENDER
    return (
        <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
            <div className="dropdown">
                <button className="btn btn-primary dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                    Sắp Xếp <span className="fa fa-caret-square-o-down ml-5" />
                </button>
                <ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
                    <li 
                        className={(fieldSort.by === 'name' && fieldSort.type === 1) ? "liActive" : ""}
                        onClick={() => {handleSort('name', 1)}}
                    >
                        <a role="button">
                            <span className="fa fa-sort-alpha-asc pr-5">
                                Tên A-Z
                            </span>
                        </a>
                    </li>
                    <li 
                        className={(fieldSort.by === 'name' && fieldSort.type === -1) ? "liActive" : ""}
                        onClick={() => {handleSort('name', -1)}}
                    >
                        <a role="button">
                            <span className="fa fa-sort-alpha-desc pr-5">
                                Tên Z-A
                            </span>
                        </a>
                    </li>
                    <li role="separator" className="divider" />
                    <li 
                        className={(fieldSort.by === 'status' && fieldSort.type === 1) ? "liActive" : ""}
                        onClick={() => {handleSort('status', 1)}}
                    >
                        <a role="button">Trạng Thái Kích Hoạt</a>
                    </li>
                    <li 
                        className={(fieldSort.by === 'status' && fieldSort.type === -1) ? "liActive" : ""}
                        onClick={() => {handleSort('status', -1)}}
                    >
                        <a role="button">Trạng Thái Ẩn</a>
                    </li>
                </ul>
            </div>
        </div>
    )
}
