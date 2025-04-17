import React, { useState } from 'react';
import { Controller } from 'react-hook-form';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { AttachFileSharp, Delete } from '@mui/icons-material';
import DescriptionIcon from '@mui/icons-material/Description';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import ImageIcon from '@mui/icons-material/Image';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import TableChartIcon from '@mui/icons-material/TableChart';

const fileIconMapping = {
  'application/pdf': <PictureAsPdfIcon />,
  'image/jpeg': <ImageIcon />,
  'image/png': <ImageIcon />,
  'image/gif': <ImageIcon />,
  'image/bmp': <ImageIcon />,
  'image/svg+xml': <ImageIcon />,
  'image/webp': <ImageIcon />,
  'text/plain': <DescriptionIcon />,
  'application/msword': <DescriptionIcon />,
  'application/vnd.ms-excel': <TableChartIcon />,
  'application/vnd.ms-powerpoint': <DescriptionIcon />,
  'application/vnd.openxmlformats-officedocument.presentationml.presentation': <DescriptionIcon />,
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': <TableChartIcon />,
  'text/csv': <TableChartIcon />
};

function getFileIcon(mimeType) {
  return fileIconMapping[mimeType] || <InsertDriveFileIcon />;
}

function CustomUploadButton({ name, rules = {}, control, text, setValue }) {
  const [selectedFiles, setSelectedFiles] = useState([]);

  const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
  });

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const updatedFiles = [...selectedFiles, ...files];
    setSelectedFiles(updatedFiles);
    setValue(name, updatedFiles, { shouldValidate: true });
    e.target.value = ''; // Clear the file input value to prevent the error
  };

  const handleFileDelete = (fileIndex) => {
    const newFiles = selectedFiles.filter((_, index) => index !== fileIndex);
    setSelectedFiles(newFiles);
    setValue(name, [newFiles], { shouldValidate: true });
  };

  return (
    <>
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field, fieldState: { error } }) => (
          <div style={{ border: '1px solid #D1D1D1', borderRadius: '5px', padding: '10px' }}>
            <h4 style={{ fontWeight: 'normal' }}>{text}:</h4>
            {/* <h5>(.txt, .pdf, .jpeg, .gif, .bmp, .jpg, .png, .webp)            </h5> */}
            <h5>Image or pdf files</h5>
            <span
              style={{
                color: 'red',
                display: 'block',
                maxHeight: '28px',
                fontWeight: 'bold',
                fontSize: '14px',
              }}
            >
              {error ? error.message : ''}
            </span>
            <Button
              component="label"
              variant="contained"
              disableElevation
              startIcon={<AttachFileSharp />}
            >
              Choose files
              <input
                multiple
                accept="
                  text/plain, 
                  application/pdf, 
                  image/*,
                  image/jpeg,
                  image/gif,
                  image/bmp,
                  text/plain,
                  image/webp"
                type="file"
                onChange={(e) => {
                  //handleFileChange(e);
                  const files = Array.from(e.target.files);
                  
                  const updatedFiles = [...selectedFiles, ...files];
                  setSelectedFiles(updatedFiles);
                  //setValue(name, updatedFiles, { shouldValidate: true });
                  //e.target.value = ''; // Clear the file input value to prevent the error

                  field.onChange([updatedFiles]);
                }}
                style={{ display: 'none' }}
              />
            </Button>
            <div style={{ marginTop: '10px', backgroundColor: '#F2F3F4', padding: '7px', overflowY: 'scroll', maxHeight: '15vh' }}>
              {selectedFiles.length > 0 ? (
                selectedFiles.map((file, index) => (
                  <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
                    <span style={{ marginRight: '10px' }}>{getFileIcon(file.type)}</span>
                    <span>{file.name}</span>
                    <Button
                      color="error"
                      size="small"
                      onClick={() => handleFileDelete(index)}
                      startIcon={<Delete />}
                      style={{ marginLeft: '5px' }}
                    >
                    </Button>
                  </div>
                ))
              ) : (
                'No files chosen'
              )}
            </div>
          </div>
        )}
      />
    </>
  );
}

export default CustomUploadButton;
