const Spinner = () => {
   return (
      <div>
         <img
            src="/loadingGif.gif"
            alt="LOADING..."
            style={{
               width: "140px",
               display: "block",
               margin: "20px auto 0 auto",
            }}
         />
         <h2
            style={{ textAlign: "center", fontSize: "30px", color: "GrayText" }}
         >
            Please wait <br /> BOO...
         </h2>
      </div>
   );
};

export default Spinner;
