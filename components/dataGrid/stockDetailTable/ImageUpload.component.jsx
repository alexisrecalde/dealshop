import React, { useMemo, useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
 
const baseStyle = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '20px',
  borderWidth: 2,
  borderRadius: 2,
  borderColor: '#eeeeee',
  borderStyle: 'dashed',
  backgroundColor: '#fafafa',
  color: '#bdbdbd',
  outline: 'none',
  transition: 'border .24s ease-in-out'
};
 
const activeStyle = {
  borderColor: '#2196f3'
};
 
const acceptStyle = {
  borderColor: '#00e676'
};
 
const rejectStyle = {
  borderColor: '#ff1744'
};
 
const thumbsContainer = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  marginTop: 16
};
 
const thumb = {
  display: 'inline-flex',
  borderRadius: 2,
  border: '1px solid #eaeaea',
  marginBottom: 8,
  marginRight: 8,
  width: 100,
  height: 100,
  padding: 4,
  boxSizing: 'border-box'
};
 
const thumbInner = {
  display: 'flex',
  minWidth: 0,
  overflow: 'hidden'
};
 
const img = {
  display: 'block',
  width: 'auto',
  height: '100%'
};
 
 
const ImageUpload = ({ files, onDrop}) => {
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject
  } = useDropzone({
    accept: 'image/*',
    onDrop: onDrop
  });
 
  const style = useMemo(() => ({
    ...baseStyle,
    ...(isDragActive ? activeStyle : {}),
    ...(isDragAccept ? acceptStyle : {}),
    ...(isDragReject ? rejectStyle : {})
  }), [
    isDragActive,
    isDragAccept,
    isDragReject
  ]);
 
  const thumbs = files.map((file) => (
    <div style={thumb} key={file.name}>
      <div style={thumbInner}>
        <img
          alt={file.name}
          src={file.preview}
          style={img}
        />
      </div>
    </div>
  ));
 
  useEffect(() => () => {
    // Make sure to revoke the data uris to avoid memory leaks
    files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, [files]);
 
  return (
    <div className="container">
      <div {...getRootProps({ style })}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop some files here, or click to select files</p>
      </div>
      <aside style={thumbsContainer}>
        {thumbs}
      </aside>
    </div>
  );
}
 
export default ImageUpload;