
const History = () => {
    // In a real app, you would fetch this from local storage or a backend
    const processedImages = []
  
    return (
      <div className="history-page card">
        <h2>Your Processed Images</h2>
        {processedImages.length > 0 ? (
          <div className="history-grid">
            {processedImages.map((image, index) => (
              <div key={index} className="history-item">
                <img src={image.preview} alt={`Processed ${index}`} />
                <p>{image.effect}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="empty-message">
            You haven't processed any images yet. Try it out on the home page!
          </p>
        )}
      </div>
    )
  }
  
  export default History