// rfc
import React, { useState } from 'react'

export default function ButtonSearch(props) {
    let { onSearch } = props;
    const [searchKey, setSearchKey] = useState('');

    const onChangeSaveSearchKey = (event) => {
        let { name, value, type, checked } = event.target;
        // console.log(value);
        setSearchKey(value);
    }
    // 
    const onClickSearch = () => {
        onSearch(searchKey);
    }

    // RENDER
    return (
        <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
            <div className="input-group">
                {/* NAME, VALUE, TYPE, CHECKED, ONCHANGE */}
                <input type="text" name='searchKey' value={searchKey} onChange={onChangeSaveSearchKey} className="form-control" placeholder="Nhập từ khóa..." />
                <span className="input-group-btn">
                    <button
                        onClick={onClickSearch}
                        className="btn btn-primary" type="button"
                    >
                        <span className="fa fa-search mr-5" />Tìm
                    </button>
                </span>
            </div>
        </div>
    )
}
