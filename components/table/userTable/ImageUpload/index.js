import React, { Component } from "react";
import { bool, string, func } from "prop-types";
import axios from "axios";
import Dropzone from "react-dropzone";
// import cx from "classnames";
import { omit, isEmpty, noop } from "lodash";
// import Loader from "../../../loader";
// import { FormError, Loader } from "real-react";
// import styles from "./styles.scss";

const upload = ({ requestFieldName, onUploadProgress, image, url }) => {
  const formData = new FormData();
  formData.append(requestFieldName, image);

  return axios
    .put(url, formData, { onUploadProgress, requestName: "fileUpload" })
    .then((response) => response.data);
};

const propTypes = {
  className: string,
  inputRef: func,
  onChange: func.isRequired,
  onError: func,
  renderImage: func.isRequired,
  // TODO: should probably be refactored to a function returning payload
  renderPlaceholder: func.isRequired,
  requestFieldName: string.isRequired,
  setUploadSuccessStatus: func.isRequired,
  shouldShowErrors: bool,
  url: string.isRequired,
  value: string,
};

class ImageUpload extends Component {
  state = {
    errorMessages: [],
    uploadProgress: 0,
    isUploadInProgress: false,
  };

  setUploadProgress = (progressEvent) => {
    const progress = Math.round(
      (progressEvent.loaded / progressEvent.total) * 100
    );
    this.setState({
      uploadProgress: progress,
    });
  };

  unsetIsUploadInProgress = () => {
    this.setState({ isUploadInProgress: false });
  };

  setError = () => {
    const { onError } = this.props;
    const errorMessages = "Error to found the file";

    onError(errorMessages);

    this.setState({
      errorMessages,
      isUploadInProgress: false,
    });
  };

  handleUpload = (event) => {
    const {
      url,
      requestFieldName,
      onChange,
      onUploadSuccess,
      setIsProcessing,
    } = this.props;
    this.setState({
      errorMessages: [],
      isUploadInProgress: true,
    });

    if (setIsProcessing) {
      onChange("");
      setIsProcessing(true);
    }

    upload({
      requestFieldName,
      url,
      onUploadProgress: this.setUploadProgress,
      image: event.target.files[0],
    })
      .then(onChange)
      .then(this.unsetIsUploadInProgress)
      .then(onUploadSuccess)
      .catch(this.setError);
  };

  getRenderedImageProps = () => {
    const { value } = this.props;
    return {
      src: value,
      onLoad: this.unsetIsUploadInProgress,
    };
  };

  render() {
    const {
      value,
      onChange,
      inputRef,
      className,
      renderImage,
      renderPlaceholder,
      shouldShowErrors,
      children,
      referer,
      ...otherProps
    } = this.props;
    const { uploadProgress, isUploadInProgress, errorMessages } = this.state;
    const dropzoneProps = omit(otherProps, Object.keys(propTypes));
    const hasImage = Boolean(value);
    const hasErrors = !isEmpty(errorMessages);
    return (
      <>
        <Dropzone
          multiple={false}
          accept="image/jpeg, image/png, image/gif"
          ref={referer}
        >
          {({ getRootProps, getInputProps }) => {
            return (
              <div
                {...getRootProps({
                  className: "dropzone",
                  onDrop: (event) => event.stopPropagation(),
                  onChange: (event) => this.handleUpload(event),
                })}
              >
                {hasImage
                  ? renderImage(this.getRenderedImageProps())
                  : renderPlaceholder()}
                {isUploadInProgress && (
                  <div className="progress-photo">{uploadProgress}%</div>
                )}
                {children}
                <input {...getInputProps()} />
              </div>
            );
          }}

          {/* {(dropzoneProps) => {
            return (
              <>
                {hasImage
                  ? renderImage(this.getRenderedImageProps())
                  : renderPlaceholder()}
                {isUploadInProgress && (
                  <div className="progress-photo">{uploadProgress}%</div>
                )}
                {children}
              </>
            );
          }} */}
        </Dropzone>
      </>
    );
  }
}

ImageUpload.propTypes = propTypes;

ImageUpload.defaultProps = {
  className: "",
  inputRef: null,
  value: "",
  shouldShowErrors: true,
  //   onError: noop,
};

export default ImageUpload;
