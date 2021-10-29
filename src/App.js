import React ,{useState, useEffect}from 'react';
import './App.css';
import Post from './Post';
import {db, auth} from './firebase.js';
import { Button, Input, makeStyles } from '@material-ui/core';
import Modal from '@material-ui/core/Modal';
import ImageUpload from './ImageUpload.js'
import InstagramEmbed from 'react-instagram-embed';


function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));
function App() {
  
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const [posts, setPosts] = useState([]);
  const [open, setOpen] = useState(false);
  const [opensignin, setOpensignin] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, SetUser] = useState(null);
  
  useEffect(() => {
   auth.onAuthStateChanged((authUser) =>{
   if(authUser){
      // if user is logged in...
      SetUser(authUser);
      console.log(authUser);
    
   } else{
   // if User has logged out...
   SetUser(null);
   }
   })
   
    
  }, [user, username]);
  
  useEffect(() => {
    db.collection('posts').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
      //loads every time when new post is added
    setPosts(snapshot.docs.map(doc => ({

      id:doc.id,post:doc.data()
      
    })));
    })
    
  }, []);

  const signup = (event) => {
  event.preventDefault(); 
  
      auth
      .createUserWithEmailAndPassword(email,password)
      .then((authUser) =>{
        return authUser.user.updateProfile({
          displayName : username
        })
      })
      .catch((error) => alert(error.message))

      setOpen(false);
  }
    const signIn = (event) => {
    event.preventDefault();
    auth.signInWithEmailAndPassword(email,password)
    .catch((error) => alert(error.message))
  
    setOpensignin(false);
  }

  return (
    <div className="App">
   <Modal
  open={open}
  onClose={() => setOpen(false)}>
  <div style={modalStyle} className={classes.paper}>
    <form className="app_signup">
     <centre>
          <img 
      className="app_headerImage"
      src="https://www.instagram.com/static/images/web/mobile_nav_type_logo-2x.png/1b47f9d0e595.png"
      alt=""/>   
   </centre>
    <Input 
    type="text"
    placeholder="username"
    value={username}
    onChange={(e) => setUsername(e.target.value)}>
    </Input>
    <Input 
    type="text"
    placeholder="email"
    value={email}
    onChange={(e) => setEmail(e.target.value)}>
    </Input>
    <Input 
    type="password"
    placeholder="password"
    value={password}
    onChange={(e) => setPassword(e.target.value)}>
    </Input>

    <Button type="submit" onClick={signup}>Signup</Button>
    </form>
  </div>
</Modal>

<Modal
  open={opensignin}
  onClose={() => setOpensignin(false)}>
  <div style={modalStyle} className={classes.paper}>
    <form className="app_signup">
     <centre>
          <img 
      className="app_headerImage"
      src="https://www.instagram.com/static/images/web/mobile_nav_type_logo-2x.png/1b47f9d0e595.png"
      alt=""/>   
   </centre>
    
    <Input 
    type="text"
    placeholder="email"
    value={email}
    onChange={(e) => setEmail(e.target.value)}>
    </Input>
    <Input 
    type="password"
    placeholder="password"
    value={password}
    onChange={(e) => setPassword(e.target.value)}>
    </Input>

    <Button type="submit" onClick={signIn}>SignIn</Button>
    </form>
  </div>
</Modal>
<div className = "App_Header">
<img 
className="app_headerImage"
src="https://www.instagram.com/static/images/web/mobile_nav_type_logo-2x.png/1b47f9d0e595.png"
alt=""/>

{user ? (<Button onClick={() => auth.signOut()}>Logout </Button>) : 
<div className="app_loginontainer">
<Button onClick={() => setOpensignin(true)}>SignIn</Button>
<Button onClick={() => setOpen(true)}>SignUp</Button>
</div>
}
</div>
<div className="app_posts">
<div className="app-postsleft">
  {
    posts.map(({id, post})=>(
    <Post key={id} postId={id} user={user} username={post.username} imageUrl={post.imageUrl} caption={post.caption}/>
    ))
  }
    </div>
<div className="app_postsright">
<InstagramEmbed
      url='https://www.instagram.com/p/CHsnMS8D1op/'
      maxWidth={320}
      hideCaption={false}
      containerTagName='div'
      protocol=''
      injectScript
      onLoading={() => {}}
      onSuccess={() => {}}
      onAfterRender={() => {}}
      onFailure={() => {}}
/>
</div>
</div>

  
 {user?.displayName ? (
         <ImageUpload username={user.displayName}/>
      ):(<h3>Sorry you need to login to upload</h3>
    )}
  </div>
  
 );

}
  export default App;
