import {
  VerificationLoading,
  VerificationSuccess,
} from "@/components/verification";
import { verifyEmail } from "@/services/auth";
import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router";

function VerifyEmail() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [verificationStatus, setVerificationStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const token = searchParams.get("token");
    const email = searchParams.get("email");

    if (token && email) {
      const handleVerifyEmail = async () => {
        setVerificationStatus("loading");
        try {
          const response = await verifyEmail(token, email);
          setVerificationStatus("success");
          setMessage(response.message || "Email verified successfully!");
        } catch (error: any) {
          setVerificationStatus("error");
          setMessage(
            error.response?.data?.message ||
              "Verification failed. Please try again."
          );
        }
      };

      handleVerifyEmail();
    }
  }, [searchParams]);

  const handleGoToLogin = () => {
    navigate("/login");
  };

  const handleGoToDashboard = () => {
    navigate("/dashboard");
  };

  if (verificationStatus === "loading") {
    return <VerificationLoading />;
  }

  return (
    <VerificationSuccess
      message={message}
      onGoToLogin={handleGoToLogin}
      onGoToDashboard={handleGoToDashboard}
    />
  );
}

export default VerifyEmail;
