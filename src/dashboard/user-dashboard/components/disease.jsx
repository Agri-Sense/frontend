import {useState, useCallback, useMemo} from 'react'
import FileUpload from "../../../forum/components/FileUpload";

import "../styles/disease.css"
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Box from '@mui/material/Box';

import DeleteIcon from '@mui/icons-material/Delete';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';

import axios from 'axios';

const MODEL_SERVER_URL = 'http://localhost:8000';

const Disease = () => {
    const [image, setImage] = useState([]);
    const [analyzing, setAnalyzing] = useState(false);
    const [result, setResult] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);

    const analyzeDisease = async () => {
        if (!image || image.length === 0) {
            toast.error("Please upload an image first");
            return;
        }

        setAnalyzing(true);
        try {
            const file = image[0];
            
            const formData = new FormData();
            formData.append('file', file, file.name);

            const response = await axios.post(`${MODEL_SERVER_URL}/disease/`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                timeout: 30000,
            });

            if (response.data.error) {
                toast.error(response.data.error);
            } else {
                setResult(response.data);
                toast.success(`Disease: ${response.data.disease}`);
            }
        } catch (error) {
            console.error("Error:", error);
            if (error.response) {
                toast.error(`Error: ${error.response.data.error || error.message}`);
            } else {
                toast.error("Failed to analyze image. Please try again.");
            }
        } finally {
            setAnalyzing(false);
        }
    };

    const handleImageChange = (files) => {
        setImage(files);
        if (files && files.length > 0) {
            setPreviewUrl(URL.createObjectURL(files[0]));
        } else {
            setPreviewUrl(null);
        }
        setResult(null);
    };

    const downloadReport = useCallback(
        (id) => () => {
            toast.success("Report downloaded");
    },[]);

    const deleteReport = useCallback(
        (id) => () => {
        toast.success("Order Removed successfully");
        
        setTimeout(() => {
            setRows((prevRows) => prevRows.filter((row) => row.id !== id));
        })
    }, []);


    const localDate = new Date().toLocaleDateString();

    const initialRows = [
        {id: 1, reportId: 1, createdDate: localDate, diseaseDetected: "Fusarium head blight", 
        accuracy: 0.9531, farmName: "Farm 1", plantType: "Annual Vinca",},
        {id: 2, reportId: 2, createdDate: localDate, diseaseDetected: "Seedling blight", 
        accuracy: 0.831, farmName: "Farm 2", plantType: "Balloon Flower"},
        {id: 3, reportId: 3, createdDate: localDate, diseaseDetected: "Tan spot (yellow leaf spot)", 
        accuracy: 0.9123, farmName: "Farm 2", plantType: "Bacopa"},
        {id: 4, reportId: 4, createdDate: localDate, diseaseDetected: "Wheat Streak Mosaic Virus", 
        accuracy: 0.6704, farmName: "Farm 3", plantType: "American Marigold"}
    ];

    const [rows, setRows] = useState(initialRows);
    const columns = useMemo(() => [

        {  
            field: 'reportId',
            headerName: 'Report ID',
            type: "string",
            width: 90,
        },
        {
            field: 'createdDate',
            headerName: 'Created Date',
            width: 120,
        },
        {
            field: 'diseaseDetected',
            headerName: 'Disease Detected',
            type: "string",
            width: 210,
        },
        {
            field: 'accuracy',
            headerName: 'Accuracy',
            type: "number",
            width: 110,
        },
        {
            field: 'farmName',
            headerName: 'Farm Name',
            type: "string",
            width: 150,
        },
        {
            field: 'plantType',
            headerName: 'Plant Type',
            type: 'string',
            width: 150,
        },
        {
            field: 'download',
            headerName: "Download",
            type: 'actions',
            width: 100,
            getActions: (params) => [
              <GridActionsCellItem
                icon={<CloudDownloadIcon />}
                label="Download"
                onClick={downloadReport(params.reportId)}
              />
            ],
          },
        {
            field: 'actions',
            headerName: "Actions",
            type: 'actions',
            width: 100,
            getActions: (params) => [
              <GridActionsCellItem
                icon={<DeleteIcon />}
                label="Delete"
                onClick={deleteReport(params.id)}
              />
            ],
          },
    ], [deleteReport],
    );

    return(
        <>
        <label htmlFor="#" className="content-header">Disease Detection</label>
        <div className="disease-page-wrapper">
            <div className="disease-container">
                <FileUpload image={image} setImage={handleImageChange}/>
                
                {previewUrl && (
                    <div style={{marginTop: '10px', textAlign: 'center'}}>
                        <img src={previewUrl} alt="Preview" style={{maxWidth: '200px', maxHeight: '200px', borderRadius: '8px'}} />
                    </div>
                )}
                
                <button 
                    onClick={analyzeDisease} 
                    disabled={analyzing || !image || image.length === 0}
                    style={{
                        marginTop: '20px',
                        padding: '12px 24px',
                        backgroundColor: analyzing || !image || image.length === 0 ? '#ccc' : '#4CAF50',
                        color: 'white',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: analyzing || !image || image.length === 0 ? 'not-allowed' : 'pointer',
                        fontSize: '16px',
                        fontWeight: 'bold'
                    }}
                >
                    {analyzing ? 'Analyzing...' : 'Detect Disease'}
                </button>
                
                {result && (
                    <div className="disease-result" style={{
                        marginTop: '20px',
                        padding: '20px',
                        backgroundColor: '#e8f5e9',
                        borderRadius: '8px',
                        border: '2px solid #4CAF50'
                    }}>
                        <h3 style={{color: '#2e7d32', marginTop: 0}}>Analysis Result</h3>
                        <p style={{fontSize: '18px'}}><strong>Disease:</strong> {result.disease}</p>
                        <p><strong>Confidence:</strong> {(result.confidence * 100).toFixed(2)}%</p>
                    </div>
                )}
                
                <div className="disease-descritpion-container">
                    Upload a photo of a plant leaf to detect diseases.<br/>
                    The model supports 38 plant disease categories.
                </div>
            </div>
            <label htmlFor="#" className='data-grid-header'>Your past reports</label>
            <div className="past-reports-container">
                <div className="orders-data-grid">
                    <Box sx={{ 
                    height: 316,
                    width: '100%',
                    backgroundColor: "white"
                    }}>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSize={5}
                        rowsPerPageOptions={[5]}
                        checkboxSelection
                        disableSelectionOnClick />
                    </Box>
                </div>
            </div>
        </div>
        <ToastContainer />
        </>
    )
}

export default Disease;
