import React from 'react';
import './css/dropzone.css';
import './css/dropzone.min.css';
import './css/filepicker.css';
import DropzoneComponent from 'react-dropzone-component';

export default class Dropzone extends React.Component {
	constructor(props) {
		super(props);

		// For a full list of possible configurations,
		// please consult http://www.dropzonejs.com/#configuration
		this.djsConfig = {
			addRemoveLinks: true,
			acceptedFiles: ".txt, .zip",
			chunking: true,
			chunkSize: 2048000,
			retryChunks: true,
			retryChunksLimit: 10,
			maxFilesize: 1000,
			parallelUploads: 1,
			params: {
				myParam: 'Hello from a parameter!',
				anotherParam: 43
			}
		};

		this.componentConfig = {
			iconFiletypes: ['.jpg', '.png', '.gif'],
			showFiletypeIcon: true,
			postUrl: '/23meupload'
		};

		// If you want to attach multiple callbacks, simply
		// create an array filled with all your callbacks.
		this.dropCallbackArray = [() => console.log('Hi this.dropCallbackArra'), () => console.log('Ho this.dropCallbackArra')];

		// Simple callbacks work too, of course
		this.addedfileCallback = () => console.log('Hello this.addedfileCallback');
	}

	render() {
		const config = this.componentConfig;
		const djsConfig = this.djsConfig;

		// For a list of all possible events (there are many), see README.md!
		const eventHandlers = {
			drop: this.dropCallbackArray,
			addedfile: this.addedfileCallback,
		}

		return (
			<DropzoneComponent config={config} eventHandlers={eventHandlers} djsConfig={djsConfig} />
		);
	}
}
