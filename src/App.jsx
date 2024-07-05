import { Html5Qrcode } from "html5-qrcode";
import { useEffect, useState } from "react";

const elementId = "reader";
let scanner;


const App = () => {
  const [qrcode, setQrcode] = useState("");

  useEffect(() => {
    scanner = new Html5Qrcode(elementId);
  }, [])

  const qrCodeSuccessCallback = (decodedText, decodedResult) => {
    console.log(decodedText, decodedResult);
    setQrcode(decodedText);
  };


  const handleStartScan = async () => {

    const camera = await Html5Qrcode.getCameras().then(devices => {
      if (devices && devices.length) {
        return devices;
      }
    }).catch(error => {
      return error;
    })

    const id = camera[0].id;
    const config = {
      fps: 10,
      qrbox: { width: 250, height: 250 }
    }

    scanner.start({ deviceId: { exact: id } }, config, qrCodeSuccessCallback)

  }

  const handleStopScan = () => {
    scanner.stop();
    setQrcode("");
  }

  return (
    <div>
      <div className="btn" onClick={handleStartScan}> Scanner QR code </div>
      <div className="btn" onClick={handleStopScan}>Stop</div>
      <div>
        <div id={elementId}></div>
        <div>
          <p>Result: {qrcode}</p>
        </div>
      </div>
    </div>
  );
};

export default App;
