import React from 'react';
import './css/dropzone.css';
import './css/dropzone.min.css';
import './css/filepicker.css';
import DropzoneComponent from 'react-dropzone-component';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

export default class Dropzone extends React.Component {
	constructor(props) {
		super(props);
		// For a full list of possible configurations,
		// please consult http://www.dropzonejs.com/#configuration
		this.count = 0;
		this.djsConfig = {
			addRemoveLinks: true,
			acceptedFiles: ".txt",
			chunking: true,
			chunkSize: 1024000,
			retryChunks: true,
			retryChunksLimit: 10,
			maxFilesize: 1000000,
			parallelUploads: 1,
			params: {
				// myParam: 'Hello from a parameter!',
				// anotherParam: 43
			}
		};

		this.componentConfig = {
			iconFiletypes: ['.txt'],
			showFiletypeIcon: true,
			postUrl: '/23meupload'
		};

		// If you want to attach multiple callbacks, simply
		// create an array filled with all your callbacks.
		this.drop = [() => console.log('Hi this.dropCallbackArra'), () => console.log('Ho this.dropCallbackArra')];

		this.uploadCanceled = this.uploadCanceled.bind(this);
		this.error = this.error.bind(this);
		this.sending = this.sending.bind(this);
		this.addedfile = this.addedfile.bind(this);
		this.success = this.success.bind(this);

	}

	addedfile() {
		this.uuid = uuidv4();
		console.log(`new file added. we have generated a new uuid: ${this.uuid}`);
	};

	uploadCanceled() {
		this.uuid = uuidv4();
		console.log(new Date().toLocaleString());
		console.log('uploadCanceled');
	}

	sending(file, xhr, formData) {
		formData.append("uuid", this.uuid);
	}

	async success() {
		console.log(new Date().toLocaleString());
		console.log('upload success');
		try {
			const res = await axios.post('/calculate', {
				uuid: this.uuid,
			});
			const data = { uuid: this.uuid };
			console.log(data);
			const resObj = JSON.parse(res.data);
			console.log('we got the resObj.');
			console.log(resObj);
			const { setPlot } = this.props;
			console.log('finished const setPlot = props.setPlot;');
			const result = {
				x: resObj.figure[0].data[0].x,
				y: resObj.figure[0].data[0].y,
				array: resObj.figure[0].data[0].error_y.array,
			};
			console.log(result);
			setPlot(result);
		} catch (err) {
      console.log(`There was a problem with the server: ${err}`);
    }
		this.uuid = uuidv4();
	}

	error() {
		console.log(new Date().toLocaleString());
		console.log('upload error');
		this.uuid = uuidv4();
	}

	render() {
		const config = this.componentConfig;
		const djsConfig = this.djsConfig;

		// For a list of all possible events (there are many), see README.md!
		const eventHandlers = {
			drop: this.drop,
			addedfile: this.addedfile,
			canceled: this.uploadCanceled,
			error: this.error,
			sending: this.sending,
			success: this.success,
		}

		return (
			<DropzoneComponent config={config} eventHandlers={eventHandlers} djsConfig={djsConfig} />
		);
	}
}
