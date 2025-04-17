import React,{useState,useEffect} from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { FaFileExcel, FaFilePdf, FaInfoCircle, FaRegFilePdf } from 'react-icons/fa';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import SendIcon from '@mui/icons-material/Send';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import {
  GridRowModes,
  DataGrid,
  GridToolbarContainer,
  GridActionsCellItem,
  GridRowEditStopReasons,
} from '@mui/x-data-grid';
import {
  randomCreatedDate,
  randomTraderName,
  randomId,
  randomArrayItem,
} from '@mui/x-data-grid-generator';
import { v4 as uuidv4 } from 'uuid'; // Import UUID library
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import CustomButton from '../../components/CustomButton';




const roles = ['Market', 'Finance', 'Development'];
const randomRole = () => {
  return randomArrayItem(roles);
};




function EditToolbar(props) {
  const { setRows, setRowModesModel, newRecord } = props;

  const handleClick = () => {
    // Generate a new UUID
    const newId = uuidv4();

    // Create a new record with the generated UUID
    const newRecordWithId = {
      ...newRecord[0],
      id: newId,
    };

    setRows((oldRows) => [...oldRows, newRecordWithId]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [newId]: { mode: GridRowModes.Edit, fieldToFocus: 'name' },
    }));
  };

  return (
    <GridToolbarContainer>
      <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
        Add record
      </Button>
    </GridToolbarContainer>
  );
}





 function CustomEditableTable({tableHeading,tableRows,newRecord}) {
  const [rows, setRows] = useState(tableRows);

  const [rowModesModel, setRowModesModel] = useState({});

  const columns = [...tableHeading];




  // Use useEffect to update rows when tableRows changes
  useEffect(() => {
    setRows(tableRows);
  }, [tableRows]);
  
  const handleFileChange = (id) => (event) => {
    const file = event.target.files[0];
    const updatedRows = rows.map((row) => {
      if (row.id === id) {
        return { ...row, file };
      }
      return row;
    });
    setRows(updatedRows);
  };

  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id) => () => {
    setRows(rows.filter((row) => row.id !== id));
  };

  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  const processRowUpdate = (newRow) => {
    const updatedRow = { ...newRow, isNew: false };
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };


  // Check if tableHeading is not empty
  if (tableHeading !== '') {
    const fileColumn = 
    {
      field: 'file',
      headerName: 'File',
      width: 200,
      renderCell: (params) => (
        <input
          type="file"
          accept=".pdf"
          onChange={handleFileChange(params.row.id)}
        />
      ),
    };
    // Create an "Actions" column and push it to the columns array
    const actionsColumn = {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 100,
      cellClassName: 'actions',
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;
        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              sx={{
                color: 'primary.main',
              }}
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }
        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    };

    //columns.push(fileColumn);
    columns.push(actionsColumn);
  }



  //const columns = tableHeading;




  return (
    <>
     
    <Box
      sx={{
        height: 400,
        margin:'0px auto',
        width: '100%',
        '& .actions': {
          color: 'text.secondary',
        },
        '& .textPrimary': {
          color: 'text.primary',
        }
      }}
    >
      <DataGrid
        rows={rows}
        columns={columns}
        editMode="row"
        rowModesModel={rowModesModel}
        onRowModesModelChange={handleRowModesModelChange}
        onRowEditStop={handleRowEditStop}
        processRowUpdate={processRowUpdate}
        slots={{
          toolbar: EditToolbar,
        }}
        slotProps={{
          toolbar: { setRows, setRowModesModel,newRecord },
        }}
      />
    </Box>
    <div style={{width:"40%", margin:'0px auto',marginTop:'20px'}}><CustomButton text="Submit" endIcon={<SendIcon/>} onClick={()=>{////////console.log(rows);}} /></div>
    </>
  );
}

const styles = {
  container:{
      width:'90%',
      margin:'0px auto',
      marginBottom:'40px'
  }
}

export default CustomEditableTable;