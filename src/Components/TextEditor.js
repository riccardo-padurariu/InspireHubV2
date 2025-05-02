import { useState, useEffect, useRef, useMemo } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { ClassicEditor, AutoLink, Autosave, Bold, Essentials, Italic, Link, Paragraph,Underline, Style, Heading } from 'ckeditor5';

import 'ckeditor5/ckeditor5.css';

import '../Styles/TextEditor.css';

const LICENSE_KEY =
	'eyJhbGciOiJFUzI1NiJ9.eyJleHAiOjE3NDczNTM1OTksImp0aSI6IjQ1YzM2ODViLWY3YjctNDA1Ny04ZThkLTNiN2ZhY2QwNzFkNyIsInVzYWdlRW5kcG9pbnQiOiJodHRwczovL3Byb3h5LWV2ZW50LmNrZWRpdG9yLmNvbSIsImRpc3RyaWJ1dGlvbkNoYW5uZWwiOlsiY2xvdWQiLCJkcnVwYWwiLCJzaCJdLCJ3aGl0ZUxhYmVsIjp0cnVlLCJsaWNlbnNlVHlwZSI6InRyaWFsIiwiZmVhdHVyZXMiOlsiKiJdLCJ2YyI6ImI0ZDAyZDczIn0.6-OJlgRQXf9KwVlgoW7cehiiiBTY8sw3iAOp14jr-zyILQevXIOuvDVP-nmLx0EXhXp8yslyjfgSfX-evbyxjA';

export default function TextEditor(props) {
	const editorContainerRef = useRef(null);
	const editorRef = useRef(null);
	const [isLayoutReady, setIsLayoutReady] = useState(false);

	useEffect(() => {
		setIsLayoutReady(true);

		return () => setIsLayoutReady(false);
	}, []);

	const { editorConfig } = useMemo(() => {
		if (!isLayoutReady) {
			return {};
		}

		return {
			editorConfig: {
				toolbar: {
					items: ['bold', 'italic', 'underline', '|', 'link','heading'],
					shouldNotGroupWhenFull: false
				},
				plugins: [AutoLink, Autosave, Bold, Essentials, Italic, Link, Paragraph, Underline, Heading],
				initialData: '',
				licenseKey: LICENSE_KEY,
				link: {
					addTargetToExternalLinks: true,
					defaultProtocol: 'https://',
					decorators: {
						toggleDownloadable: {
							mode: 'manual',
							label: 'Downloadable',
							attributes: {
								download: 'file'
							}
						}
					}
				},
				placeholder: 'Type or paste your content here!'
			}
		};
	}, [isLayoutReady]);

	return (
		<div className="main-container">
			<div className="editor-container editor-container_classic-editor" ref={editorContainerRef}>
				<div className="editor-container__editor">
					<div ref={editorRef}>
            { editorConfig
              && 
              <CKEditor 
                editor={ClassicEditor} 
                config={editorConfig} 
                value={props.value} 
                onChange={(event,editor) => {
                  const data = editor.getData();
                  props.setValue(data);
                }}
              />
            }
          </div>
				</div>
			</div>
		</div>
	);
}
