
import { React, useState } from 'react';
import firebase from './firebase';
const Demo = () => {
    const auth = firebase.auth();
    const [user, setuser] = useState(null);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    console.log(auth);
    let handlesubmit = async () => {
        try {
            console.log(email, password);
            setLoading(true);
            let res = await auth.signInWithEmailAndPassword(email, password);
            console.log(res.user.uid);
            setLoading(false);
            setuser(res.user.uid)
        }
        catch (e) {
            console.log(e.message);
        }
    }
    let handlesignout = async () => {
        try {
            setLoading(true);
            let res = await auth.signOut();
            setLoading(false);
            setuser(null);

        }
        catch (e) {
            setError(e.message)
        }
    }
    return (
        <>
            {loading ? <div><h1>loading</h1> <h1>{error}</h1> </div> : user == null ?
                <div>
                    <label>email</label>
                    <input onChange={(e) => { setEmail(e.target.value) }} value={email} />
                    <label>password</label>
                    <input onChange={(e) => { setPassword(e.target.value) }} value={password} />
                    <button onClick={handlesubmit}>submit</button>
                </div>
                :
                <>
                    <h1>{user} has login</h1>
                    <button onClick={handlesignout}>signup</button>
                </>
            }
        </>
    );
}

export default Demo;
