import { Component } from "react";
import ErrorMassage from "../errorMessage/ErrorMessage";

class ErrorBoundary extends Component {
   state = {
      error: false,
   };

   componentDidCatch(error, info) {
      console.log(error, info);
      this.setState({ error: true });
   }

   render() {
      if (this.state.error) {
         return (
            <h2 style={{ textAlign: "center" }}>
               Something went wrong <br /> <ErrorMassage />
            </h2>
         );
      }

      return this.props.children;
   }
}

export default ErrorBoundary;
