import { useEffect, useState } from 'react';
import './Website.css';
import { db, storage } from '../../config/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { useParams } from 'react-router-dom';

function Website() {
  const [user, setUser] = useState({
    name: '',
    mobile: '',
    website: '',
    whatsapp: '',
    linkedin: '',
    twitter: '',
    email: '',
    instagram: '',
    medium: '',
    youtube: '',
    discord: '',
    onlyfans: '',
    snapchat: '',
    telegram: '',
    location: '',
    skype: '',
    title: '', // Added "title" field
    profilePicture: '', // Added "profilePicture" field
  });

  const { docId } = useParams();
  const docRef = doc(db, 'members', docId);

  useEffect(() => {
    const getUser = async () => {
      try {
        const data = await getDoc(docRef);
        setUser(data.data());
      } catch (err) {
        console.error(err);
      }
    };

    getUser();
  }, []);

  const downloadContact = () => {
    const vcard = `BEGIN:VCARD
VERSION:3.0
FN:${user.name}
TEL;TYPE=CELL:${user.mobile}
EMAIL:${user.email}
END:VCARD`;

    const blob = new Blob([vcard], { type: 'text/vcard;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'my_contact.vcf');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  useEffect(() => {
    const getImageUrl = async () => {
      if (user.profilePicture) {
        const storageRef = storage.ref();
        const imageRef = storageRef.child(user.profilePicture);
        const imageUrl = await imageRef.getDownloadURL();
        setUser((prevUser) => ({
          ...prevUser,
          profilePicture: imageUrl,
        }));
      }
    };

    getImageUrl();
  }, [user.profilePicture]);

  return (
    <div className="App">
      <div className="card-section">
        <div className="card">
          {user && (
            <>
              <img src={user.profilePicture} alt="Profile" className="profile-picture" />
              <h2 className="profile-name">{user.name}</h2>
              <p className="profile-title">{user.title}</p>
              <button className="save-contact-btn" onClick={downloadContact}>
                Save my contact
              </button>
            </>
          )}
        </div>
      </div>

      {user && (
        <div className="social-links-container">
          <ul className="social-links">
            {user.mobile && (
              <li>
                <a href={`tel:${user.mobile}`}>
                  <img src="/phone.png" alt="Call" />
                </a>
              </li>
            )}
            {user.whatsapp && (
              <li>
                <a href={`https://wa.me/${user.whatsapp}`}>
                  <img src="/whatsapp.png" alt="WhatsApp" />
                </a>
              </li>
            )}
            {user.email && (
              <li>
                <a href={`mailto:${user.email}`}>
                  <img src="/email.png" alt="Email" />
                </a>
              </li>
            )}
            {user.facebook && (
              <li>
                <a href={`https://www.facebook.com/${user.facebook}`}>
                  <img src="/facebook.png" alt="Facebook" />
                </a>
              </li>
            )}
            {user.website && (
              <li>
                <a href={user.website}>
                  <img src="/website.png" alt="Website" />
                </a>
              </li>
            )}
            {user.instagram && (
              <li>
                <a href={`https://www.instagram.com/${user.instagram}`}>
                  <img src="/instagram.png" alt="Instagram" />
                </a>
              </li>
            )}
            {user.linkedin && (
              <li>
                <a href={`https://www.linkedin.com/in/${user.linkedin}`}>
                  <img src="/linkedin.png" alt="LinkedIn" />
                </a>
              </li>
            )}
            {user.twitter && (
              <li>
                <a href={`https://www.twitter.com/${user.twitter}`}>
                  <img src="/twitter.png" alt="Twitter" />
                </a>
              </li>
            )}
            {user.medium && (
              <li>
                <a href={user.medium}>
                  <img src="/medium.png" alt="Medium" />
                </a>
              </li>
            )}
            {user.youtube && (
              <li>
                <a href={user.youtube}>
                  <img src="/youtube.png" alt="YouTube" />
                </a>
              </li>
            )}
            {user.discord && (
              <li>
                <a href={user.discord}>
                  <img src="/discord.png" alt="Discord" />
                </a>
              </li>
            )}
            {user.onlyfans && (
              <li>
                <a href={user.onlyfans}>
                  <img src="/onlyfans.png" alt="OnlyFans" />
                </a>
              </li>
            )}
            {user.snapchat && (
              <li>
                <a href={`https://www.snapchat.com/add/${user.snapchat}`}>
                  <img src="/snapchat.png" alt="Snapchat" />
                </a>
              </li>
            )}
            {user.telegram && (
              <li>
                <a href={`https://t.me/${user.telegram}`}>
                  <img src="/telegram.png" alt="Telegram" />
                </a>
              </li>
            )}
            {user.location && (
              <li>
                <a href={user.location}>
                  <img src="/location.png" alt="Location" />
                </a>
              </li>
            )}
            {user.skype && (
              <li>
                <a href={`skype:${user.skype}?chat`}>
                  <img src="/skype.png" alt="Skype" />
                </a>
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Website;
