import React from 'react'
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import "@cyntler/react-doc-viewer/dist/index.css";
import { Close } from '@mui/icons-material';

function CustomFileViewer({onClose,imgData}) {
    // const docs = [
    //     { uri: require("../../assets/img/login_bg/loginBgHill.jpg") }, // Remote file
    //     { uri: "http://localhost/todo-app/assets/images/client_attachment/1718463919_666dadaf02ee0_TA.jpg" }
    //     //{ uri: require("./example-files/pdf.pdf") }, // Local File
    //   ];
    const docs = [];
    ////////console.log(imgData);

    imgData.attachment.forEach(element => {
      ////////console.log(element);
      docs.push({ uri: process.env.REACT_APP_CLIENT_ATTACHMENT +element.new_name });
    });

  return (
    <div style={{position:'absolute',zIndex:5000,top:0,left:0,right:0,bottom:0,backgroundColor:'rgba(0,0,0,0.5)'}}>

      <div style={{position:'relative',width:'100%',height:'100vh'}}>     
      <div onClick={()=>onClose(true)}>
        <span style={{cursor:'pointer',display:'flex',float:'right',marginRight:'30px',marginTop:'30px',color:'white',backgroundColor:'#000',borderRadius:'50%',width:'40px',height:'40px',justifyContent:'center',alignItems:'center'}}><Close/> </span>
      </div>
        <div style={{width:'85%',position:'absolute',top:'50%',left:0,right:0,transform:'translateY(-50%)',height:'90vh',margin:'0px auto',overflow:'scroll',backgroundColor:'#fff'}}>
        <h3 style={{margin:'0px auto',width:'90%',paddingTop:'20px'}}>#CT{imgData.id}</h3>
          {
            docs.length > 0 ? 
            <DocViewer
            documents={docs}
            initialActiveDocument={docs[0]}
            pluginRenderers={DocViewerRenderers}
            config={{
                header: {
                  disableFileName: true,
                },
            }}
            style={{ height: 600,overflow:'scroll' }}
            onError={(error) => console.error('Error loading document:', error)}
          />
          : null
          }
          <div 
          style={{width:'100%',backgroundColor:'rgba(0,0,0,1)',height:'100px',color:'white',overflow:'scroll'}}>
            <div style={{width:'90%',margin:'0px auto'}}>
            <span style={{marginTop:'10px',display:'block'}}>Description: <div  dangerouslySetInnerHTML={{ __html: imgData.description || '<p></p>'}}></div></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CustomFileViewer