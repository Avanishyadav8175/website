// components
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

export default function OrderNotGeneratedDialog({
  mode,
  paymentSuccessful,
  showDialog,
  onChangeShowDialog
}: {
  mode: "initiate" | "retry";
  paymentSuccessful: boolean;
  showDialog: boolean;
  onChangeShowDialog: (showDialog: boolean) => void;
}) {
  return (
    <Dialog
      open={showDialog}
      onOpenChange={onChangeShowDialog}
    >
      <DialogContent>
        <DialogTitle className="hidden"></DialogTitle>
        <section className="flex flex-col items-start justify-center">
          <h3>{`Payment ${paymentSuccessful ? "Successful" : "Failed"}, ${mode === "initiate" ? "Order Pending" : "Couldn't Update Order"}.`}</h3>
          <span>
            {`Thank you for your payment${paymentSuccessful ? "" : " attempt"}! ${paymentSuccessful ? "Your transaction was successfully completed, but w" : "W"}e encountered a technical issue while ${paymentSuccessful ? "generating" : "updating"} your order. Rest assured, we have captured all your order details and are working to resolve this promptly. You will receive a confirmation once your order is successfully processed. If you have any questions, please contact our support team.`}
          </span>
        </section>
      </DialogContent>
    </Dialog>
  );
}
