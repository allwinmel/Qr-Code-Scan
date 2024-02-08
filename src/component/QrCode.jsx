import { useState } from "react"

export const QrCode = () => {
  const [img, setImg] =useState("")
  const [loading,setLoading] = useState (false);
  const [qrData, setQrData] = useState ("https://651ffa3ead961621802f2c3e--allwin-portfolio.netlify.app");
  const [qrSize, setQrSize] = useState ("150");

  async function generateQR() {
    setLoading(true);
    try {
    const url = `https://api.qrserver.com/v1/create-qr-code/?size=${qrSize}x${qrSize}&data=${encodeURIComponent(qrData)}`;
    setImg(url);
    }catch (error) {
     console.log("Error generating QR code", error);
    }finally {
      setLoading(false);
    }
  }
  function downloadQR() {
    fetch(img)
    .then((response)=>response.blob())
    .then((blob)=> {
      const link=document.createElement("a");
      link.href=URL.createObjectURL(blob);
      link.download="QR-Code.jpg";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      })
      .catch((error) =>{
      console.log("Error downloading QR code", error);

    })
  }

  return (
    <div className="app-container">
        <h1>QR CODE GENERATOR</h1>
        {loading && <p>Please wait...</p>}
       {img && <img src={img} alt="QR Code" className="qr-code-image" />}
     <div>
        <label htmlFor="dataInput" className="input-label" > 
        Data for QR code:       
        </label>
        <input type="text" value={qrData} id="dataInput" placeholder="Enter data for QR code" onChange={(e)=>setQrData(e.target.value)} />
        <label htmlFor="sizeInput" className="input-label"> 
        Image size (e.g., 150):       
        </label>
        <input type="text" value={qrSize} onChange={(e)=>setQrSize(e.target.value)}  id="sizeInput" placeholder="Image size" />
        <button className="generate-button" disabled={loading}onClick={generateQR}>Generate QR Code</button>
        <button className="download-button" onClick={downloadQR}>Download QR Code</button>
        </div>   
        <p className="footer">
            Designed by: <a href="https://651ffa3ead961621802f2c3e--allwin-portfolio.netlify.app/">
        Allwin Mel</a></p>
    </div>
  )
}
