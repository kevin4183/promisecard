import React, {useState} from 'react';
import DownloadShareModal from './DownloadShareModal';
import { Link } from 'react-router-dom';
import PromiseCard from './PromiseCard';

const GeneratedCard = ({ cardInfo, color }) => {
  const [openModal, setOpenModal] = useState(false)

  return (
    <div>
    <div className={`card`}>
      <div id={`generatedScreen`}
       style={{
        backgroundColor: `${color.activeColor}`,
      }} 
       >
          <h2>{cardInfo.card.name + `'s`} Promise Card</h2>
          <p className="subTitle">
            Things I want{" "}
            <span
              style={{
                backgroundColor: "#fff",
                borderRadius: "50%",
                width: "24px",
                height: "24px",
                padding: "1px 7px",
                marginLeft: "5px"
              }}
            >
              {cardInfo.card.cardItems.length}
            </span>
          </p>
          <div className="form-input">
            {cardInfo.card.cardItems.map((item, index) => (
              <input
                key={index}
                type="text"
                name="text1"
                placeholder="write item name"
                value={item.value}
                onChange={(e)=>console.log(e)}
              />
            ))}
            <div className="linkWrapImg">
            <Link to="https://caard.netlify.app"  className="create-link">
            <p>Create your own Promisecard.com.ng</p>
            </Link>
        </div>
        </div>
        
      </div>
      <div className="share">
        <div  onClick={() => setOpenModal(true)} className="socialShare">
          <button>Share with friends</button>
        </div>
        <Link onClick={PromiseCard}>
          <div className="createCard" onClick={PromiseCard}>
              <button>Create new card</button>
          </div>
        </Link>
      </div>
    </div>
      <DownloadShareModal  cardInfo={cardInfo} open={openModal} onClose={() => setOpenModal(false)} />
  </div>
  );
}

export default GeneratedCard