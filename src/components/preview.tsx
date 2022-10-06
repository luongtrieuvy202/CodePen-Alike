import { useEffect, useRef } from "react";
import "./preview.css";

interface PreviewProps {
  code: string;
  bundlingStatus: string;
}

const html = `
    <html>
      <head>
      <style>html {background-color:'white'}</style></head>
      <body>
        <div id='root'></div>
        <script>

          const handleError = (error) => {
              const root = document.querySelector('#root');
              root.innerHTML = '<div style="color:red;"><h4>' + error + '</h4></div>';
          }

          window.addEventListener('error',(event) =>{
            handleError(event.error);
          });

          window.addEventListener('message', (event) => { 
            try{
              eval(event.data)
            }catch(error){
              handleError(error);
            };
          },false);
        </script>
      </body>
    </html>
  `;

const Preview: React.FC<PreviewProps> = ({ code, bundlingStatus }) => {
  const iframe = useRef<any>();

  useEffect(() => {
    iframe.current.srcdoc = html;
    setTimeout(() => {
      iframe.current.contentWindow.postMessage(code, "*");
    }, 50);
  }, [code]);

  return (
    <div className="preview-wrapper">
      <iframe
        style={{ backgroundColor: "white" }}
        title="preview"
        ref={iframe}
        sandbox="allow-scripts"
        srcDoc={html}
      />
      {bundlingStatus && <div className="preview-error">{bundlingStatus}</div>}
    </div>
  );
};

export default Preview;
