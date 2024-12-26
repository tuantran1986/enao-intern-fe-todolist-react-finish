// rfc
import React from 'react'

export default function ButtonGenerate(props) {
    // 
    let { generateData } = props;

    // RENDER
    return (
        <button type="button" className="btn btn-success" onClick={generateData}>
            <span className="fa fa-plus mr-5" />GENERATE DATA
        </button>
    )
}
