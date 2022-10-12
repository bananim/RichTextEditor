



  import React,{ useState, useRef } from "react";
import ReactQuill from "react-quill";
import axios from 'axios';
import "react-quill/dist/quill.snow.css";

// UI components
import Button from "../button/Button";

const modules = {
  toolbar: [
    ["bold", "italic", "underline", "strike"],
    ["blockquote", "code-block"],

    [{ header: 1 }, { header: 2 }],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ script: "sub" }, { script: "super" }],
    [{ indent: "-1" }, { indent: "+1" }],

    [{ color: [] }, { background: [] }],
    [{ font: [] }],
    [{ align: [] }],
    ['link', 'image', 'video'],

    ["clean"],
  ],
};

function Editor() {
  const [value, setValue] = useState("");
  const [saveValueShow,setSaveValueShow] = useState(false);
  const editorRef = useRef();
  const onSubmitEditorHandler = async () => {
    setSaveValueShow(true)
    const responseBody = `<html><body>${value}</body></html>`;
    console.log("check",responseBody);
    await axios.post('http://localhost:8080/api/message/upload',responseBody.toString(),{
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'text/html',
    }});
    console.log("submitted",value);
  };

  if (editorRef.current) console.log(editorRef.current.editor.getContents());

  return (
    <div style={{ display: "flex" }}>
      <ReactQuill
        theme="snow"
        value={value}
        onChange={setValue}
        modules={modules}
        style={{ height: "11in", margin: "1em", flex: "1" }}
        ref={editorRef}
      />

      <ReactQuill
        modules={{ toolbar: null }}
        value={value}
        style={{ margin: "1em", flex: "1" }}
        readOnly={true}
      />

      <Button onClick={onSubmitEditorHandler} type="submit" >Save</Button>
      {saveValueShow && <div>{value}</div>}
    </div>
  );
}

export default Editor;