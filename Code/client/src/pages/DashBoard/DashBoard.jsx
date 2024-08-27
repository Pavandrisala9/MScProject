import { useContext, useRef } from "react";
import { Chart } from "../../components";
import { UserContext } from "../../context/userContext";
import { Link } from "react-router-dom";
import html2canvas from 'html2canvas';

import { FaFire } from "react-icons/fa";
import { PiFinnTheHumanThin } from "react-icons/pi";
import "./DashBoard.scss";

const DashBoard = () => {
  const refToCapture = useRef(null);

  const handleScreenshotClick = async () => {
    try {
      const canvas = await html2canvas(refToCapture.current);
      const imageBlob = canvas.toDataURL('image/png');
  
      const link = document.createElement('a');
      link.href = imageBlob;
      link.download = 'screenshot.png';
      link.click();
  
      const textToCopy = "Hey!, checkout my progess on this cool habit tracking app!!!!";
      await navigator.clipboard.writeText(textToCopy);
  
      alert('Screenshot captured and text copied to clipboard!');
  
      console.log('Screenshot captured:', imageBlob);
    } catch (error) {
      console.error('Error capturing screenshot or copying text:', error);
    }
  };
  

  const { userInfo, habits } = useContext(UserContext);
  const totalPoint = (habits) => {
    const totalDays = habits.map((item) => item.value).flat();
    return totalDays.length;
  };

  const facebookimageUrl = 'https://store-images.s-microsoft.com/image/apps.37935.9007199266245907.b029bd80-381a-4869-854f-bac6f359c5c9.91f8693c-c75b-4050-a796-63e1314d18c9'; // Replace with your image URL
  const InstagramimgaeUrl = 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Instagram_logo_2022.svg/640px-Instagram_logo_2022.svg.png'
  const handleFacebookClick = () => {
    window.open('https://www.facebook.com/sharer/sharer.php?u=https://your-website.com', '_blank');
  };

  const handleInstagramClick = () => {
    window.open(`https://www.instagram.com/?caption=${encodeURIComponent('Check out this cool image!')}`, '_blank');
  };

  return (
    <div className="app__dashboard" ref={refToCapture}>
      <div className="app__dashboard-container">
        <div className="app__chart">
          <Chart habits={habits} />
        </div>
        <div className="app__user">
          <PiFinnTheHumanThin />
          <p>
            Hey, {userInfo?.username?.split(" ")[0]} checkout your stats and
            build strong habits.
          </p>
        </div>
        <div className="app__totalPoints">
          Total Point <FaFire /> {totalPoint(habits)}
        </div>
        <div className="app__history">
          {habits.map((habit) => (
            <Link to={`/heatmap/${habit.id}`}>
              <li key={habit.id}>
                <p>{`${habit.id}. ${habit.title}`}</p>
              </li>
            </Link>
          ))}
        </div>
      </div>
      <div style={{display: 'flex', gap: '10px', marginTop: '20px', justifyContent: 'center'}}>
        <button onClick={handleScreenshotClick} style={{padding: '10px', background: '#dbebff'}}>Share</button>
        <button className="social-button" onClick={handleFacebookClick} style={{display: 'flex', alignItems: 'center', padding: '10px', gap: '10px', background: '#dbebff'}}>
          <img src={facebookimageUrl} alt="Facebook" style={{ width: '50px', height: '50px' }}  />
          <p>Facebook</p>
        </button>
        <button className="social-button" onClick={handleInstagramClick} style={{display: 'flex', alignItems: 'center', padding: '10px', gap: '10px', background: '#dbebff'}} >
          <img src={InstagramimgaeUrl} alt="Instagram" style={{ width: '50px', height: '50px' }}  />
          <p>Instagram</p>
        </button>
      </div>
    </div>
  );
};

export default DashBoard;
