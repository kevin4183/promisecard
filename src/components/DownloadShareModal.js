
import React, { useState } from "react";
import download from "../images/download.svg";
import { FacebookShareButton, FacebookIcon } from "react-share";
import { WhatsappShareButton, WhatsappIcon } from "react-share";
import { TwitterShareButton, TwitterIcon } from "react-share";
import downloadjs from 'downloadjs';
import html2canvas from 'html2canvas';
import { useParams} from 'react-router-dom'
import Cards from "../Cards";


  function toDataURL(src) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.crossOrigin = "anonymous";
    image.src = src;
    image.onload = function () {
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");
      canvas.height = this.naturalHeight;
      canvas.width = this.naturalWidth;
      context.drawImage(this, 0, 0);
      resolve(canvas.toDataURL("image/png"));
    };
    image.onerror = () => reject("Could not load image");
  });
}

const DownloadShare = ({ open, onClose }) => {
  const [cardDetails, setCardDetails] = useState("");
  const [showCard, setShowCard] = useState(false);
    const { cardId } = useParams(); 

  if (!open) return null;

  const handleCaptureClick = async () => {
    const imageCardDownload = document.getElementById(`generatedScreen`);
    if (!imageCardDownload) return;

    const canvas = await html2canvas(imageCardDownload);
    const dataURL = canvas.toDataURL("image/png");
    downloadjs(dataURL, "download.png", "image/png");
  };

  // useEffect(() => {
  
  // }, []);


  const getCardData = async () => {
    try {
        //resolves fetch promise
        const res = await fetch(`https://promise-card-api.onrender.com/api/get-card/`, {
          method: "GET",
          headers: {
            "content-type": "application/json",
          },
        });
        //resolves res.json()'s promise
        const jsonData = await res.json();
        setCardDetails(jsonData)
    
        // previews response in the console
        console.log(jsonData);

      } catch (error) {
        console.error(error);
      }
    }
    
  return (<>
  {!showCard? 
    <div onClick={onClose} className="overlay">
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="modalwrapper"
      >
        <div>
          <p onClick={onClose} className="closeBtn">
            X
          </p>
          <p className="modal-text">Share with friends</p>
          <p className="modal-text-two">
            Download a screenshot and <br /> share across social media
          </p>
        </div>

        <div className="share-btn">
          <span>
            <img
              src={download}
              alt="save file icon"
              id="fileDownload"
              onClick={handleCaptureClick}
            />
            <p>Save image</p>
          </span>
          <span>
            <FacebookShareButton
              url={`"https://promise-card-8jnp.onrender.com/cards/"`}
              quote={"An awesome promise card"}
              hashtag={"#mywishlist"}
              onClick={getCardData}
            >
              <FacebookIcon size={32} round />
            </FacebookShareButton>
            <p>Facebook</p>
          </span>
          <span>
            <WhatsappShareButton
              url={`"https://promise-card-8jnp.onrender.com/cards/"`}
              quote={"An awesome promise card"}
              hashtag={"#mywishlist"}
              onClick={getCardData}
            >
              <WhatsappIcon size={32} round />
            </WhatsappShareButton>
            <p>Whatsapp</p>
          </span>
          <span>
            <TwitterShareButton
              url={`"https://promise-card-8jnp.onrender.com/cards/${cardId}"`}
              quote={"An awesome promise card"}
              hashtag={"#mywishlist"}
              onClick={getCardData}
            >
              <TwitterIcon size={32} round />
            </TwitterShareButton>
            <p>Twitter</p>
          </span>
        </div>
      </div>
    </div>
    :
      <Cards cardDetails={cardDetails} />
      }
      </>


  );
};

export default DownloadShare;