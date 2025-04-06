import { useState, useRef } from 'react'
import axios from 'axios'
import { FiUpload, FiImage, FiDownload, FiLoader } from 'react-icons/fi'

const ImageUploader = () => {
  const [inputImage, setInputImage] = useState(null)
  const [outputImage, setOutputImage] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [effect, setEffect] = useState('enhance')
  const fileInputRef = useRef(null)

  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (file && file.type.match('image.*')) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setInputImage(reader.result)
        setError(null)
      }
      reader.readAsDataURL(file)
    } else {
      setError('Please select a valid image file .')
    }
  }

  const handleDragOver = (e) => {
    e.preventDefault()
  }

  const handleDrop = (e) => {
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    if (file && file.type.match('image.*')) {
      const reader = new FileReader()
      reader.onloadend = () => setInputImage(reader.result)
      reader.readAsDataURL(file)
    }
  }

  const processImage = async () => {
    if (!inputImage) {
      setError('Please upload an image first')
      return
    }
  
    setIsLoading(true)
    setError(null)
  
    try {
      const base64Data = inputImage.split(',')[1]
      const response = await axios.post('YOUR_API_ENDPOINT', {
        image: base64Data,
        effect: effect
      })
  
      if (response.data?.processed_image) {
        const processedImage = `data:image/jpeg;base64,${response.data.processed_image}`
        setOutputImage(processedImage)
        
        // Save to history (in a real app, you might use context or a state manager)
        const historyItem = {
          original: inputImage,
          processed: processedImage,
          effect,
          date: new Date().toISOString()
        }
        const history = JSON.parse(localStorage.getItem('imageHistory') || '[]')
        localStorage.setItem('imageHistory', JSON.stringify([historyItem, ...history]))
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to process image')
    } finally {
      setIsLoading(false)
    }
  }
  return (
    <div className="uploader-container">
      <div 
        className={`drop-zone ${inputImage ? 'has-image' : ''}`}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current.click()}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleImageUpload}
          accept="image/*"
          className="hidden-input"
        />
        {!inputImage ? (
          <div className="upload-prompt">
            <FiUpload className="upload-icon" />
            <p>Drag & drop an image or click to browse</p>
            <p className="small-text">Supports JPG, PNG, WEBP</p>
          </div>
        ) : (
          <div className="image-preview-container">
            <img 
              src={inputImage} 
              alt="Preview" 
              className="upload-preview"
            />
          </div>
        )}
      </div>

      {inputImage && (
        <div className="processing-controls">
          <div className="effect-selector">
            <label htmlFor="effect">Select Effect:</label>
            <select 
              id="effect"
              value={effect}
              onChange={(e) => setEffect(e.target.value)}
            >
              <option value="enhance">Enhance</option>
              <option value="sketch">Sketch</option>
              <option value="cartoon">Cartoon</option>
              <option value="vintage">Vintage</option>
              <option value="blur">Background Blur</option>
            </select>
          </div>

          <button
            onClick={processImage}
            disabled={isLoading}
            className="process-button"
          >
            {isLoading ? (
              <>
                <FiLoader className="spin" />
                Processing...
              </>
            ) : (
              'Apply Effect'
            )}
          </button>
        </div>
      )}

      {error && <div className="error-message">{error}</div>}

      {outputImage && (
        <div className="result-container">
          <h3 className="result-title">
            <FiImage /> Processed Result
          </h3>
          <div className="result-image-container">
            <img 
              src={outputImage} 
              alt="Processed result" 
              className="result-image"
            />
            <a
              href={outputImage}
              download={`processed-${effect}-${Date.now()}.jpg`}
              className="download-button"
            >
              <FiDownload /> Download
            </a>
          </div>
        </div>
      )}
    </div>
  )
}

export default ImageUploader