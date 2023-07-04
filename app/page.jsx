import GymFeed from "@components/GymFeed";
import HomepageFooter from "@components/HomepageFooter";

const Home = () => {
  return (
    <div>
        <h1>Homepage</h1>
        <h2>put list of verified gyms here</h2>
        <GymFeed />
        <HomepageFooter />
    </div>
  )
}

export default Home