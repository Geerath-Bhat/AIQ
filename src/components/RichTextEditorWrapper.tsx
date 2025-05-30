import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import Quill styles
import './RichTextEditorWrapper.css'; // Custom styles for the editor

interface RichTextEditorWrapperProps {
  initialValue?: string;
  onChange: (value: string) => void;
  placeholder?: string;
  readOnly?: boolean;
  className?: string;
}

const RichTextEditorWrapper: React.FC<RichTextEditorWrapperProps> = ({
  initialValue = '',
  onChange,
  placeholder = 'Enter your observations here...',
  readOnly = false,
  className = '',
}) => {
  const [editorHtml, setEditorHtml] = useState<string>(initialValue);

  useEffect(() => {
    setEditorHtml(initialValue);
  }, [initialValue]);

  const handleChange = (html: string) => {
    setEditorHtml(html);
    onChange(html);
    console.log('RichTextEditorWrapper: Content changed');
  };

  console.log('Rendering RichTextEditorWrapper');

  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{'list': 'ordered'}, {'list': 'bullet'}],
      [{ 'color': [] }, { 'background': [] }],
      ['link'],
      ['clean']
    ],
  };

  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike',
    'list', 'bullet',
    'color', 'background',
    'link'
  ];

  return (
    <div className={`rich-text-editor-container ${className}`}>
      <ReactQuill
        theme="snow"
        value={editorHtml}
        onChange={handleChange}
        modules={modules}
        formats={formats}
        placeholder={placeholder}
        readOnly={readOnly}
        className="bg-white dark:bg-gray-800 rounded-md shadow-sm"
      />
    </div>
  );
};

export default RichTextEditorWrapper;