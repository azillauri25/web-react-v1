import React, { useState } from 'react';
import { auth } from '../../firebase/firebase';

const PasswordUpdate = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handlePasswordReset = async (e) => {
    e.preventDefault();
  
    if (!password) {
      setError('Kata sandi tidak boleh kosong');
      setTimeout(() => setError(null), 3000);
      return;
    }
  
    if (!confirmPassword) {
      setError('Konfirmasi kata sandi tidak boleh kosong');
      setTimeout(() => setError(null), 3000);
      return;
    }
  
    if (password.length < 8) {
      setError('Kata sandi minimal berisikan 8 karakter');
      setTimeout(() => setError(null), 3000);
      return;
    }
  
    if (password !== confirmPassword) {
      setError('Kedua kata sandi harus cocok');
      setTimeout(() => setError(null), 3000);
      return;
    }
  
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const oobCode = urlParams.get('oobCode');
  
      await auth.confirmPasswordReset(oobCode, password);
      setSuccess('Kata sandi berhasil diperbarui, silakan masuk kembali!');
      setTimeout(() => setSuccess(null), 3000);
    } catch (error) {
      setError('Terjadi kesalahan saat mengatur ulang kata sandi');
      console.error('Terjadi kesalahan saat mengatur ulang kata sandi', error);
      setTimeout(() => setError(null), 3000);
    }
  };

  return (
    <div>
    <meta charSet="UTF-8" />
    <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossOrigin="anonymous" />
    <link rel="stylesheet" href="style.css" />
    <title>SIgn - Information System Signature</title>
    {/*--------------------- Main Container ------------------------*/}
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      {/*--------------------- Login Container ------------------------*/}
      <div className="row border rounded-5 p-3 bg-white shadow box-area" style={{minHeight: '600px', maxHeight: '1200px', borderRadius: '15px'}}>
        {/*------------------------- Left Box ---------------------------*/}
        <div className="col-md-6 rounded-4 d-flex justify-content-center align-items-center flex-column left-box" style={{background: '#0778A8', borderRadius: '15px'}}>
          <div className="featured-image mb-1">
            <img src="../images/forgot-password-vector.png" className="img-fluid" style={{width: '350px'}} />
          </div>
          <p className="text-white fs-2" style={{fontWeight: 600}}>Atur Ulang Kata Sandi</p>
        </div>
        {/*------------------ ------ Right Box --------------------------*/}
                    <div className="col-md-6 right-box" style={{paddingTop:'9rem'}}>
                        <div className="row align-items-center">
                        <form onSubmit={handlePasswordReset}>
                            <div className="header-text mb-4" style={{ paddingLeft: '1.5rem' }}>
                                    <h2>Buat Kata Sandi</h2>
                                    <p>Kata sandi baru Anda harus berbeda dari kata sandi yang digunakan sebelumnya.</p>
                            </div>
                            <div className="message-box" style={{ paddingLeft: "1.5rem", textAlign: "center" }}>
                            </div>
                            <div className="input-group mb-3" style={{ paddingLeft: '1.5rem' }}>
                                <input type="password" className="form-control form-control-lg bg-light fs-6" placeholder="Masukkan kata sandi baru" id='password' value={password} onChange={(e) => setPassword(e.target.value)} />
                            </div>
                            <div className='pass-validation' style={{ paddingLeft: '1.5rem', textAlign: 'center' }}>
                            </div>
                            <div className="input-group mb-1" style={{ paddingLeft: '1.5rem' }}>
                                <input type="password" className="form-control form-control-lg bg-light fs-6" placeholder="Konfirmasi kata sandi baru" id='confirmPassword' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                            </div>
                            <div className='pass-validation' style={{ paddingLeft: '1.5rem', textAlign: 'center' }}>
                            </div>
                            <div className='pass-validation' style={{ paddingLeft: '1.5rem', textAlign: 'center' }}>
                                {
                                    error && (
                                        <div className="text-danger">
                                            <p>{error}</p>
                                        </div>
                                    )
                                }
                            </div>
                            <div className="input-group mb-3" style={{ paddingTop: '1rem', paddingLeft: '1.5rem', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                                  <div className='password-success'>
                                      {success && (
                                          <div className="text-primary">
                                              <p>{success}</p>
                                          </div>
                                      )}
                                  </div>
                                <button className="btn btn-lg btn-primary w-100 fs-6" style={{ background: '#0778A8' }} type='submit'>Simpan Kata Sandi</button>
                            </div>
                            <div className="row" style={{ paddingLeft: '1.5rem', textAlign:'center'}}>
                                <small>Kembali <a href="/masuk">Masuk</a></small>
                            </div>
                            </form>
                        </div>
                    </div>
            </div>
        </div>
  </div >
  );
};

export default PasswordUpdate;
