import { AgGridReact, AgGridColumn } from 'ag-grid-react'
import React, { useState } from 'react'
import '../App.css';
function CafeTable() {
    return (<>
        <div className="ag-theme-alpine">
            <AgGridReact></AgGridReact>
        </div>
    </>)
}

export default CafeTable;