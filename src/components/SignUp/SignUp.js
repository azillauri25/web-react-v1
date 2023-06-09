import React, { useState } from 'react';
import {navigate } from '@reach/router';
import { auth, signInWithGoogle, generateUserDocument } from '../../firebase/firebase';
import firebase from 'firebase/app';
import 'firebase/auth';


import 'gestalt/dist/gestalt.css';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [error, setError] = useState(null);
  const[confirmPassword, setConfirmPassword] = useState('')
  const[errorConfirmPassword, setErrorConfirmPassword] = useState('')
  const [alert, setAlert] = useState('');
  
  const createUserWithEmailAndPasswordHandler = async (event, email, password) => {
    event.preventDefault();
    setError(null);

    // Validasi Nama Lengkap tidak boleh kosong
    if (!displayName) {
        setError('Nama lengkap tidak boleh kosong');
        setTimeout(() => setError(null), 3000);
        return;
      }
    else if (/[0-9~`!@#$%^&*()+=\-[\]\\';,/{}|\\":<>?._]/.test(displayName)) {
      setError('Nama tidak boleh mengandung simbol atau angka');
      setTimeout(() => setError(null), 3000);
      return;
    }

    // Validasi email tidak boleh kosong
    if (!email) {
      setError('Email tidak boleh kosong');
      setTimeout(() => setError(null), 3000);
      return;
    }
    else if (!email.includes('@')) {
      setError('Email tidak valid');
      setTimeout(() => setError(null), 3000);
      return;
    }

    // Validasi kata sandi tidak boleh kosong
    if (!password) {
      setError('Kata sandi tidak boleh kosong');
      setTimeout(() => setError(null), 3000);
      return;
    }
    else if (password.length < 8) {
      setError('Kata sandi minimal berisikan 8 karakter');
      setTimeout(() => setError(null), 3000);
      return;
    }

    try{
      const {user} = await auth.createUserWithEmailAndPassword(email, password);
      generateUserDocument(user, {displayName});
      navigate('/masuk');
      setAlert('Berhasil mendaftar');
    }
    catch(error){
      setError('Kesalahan ketika mendaftar dengan email dan kata sandi');
    }

    setEmail("");
    setPassword("");
    setDisplayName("");
    setConfirmPassword("");
  };

  const changeConfirmPassword = (e) => {
    const value = e.target.value
    setConfirmPassword(value)
    if(!value) {
        setErrorConfirmPassword('Konfirmasi kata sandi tidak boleh kosong')
        setTimeout(() => setError(null), 3000);
    } else if (password !== value) {
        setErrorConfirmPassword('Kata sandi tidak cocok')
        setTimeout(() => setError(null), 3000);
    } else {
        setErrorConfirmPassword('')
    }
}

const signInWithGoogle = async () => {
  try {
    const provider = new firebase.auth.GoogleAuthProvider();
    await auth.signInWithPopup(provider);
    navigate('/masuk');
  } catch (error) {
    setError('Kesalahan ketika masuk dengan Google');
  }
};



  return (

  //Desain Baru Registration Form
  <div>
  <meta charSet="UTF-8" />
  <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossOrigin="anonymous" />
  <link rel="stylesheet" href="style.css" />
  <title>SIgn - Information System Signature</title>

  <div className="container d-flex justify-content-center align-items-center min-vh-100">

    <div className="row border rounded-5 p-4 bg-white shadow box-area" style={{borderRadius: '15px'}}>

      <div className="col-md-6 rounded-4 d-flex justify-content-center align-items-center flex-column left-box" style={{background: '#0778A8', minHeight: '600px', maxHeight: '1200px', borderRadius: '15px'}}>
        <div className="featured-image mb-1">
          <img src="./images/register-vector.png" alt= "yo" className="img-fluid" style={{width: '350px'}} />
        </div>
        <p className="text-white fs-2" style={{fontWeight: 600}}>Daftar</p>
      </div>

      <div className="col-md-6 right-box" style={{paddingTop: '2.5rem'}}>
        <div className="row align-items-center">
          <div className="header-text mb-4" style={{paddingLeft: '2rem'}}>
            <h2>Buat Akun Baru</h2>
            <p>Masukkan data diri Anda untuk melengkapi kebutuhan administrasi Anda.</p>
          </div>
          <div className="input-group mb-3" style={{paddingLeft: '2rem'}}>
            <input id="displayName" type="text" className="form-control form-control-lg bg-light fs-6" placeholder="Nama Lengkap" value={displayName} onChange={event => setDisplayName(event.target.value)}/>
          </div>

          <div className="input-group mb-3" style={{paddingLeft: '2rem'}}>
            <input id="email" type="email" className="form-control form-control-lg bg-light fs-6" placeholder="Alamat Email" value={email} onChange={event => setEmail(event.target.value)}/>
          </div>

          <div className="input-group mb-5" style={{paddingLeft: '2rem'}}>
            <input id="password" type="password" className="form-control form-control-lg bg-light fs-6" placeholder="Kata Sandi" value={password} onChange={event => setPassword(event.target.value)}/>
            <input type="password" className="form-control form-control-lg bg-light fs-6" placeholder="Ulangi kata sandi" value={confirmPassword} onChange={changeConfirmPassword}/>
          </div>
          <div className="password-information" style={{textAlign: "center"}}>
          {
                 errorConfirmPassword && (
               <p className="text-danger">{errorConfirmPassword}</p>
            )
          }
          </div>
        </div>
        <div style={{paddingLeft: '1.5rem', textAlign: "center"}}>
        {
            error && (
                <div className="text-danger">
                    <p>{error}</p>
                </div>
                )
            }
        {
           alert && (
                 <div className="text-primary">
                    <p>{alert}</p>
                 </div>
                )
        }
        </div>
        <div className="input-group mb-2" style={{paddingLeft: '1.5rem'}}>
          <button className="btn btn-lg btn-primary w-100 fs-6"
          onClick={event => { createUserWithEmailAndPasswordHandler(event, email, password);
          }}
          style={{background: '#0778A8'}}>Daftar</button>
        </div>

        <div className="input-group mb-2" style={{ paddingLeft: '1.5rem' }}>
                <button className="btn btn-lg btn-google w-100 fs-6" style={{ background: '#DB4437', color: '#fffff' }} onClick={signInWithGoogle}>
                  <img src="./images/white-google-logo.png" alt="Google Logo" className="google-logo" style={{ width: '25px', height: '25px', marginRight: '8px' }} />
                  <span style={{ color: '#ffffff' }}>Masuk dengan Google</span>
                </button>
              </div>

        <div className="row" style={{paddingLeft: '1.5rem'}}>
          <small style={{textAlign:'center'}}>Sudah punya akun? <a href="/masuk">Masuk</a></small>
        </div>
      </div>
    </div>
  </div>
</div>
  );
};
export default SignUp;
