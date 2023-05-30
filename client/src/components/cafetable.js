import { AgGridReact } from 'ag-grid-react'
import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import '../App.css'
import { Link } from 'react-router-dom'
import { Button } from '@mui/material'


function CafeTable() {
    const gridRef = useRef();
    const [cafeData, setCafeData] = useState(null);
    const [cafeDataLoaded, setCafeDataLoaded] = useState(false);

    useEffect(() => {
        getCafeData();
    }, []);

    const getCafeData = async () => {
        const cafeTableData = await axios.get('http://localhost:8000/cafes');
        if (cafeTableData.data !== null) {
            setCafeData(cafeTableData.data);
            setCafeDataLoaded(true);
        }
    }

    const editBtnRender = ({ value }) => {
        console.log(value);
        return <Button component={Link} to={`/editcafe/${value.props.value}`} variant="contained" color="primary">
            Create Cafe
        </Button>;
    }

    const dataCleanUp = () => {
        let arrCafeData = [];
        if (cafeDataLoaded) {
            cafeData.forEach((v, i) => {
                //change thhis to link to button 
                v.edit = <editBtnRender value={v._id} />;
                v.delete = `<a >Delete</a>`;
                arrCafeData.push(v);
            });
        }

        const removeAttrs = arrCafeData.map(obj => {
            const { _id, __v, ...rest } = obj;
            return rest;
        });

        return removeAttrs;
    }

    const fieldNames = () => {
        // Get the keys from dataCleanUp
        const allKeys = Array.from(new Set(dataCleanUp().flatMap(obj => Object.keys(obj))));
        return allKeys;
    }

    const fieldKeys = () => {
        let arrKeys = [];
        fieldNames().forEach((v, i) => {
            let keyval = { field: v };
            if (v === 'edit') {
                keyval.cellRendererFramework = editBtnRender;
            }
            arrKeys.push(keyval);
        });
        return arrKeys;
    }

    return (<>
        <div className="ag-theme-alpine" style={{ width: '100%', height: 700 }}>
            <AgGridReact ref={gridRef} rowData={dataCleanUp()} columnDefs={fieldKeys()} rowSelection='multiple'>
            </AgGridReact>
        </div>
    </>)
}

export default CafeTable;