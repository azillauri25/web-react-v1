import React, { useState } from 'react';
import { navigate } from '@reach/router';
import { auth, signInWithGoogle } from '../../firebase/firebase';
import 'gestalt/dist/gestalt.css';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const signInWithEmailAndPasswordHandler = (event, email, password) => {
    event.preventDefault();

    // Reset pesan kesalahan
    setError(null);

    // Validasi email dan password
    if (email.trim() === '') {
      setError('Email tidak boleh kosong');
      setTimeout(() => setError(null), 3000);
      return;
    }

    if (password.trim() === '') {
      setError('Kata sandi tidak boleh kosong');
      setTimeout(() => setError(null), 3000);
      return;
    }

    // Proses masuk dengan email dan password
    auth.signInWithEmailAndPassword(email, password)
    .catch(error => {
      if (error.code === 'auth/user-not-found') {
        setError('Pengguna tidak ditemukan');
      } else if (error.code === 'auth/wrong-password') {
        setError('Kata sandi salah');
      } else {
        setError('Terjadi kesalahan saat masuk dengan kata sandi dan email');
        console.error('Terjadi kesalahan saat masuk dengan kata sandi dan email', error);
      }
      setTimeout(() => setError(null), 3000);
    });
  };


  return (
    //Desain login form baru
    <div>
    <meta charSet="UTF-8" />
    <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossOrigin="anonymous" />
    <link rel="stylesheet" href="style.css" />
    <title>SIgn - Information System Signature</title>
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="row border rounded-5 p-4 bg-white shadow box-area" style={{ borderRadius: '15px', minHeight:'600px', maxHeight: '1200px' }}>
        <div className="col-md-6 rounded-4 d-flex justify-content-center align-items-center flex-column left-box" style={{ background: '#0778A8', borderRadius: '15px' }}>
          <div className="featured-image mb-1">
            <img src="./images/masuk-vector.png" alt ="love" className="img-fluid" style={{width: '400px'}} />
          </div>
          <p className="text-white fs-2" style={{fontWeight: 600}}>Masuk</p>
        </div>

        <div className="col-md-6 rounded-4 right-box" style={{paddingTop: '80px'}}>
          <div className="row align-items-center">
            <div className="header-text mb-4" style={{paddingLeft: '1.5rem'}}>
              <h2>Selamat Datang!</h2>
              <p>Masuk sekarang untuk akses sepuasnya semua layanan SIgn!</p>
            </div>
            <div className="input-group mb-3" style={{paddingLeft: '1.5rem'}}>
              <input type="email" className="form-control form-control-lg bg-light fs-6" placeholder="Masukkan email Anda" value={email} id="email" onChange={event => setEmail(event.target.value)}/>
            </div>
            <div className="input-group mb-1" style={{paddingLeft: '1.5rem'}}>
              <input type="password" className="form-control form-control-lg bg-light fs-6" placeholder="Masukkan kata sandi Anda" id="password" value={password} onChange={event => setPassword(event.target.value)}/>
            </div>
            <div className="input-group mb-5 d-flex justify-content-between">
              <div className="forgot" style={{paddingLeft: '1.5rem'}}>
                <small><a href="/lupa-katasandi">Lupa Kata Sandi?</a></small>
              </div>
            </div>
            <div className="message-box" style={{paddingLeft: "1.5rem", textAlign: "center"}}>
            {
              error && (
               <div className="text-danger">
                  <p>{error}</p>
                </div>
              )
            }
            </div>
            <div className="input-group mb-3" style={{paddingLeft: '1.5rem'}}>
              <button className="btn btn-lg btn-primary w-100 fs-6" style={{background: '#0778A8'}}
              onClick={event => {
                 signInWithEmailAndPasswordHandler(event, email, password);
                 navigate('/masuk');
                }}
                 >Masuk</button>
            </div>

              <div className="input-group mb-3" style={{ paddingLeft: '1.5rem' }}>
                <button className="btn btn-lg btn-google w-100 fs-6" style={{ background: '#DB4437', color: '#fffff' }} onClick={signInWithGoogle}>
                  <img src="./images/white-google-logo.png" alt="Google Logo" className="google-logo" style={{ width: '25px', height: '25px', marginRight: '8px' }} />
                  <span style={{ color: '#ffffff' }}>Masuk dengan Google</span>
                </button>
              </div>


            <div className="row" style={{paddingLeft: '1.5rem'}}>
              <small style={{textAlign: 'center'}}>Belum punya akun? <a href="/daftar">Daftar</a></small>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  );
};
export default SignIn;
