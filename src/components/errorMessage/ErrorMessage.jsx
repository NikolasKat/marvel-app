const ErrorMassage = () => {
   return (
      <div>
         <img
            src="/loadingGif.gif"
            alt="Error"
            style={{
               width: "140px",
               display: "block",
               margin: "20px auto 0 auto",
            }}
         />
         <h2
            style={{ textAlign: "center", fontSize: "30px", color: "GrayText" }}
         >
            BOO! <br /> Error!
         </h2>
      </div>
   );
};

export default ErrorMassage;
