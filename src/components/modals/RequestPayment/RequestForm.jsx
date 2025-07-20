import PropTypes from "prop-types";
import { Button } from "react-bootstrap";
import { FormProvider, useForm } from "react-hook-form";
import InputField from "../../Inputfields/InputField";
import { useInitiateSettlement } from "../../../hooks/settlements/useInitiateSettlement";
import { useAuth } from "../../../hooks/useAuth";
import { useEffect } from "react";
import { useHospitalTransactions } from "../../../hooks/settlements/useHospitalTransactions";
import { useFetchWallet } from "../../../hooks/settlements/useFetchWallet";
import { toast } from "react-toastify";

function RequestForm(props) {
  const { handleClose } = props;
  const methods = useForm();
  const { hospitalId } = useAuth();
  const { mutate, isLoading } = useInitiateSettlement();
  const { data: settlements } = useHospitalTransactions(hospitalId);
  const { data: walletData } = useFetchWallet(hospitalId);

  // Reset form when settlements data changes
  useEffect(() => {
    if (settlements) {
      methods.reset();
    }
  }, [settlements]);

  const onRequestPayment = async (data) => {
    const paymentRequest = {
      hospital_id: hospitalId,
      // "doctor_id":"",
      amount: data.requestAmount,
      note: "",
    };
    if (data?.requestAmount <= 0) {
      const errorMessage = "Please enter a valid amount";
      toast.error(errorMessage);
    } else {
      await mutate(paymentRequest, {
        onSuccess: () => {
          handleClose();
        },
      });
    }
  };

  return (
    <>
      <div>
        <div className="main-balance">
          <p>Main Balance</p>
          <h4>₹ {walletData?.balance_amount ?? 0}</h4>
        </div>
        <div className="settlement-card mt-2">
          <div className="settlemet-details">
            <p>Total Earnings</p>
            <h4 className="text-primary">₹ {walletData?.total_amount ?? 0}</h4>
          </div>
          <div className="settlemet-details">
            <p>Withdrawal Amount</p>
            <h4>₹ {walletData?.withdrawal_amount}</h4>
          </div>
        </div>
      </div>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onRequestPayment)}>
          <div className="payment-request-form-container mt-2">
            <InputField
              name="requestAmount"
              label="Request For Amount"
              validation={{ required: "Amount is required" }}
              placeholder="Enter amount"
              type="text"
              customValidate={(value) => {
                const amount = parseFloat(value);
                const balance = parseFloat(walletData?.balance_amount ?? 0);
                if (isNaN(amount)) return "Enter a valid number";
                if (amount > balance)
                  return `Please enter an amount greater than or equal to ₹${balance}.`;
                return true;
              }}
            />
          </div>

          <div className="d-flex justify-content-end ps-3 pe-3 mt-3 mb-4">
            <Button
              variant="primary"
              // onClick={handleClose}
              className="ps-5 pe-5"
              type="submit"
            >
              {isLoading && (
                <span
                  className="spinner-border spinner-border-sm"
                  aria-hidden="true"
                ></span>
              )}
              <span className="ps-2">Request Now</span>
            </Button>
          </div>
        </form>
      </FormProvider>
    </>
  );
}

// props validation
RequestForm.propTypes = {
  handleClose: PropTypes.func.isRequired,
};

export default RequestForm;
