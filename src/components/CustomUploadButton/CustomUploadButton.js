import React, { useState } from 'react';
import { Controller } from 'react-hook-form';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { AttachFileSharp } from '@mui/icons-material';

/*
application/msword, 
application/vnd.ms-excel, 
application/vnd.ms-powerpoint,
application/vnd.openxmlformats-officedocument.presentationml.presentation,
text/plain, 
application/pdf, 
image/*,
application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,
image/jpeg,
image/gif,
application/msword,
text/csv,
image/bmp,
image/svg+xml,
text/plain,
image/webp
*/

function CustomUploadButton({ name, rules = {}, control, text, setValue }) {
  const [selectedFile, setSelectedFile] = useState(null);

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
    const file = e.target.files[0];
    ////////console.log(file);
    setSelectedFile(file);
    // Set the selected file in the parent component using setValue
    setValue(name, file);

    // Clear the file input value to prevent the error
    e.target.value = ''; // This line clears the input value
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
              Choose file
              <input
              {...field}
              accept="application/msword, 
application/vnd.ms-excel, 
application/vnd.ms-powerpoint,
application/vnd.openxmlformats-officedocument.presentationml.presentation,
text/plain, 
application/pdf, 
image/*,
application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,
image/jpeg,
image/gif,
application/msword,
text/csv,
image/bmp,
image/svg+xml,
text/plain,
image/webp"
                type="file"
                value={undefined}
                onChange={(e) => {
                  const file = e.target.files[0];
                  setSelectedFile(file);
                  // Update the field value with the selected file
                  field.onChange([file]);
                }}
                style={{ display: 'none' }}
              />
            </Button>
            <span style={{ marginLeft: '10px', backgroundColor: '#F2F3F4', padding: '7px' }}>
              {selectedFile ? selectedFile.name : 'No file chosen'}
            </span>
          </div>
        )}
      />
    </>
  );
}

export default CustomUploadButton;
