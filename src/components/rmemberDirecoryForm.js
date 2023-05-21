import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db, storage } from '../config/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import '../components/memberForm.css'

const MemberForm = () => {
  const [name, setName] = useState('');
  const [profilePicture, setProfilePicture] = useState(null);
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [facebook, setFacebook] = useState('');
  const [instagram, setInstagram] = useState('');
  const [twitter, setTwitter] = useState('');
  const [linkedin, setLinkedin] = useState('');
  const [website, setWebsite] = useState('');
  const [snapchat, setSnapchat] = useState('');
  const [telegram, setTelegram] = useState('');
  const [youtube, setYoutube] = useState('');

  const handleProfilePictureUpload = (e) => {
    const file = e.target.files[0];
    setProfilePicture(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let profilePictureUrl = '';

      // Upload the profile picture to Firebase Storage
      if (profilePicture) {
        const storageRef = ref(storage, profilePicture.name);
        const uploadTaskSnapshot = await uploadBytes(storageRef, profilePicture);
        profilePictureUrl = await getDownloadURL(uploadTaskSnapshot.ref);
      }

      // Create a new member object
      const member = {
        name,
        profilePicture: profilePictureUrl,
        email,
        mobile,
        whatsapp,
        facebook,
        instagram,
        twitter,
        linkedin,
        website,
        snapchat,
        telegram,
        youtube,
      };

      // Add the member data to the Firestore collection
      const docRef = await addDoc(collection(db, 'members'), member);
      console.log('Member added with ID:', docRef.id);

      // Reset the form fields
      setName('');
      setProfilePicture(null);
      setEmail('');
      setMobile('');
      setWhatsapp('');
      setFacebook('');
      setInstagram('');
      setTwitter('');
      setLinkedin('');
      setWebsite('');
      setSnapchat('');
      setTelegram('');
      setYoutube('');
    } catch (error) {
      console.error('Error adding member:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Name:</label>
      <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required />

      <label htmlFor="profilePicture">Profile Picture:</label>
      <input type="file" id="profilePicture" onChange={handleProfilePictureUpload} />

   

      <label htmlFor="email">Email:</label>
      <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />

      <label htmlFor="mobile">Mobile:</label>
      <input type="tel" id="mobile" value={mobile} onChange={(e) => setMobile(e.target.value)} required />

      <label htmlFor="whatsapp">WhatsApp:</label>
      <input type="tel" id="whatsapp" value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)} />

      <label htmlFor="facebook">Facebook:</label>
      <input type="url" id="facebook" value={facebook} onChange={(e) => setFacebook(e.target.value)} />

      <label htmlFor="instagram">Instagram:</label>
      <input type="url" id="instagram" value={instagram} onChange={(e) => setInstagram(e.target.value)} />

      <label htmlFor="twitter">Twitter:</label>
      <input type="url" id="twitter" value={twitter} onChange={(e) => setTwitter(e.target.value)} />

      <label htmlFor="linkedin">LinkedIn:</label>
      <input type="url" id="linkedin" value={linkedin} onChange={(e) => setLinkedin(e.target.value)} />

      <label htmlFor="website">Website:</label>
      <input type="url" id="website" value={website} onChange={(e) => setWebsite(e.target.value)} />

      <label htmlFor="snapchat">Snapchat:</label>
      <input type="text" id="snapchat" value={snapchat} onChange={(e) => setSnapchat(e.target.value)} />

      <label htmlFor="telegram">Telegram:</label>
      <input type="text" id="telegram" value={telegram} onChange={(e) => setTelegram(e.target.value)} />

      <label htmlFor="youtube">YouTube:</label>
      <input type="url" id="youtube" value={youtube} onChange={(e) => setYoutube(e.target.value)} />

      <button type="submit">Submit</button>
    </form>
  );
};

export default MemberForm;
