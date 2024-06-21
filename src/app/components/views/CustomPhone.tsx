import styled from 'styled-components';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

const CustomPhoneInput = styled(PhoneInput)`
  .react-tel-input .form-control {
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    padding: 0px;
    width: 410px;
    height: 34px;
    background: #ffffff;
    border: 1px solid #e1e3e6;
    box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.05);
    border-radius: 8px;
    flex: none;
    order: 3;
    align-self: stretch;
    flex-grow: 0;
  }

  .react-tel-input .flag-dropdown {
    border: none;
    background: none;
  }

  .react-tel-input .selected-flag {
    margin-right: 8px;
  }

  .react-tel-input .country-list {
    background: white;
    border: 1px solid #e1e3e6;
    border-radius: 8px;
    box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.05);
  }

  .react-tel-input .country {
    padding: 8px;
  }
`;

export default CustomPhoneInput;
