import React, { useState } from 'react';
import 'gestalt/dist/gestalt.css';

import { auth } from '../../firebase/firebase';

const PasswordReset = () => {
  const [email, setEmail] = useState('');
  const [emailHasBeenSent, setEmailHasBeenSent] = useState(false);
  const [error, setError] = useState(null);
  const[alert, setAlert] = useState('');

  const sendResetEmail = event => {
    if(!email) {
      setError('Email wajib diisi');
      setTimeout(() => {
        setError('')
      }, 3000);
  } else {
    auth
      .sendPasswordResetEmail(email)
      .then(() => {
        setEmailHasBeenSent(true);
        setAlert('Silakan cek email Anda')
        setTimeout(() => {
          setEmailHasBeenSent(false);
          setAlert('')
        }, 3000);
      })
      .catch(() => {
        setError('Kesalahan mengatur ulang kata sandi');
        setTimeout(() => {
          setError('')
        }, 3000);
      });
    }
  };

  return (

    //Desain Baru
    <div>
    <meta charSet="UTF-8" />
    <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossOrigin="anonymous" />
    <link rel="stylesheet" href="style.css" />
    {/* <title>SIgn - Information System Signature</title>
    --------------------- Main Container ------------------------ */}
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      {/* --------------------- Login Container ------------------------ */}
      <div className="row border rounded-5 p-4 bg-white shadow box-area" style={{borderRadius: '15px', minHeight: '600px', maxHeight: '1200px'}}>
        {/* ------------------------- Left Box --------------------------- */}
        <div className="col-md-6 rounded-4 d-flex justify-content-center align-items-center flex-column left-box" style={{background: '#0778A8', borderRadius: '15px'}}>
          <div className="featured-image mb-1">
            <img src="../images/lupakatasandi-vector.png" className="img-fluid" alt="" style={{width: '300px'}} />
          </div>
          <p className="text-white fs-2" style={{fontWeight: 600}}>Lupa Kata Sandi</p>
        </div> 
        {/* ------------------ ------ Right Box -------------------------- */}
        <div className="col-md-6 right-box">
          <div className="row align-items-center">
            <div className="header-text mb-4" style={{paddingLeft: '1.5rem', paddingTop: '10.5rem'}}>
              <h2>Lupa Kata Sandi?</h2>
              <p>Silakan masukkan alamat email Anda di bawah ini dan tekan tombol "Atur Ulang Kata Sandi"</p>
            </div>
            <div className="input-group mb-3" style={{paddingLeft: '1.5rem'}}>
              <input type="email" className="form-control form-control-lg bg-light fs-6" placeholder="Alamat email" value={email} onChange={event => setEmail(event.target.value)}/>
            </div>
            <div className="input-group mb-3" style={{paddingLeft: '1.5rem'}}>
              <button className="btn btn-lg btn-primary w-100 fs-6" onClick={event => {sendResetEmail(event);}} style={{background: '#0778A8'}}>Atur Ulang Kata Sandi</button>
            </div>
            <div className='alert-shape' style={{paddingLeft: '1.5rem', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            {
                      alert && (
                          <div className="text-primary">
                              <p>{alert}</p>
                           </div>
                      )
              }
            {
                      error && (
                          <div className="text-danger">
                              <p>{error}</p>
                           </div>
                      )
              }
              </div>
            <div className="row" style={{paddingLeft: '1.5rem', display: 'flex', justifyContent: 'center', alignItems: 'center', width:'100%'}}>
              <small style={{textAlign:'center'}}>Kembali ke menu <a href="/masuk">Masuk</a></small>
            </div>
          </div>
        </div> 
      </div>
    </div>
  </div>
  );
};
export default PasswordReset;
