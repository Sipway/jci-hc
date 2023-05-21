import { useEffect, useState } from 'react';
import './App.css';
import { db } from './config/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { useParams } from 'react-router-dom';
import MemberForm from './components/rmemberDirecoryForm';

function App() {
  const [members, setMembers] = useState([]);
  
  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const membersRef = collection(db, 'members');
        const membersSnapshot = await getDocs(membersRef);
        const membersData = membersSnapshot.docs.map((doc) => doc.data());
        setMembers(membersData);
      } catch (error) {
        console.error('Error fetching members:', error);
      }
    };

    fetchMembers();
  }, []);

  return (
    <div className="App">
      {members.map((member) => (
        <div className="member-card" key={member.id}>
          <img src={member.profilePicture} alt="Profile" className="profile-picture" />
          <h2 className="member-name">{member.name}</h2>
          <p className="member-title">{member.title}</p>
          <button onClick={() => window.open(member.website)}>Know More</button>
        </div>
      ))}

    
    </div>
  );
}

export default App;
