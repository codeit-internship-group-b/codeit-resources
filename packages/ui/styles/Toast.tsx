import { ToastContainer } from "react-toastify";
import styled from "styled-components";

export const CustomToastContainer = styled(ToastContainer)`
  width: auto;

  .Toastify__toast-container {
    display: flex;
    justify-content: center;
    height: 44px;
  }

  .Toastify__toast {
    height: 44px;
    border-radius: 20px;
    font-size: 17px;
    line-height: 28px;
  }
  .Toastify__toast--success {
    background-color: #039127;
    border: 1px solid #413b541a;
    font-weight: 500;
    color: #ffffff;
  }
  .Toastify__toast--error {
    background-color: #413b54;
    border: 1px solid #413b54;
    font-weight: 500;
    color: #ffffff;
  }
`;
