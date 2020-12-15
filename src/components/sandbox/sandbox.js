import React from 'react'
import { useState } from 'react'

import { Editor } from 'react-draft-wysiwyg'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import { EditorState, convertToRaw } from 'draft-js'
import draftToHtml from 'draftjs-to-html'

import './sandbox.scss'


const Test = (props) => {
  return props.content
}

const ChildComponent = (props) => {
  console.log(props.content)
  return (
    // <iframe className="preview-frame" srcDoc={props.content}></iframe>
    <section><Test content={props.content} /></section>
  )
}

const Sandbox = () => {
  const [ editorState, setEditorState ] = useState(EditorState.createEmpty())

  const onEditorStateChange = (e) => {
    // console.log(e);
    setEditorState(e)
    // console.log(draftToHtml(convertToRaw(editorState.getCurrentContent())))
  }

  return (
    <div className="content-container test">
      <Editor editorClassName='editor'
        editorState={editorState}
        wrapperClassName='editor-wrapper'
        onEditorStateChange={onEditorStateChange} />

      <ChildComponent content={draftToHtml(convertToRaw(editorState.getCurrentContent()))} />
    </div>
  )
}

export default Sandbox
