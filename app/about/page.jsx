import BackButton from "../components/BackButton";
import ImageCarousel from "../components/ImageCarousel";

export default function AboutPage() {
  return (
    <div className="aboutContainer"> 
        <BackButton/>
        <div className="innerAboutContainer"> 
            <h1>About Me</h1>

      <h2>Who I Am</h2>
      <p>
        Hey! I’m a self-taught barber based in Fredericton, New Brunswick. <br/> What started as a hobby turned into a full-time service as I found a passion for the craft. <br/> Over time, I’ve built strong connections within the local community—especially among university students.
      </p>

       <h2>My Work</h2>
      
        <ImageCarousel/>

      <h2>My Journey</h2>
      <p>
        I started cutting hair over two years ago, practicing on friends and learning through trial and error. Since then, I’ve refined my technique, studied styles, and developed a reputation for clean, consistent cuts. My focus has always been on getting better, one client at a time.
      </p>

      <h2>What I Offer</h2>
      <p>
        I specialize in haircuts and beard trims tailored to student needs—quick, affordable, and precise. Whether you're getting ready for a hangout, event, or just need a fresh look, I’ve got you covered. Every booking is done with care and flexibility in mind.
      </p>

      <h2>What Sets Me Apart</h2>
      <p>
        Unlike busy barber shops, I keep things personal. You won’t be rushed through the chair—I take time with each client to understand what you want and make it happen. I believe in delivering quality with consistency and in creating a chill, reliable experience every time.
      </p>

     
      
        </div>

        

        
    </div>
  );
}
