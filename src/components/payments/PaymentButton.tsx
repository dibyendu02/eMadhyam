// // src/components/payment/PaymentButton.tsx
// import React from "react";
// import { useRazorpayPayment } from "@/hooks/useRazorpayPayment";

// import { useRouter } from "next/navigation";
// import toast from "react-hot-toast";
// import Button from "@/commons/components/button/Button";

// interface PaymentButtonProps {
//   products: string[];
//   amount: number;
//   disabled?: boolean;
// }

// export const PaymentButton: React.FC<PaymentButtonProps> = ({
//   products,
//   amount,
//   disabled,
// }) => {
//   const { initializePayment } = useRazorpayPayment();

//   const router = useRouter();

//   const handlePayment = async () => {
//     await initializePayment({
//       products,
//       amount,
//       onSuccess: () => {
//         toast.success("Your order has been placed successfully", {
//           duration: 2000,
//         });
//         router.push("/profile"); // Or wherever you want to redirect after successful payment
//       },
//       onError: (error) => {
//         toast.error(
//           "There was an error processing your payment. Please try again",
//           {
//             duration: 2000,
//           }
//         );
//         console.error("Payment error:", error);
//       },
//     });
//   };

//   return (
//     <Button
//       onClick={disabled ? () => {} : handlePayment}
//       className={`w-full ${disabled ? "opacity-50" : ""}`}
//       title={` Pay ₹${amount}`}
//     ></Button>
//   );
// };
