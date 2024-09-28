import  "react";
import { Card } from "primereact/card";
import styles from "./styles.module.css";
import Button from '../../components/button/Button';
import TextInput from "../../components/form/text/TextInput";


const ForgotPassword = () => {
  const handleEmailChange = (e) => {
    console.log("Email: ", e.target.value);
  };

  const handleSendVerificationCode = () => {
    console.log("Send verification code button clicked");
  };

  const handleContinue = () => {
    console.log("Continue button clicked");
  };

  const handleCancel = () => {
    console.log("Cancel button clicked");
  };

  return (
    <div className={styles.outerContainer}>
      <div className={styles.forgotPasswordContainer}>
        <Card className={styles.formCard}>
          <div className={styles.logoContainer}>
            <h1 style={{ textAlign: "center" }}>AllyIQ</h1>
          </div>
          <h2>Reset your password</h2>
          <p>Please provide the following details</p>
          <form>
            <div className={styles.inputContainer}>
              <TextInput
                id="email"
                name="email"
                placeholder="Email Address"
                // labelText="Email Address"
                register={() => {}}
                required="true"
                validation={handleEmailChange}
                className={styles.inputField}
              />
            </div>
            <Button
              type="button"
              onClick={handleSendVerificationCode}
              className={styles.primaryButton}
              name="Send verification code"
            />
            <div
              className={styles.buttonGroup}
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <Button
                type="button"
                onClick={handleContinue}
                className={styles.secondaryButton}
                name="Continue"
                style={{ marginRight: "10px" }}
              />
              <Button
                type="button"
                onClick={handleCancel}
                className={styles.cancelButton}
                name="Cancel"
              />
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default ForgotPassword;
