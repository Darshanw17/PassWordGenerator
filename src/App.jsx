import { useState, useCallback, useEffect, useRef } from 'react'
import './App.css'

function App() {
  const [length, setlength] = useState(8)
  const [numberallowed, setnumberAllowed] = useState(false);
  const [password, setPassword] = useState();
  const [charAllowed, setcharAllowed] = useState(true);

  const passwordRef = useRef(null)

  const generatePassword = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz012"

    if (numberallowed) str += "0123456789"
    if (charAllowed) str += "!@#$%^&*()"
    for (let i = 0; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }

    setPassword(pass)

  }, [length, numberallowed, charAllowed, setPassword])
  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password)
  }, [password])

  useEffect(() => { generatePassword() }, [length, numberallowed, charAllowed, generatePassword]);
  return (

    <div className='w-full max-w-md mx-auto shadow-md
    rounded-lg px-4 py-8 text-white-500 bg-gray-700'>
      <h1 className='text-white text-center my-3'>PasswordGenerator</h1>
      <div className='flex shadow rounded-lg overflow-hidden mb-4'>
        <input type="text"
          value={password}
          className='outline-none w-full py-1 px-3'
          placeholder='password'
          readOnly
          ref={passwordRef}
        />
        <button onClick={copyPasswordToClipboard}
          className='outline-none px-3 py-1 text-white bg-blue-500'>Copy</button>


      </div>
      <div className='flex text-sm gap-x-2'>
        <div className='flex items-center'>
          <input type="range" min={6} max={50} value={length} className='cursor-pointer' onChange={(e) => setlength(e.target.value)} />
          <label>Length:{length}</label>
        </div>
        <div className='flex items-center'>
          <input type="checkbox" checked={numberallowed} onChange={() => {
            setnumberAllowed((preview) => !preview);
          }} />
          <label>Number</label>
        </div>
        <div className='flex items-center'>
          <input type="checkbox" checked={charAllowed} onChange={() => {
            setcharAllowed((preview) => !preview);
          }} />
          <label>Char</label>
        </div>
      </div>
    </div>

  )
}


export default App
