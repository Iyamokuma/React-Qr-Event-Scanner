import {QrScanner} from '@yudiel/react-qr-scanner';
import AttendeeForm from './AttendeeForm';
import { useState } from 'react';
import axios from 'axios';

const App = () => {
  const [response, setResponse] = useState("")
  return (
    <div>
      <QrScanner
      scanDelay= { 20000 }
          onDecode={(result) =>{
            console.log(result)
            let resultArray= result.split(',')
            console.log(resultArray[3]);
            axios.get("http://localhost:5000/attendees/"+ resultArray[3]).then(res=>console.log(res)).catch(err=>console.log(err))
          }}
          onError={(error) => console.log(error?.message)}
      />
      <h1>{response}</h1>
      <AttendeeForm/>
      </div>
  );
}

export default App;
