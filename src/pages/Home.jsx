import ImageUploader from '../components/ImageUploader'
import './Home.css'
const Home = () => {
  return (
    <div className="home-page">
      <div className="card processing-card">
        <ImageUploader />
      </div>
      
      <div className="card examples-card">
      </div>
    </div>
  )
}

const ExampleEffect = ({ name, icon }) => (
  <div className="example-effect">
    <div className="effect-icon">{icon}</div>
    <span>{name}</span>
  </div>
)

export default Home