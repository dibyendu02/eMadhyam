// import { useCallback } from "react";
// import { paymentService } from "@/services/api/paymentService";
// import { useDispatch } from "react-redux";
// import { clearCart } from "@/store/slices/cartSlice"; // Assuming you have this action
// import { RAZORPAY_CONFIG } from "@/services/config/razorpayConfig";

// interface PaymentOptions {
//   products: string[];
//   amount: number;
//   onSuccess?: () => void;
//   onError?: (error: any) => void;
// }

// export const useRazorpayPayment = () => {
//   const dispatch = useDispatch();

//   const loadRazorpayScript = (): Promise<boolean> => {
//     return new Promise((resolve) => {
//       const script = document.createElement("script");
//       script.src = "https://checkout.razorpay.com/v1/checkout.js";
//       script.onload = () => resolve(true);
//       script.onerror = () => resolve(false);
//       document.body.appendChild(script);
//     });
//   };

//   const initializePayment = useCallback(
//     async ({ products, amount, onSuccess, onError }: PaymentOptions) => {
//       try {
//         const scriptLoaded = await loadRazorpayScript();
//         if (!scriptLoaded) {
//           throw new Error("Razorpay SDK failed to load");
//         }

//         const orderResponse = await paymentService.createOrder(products);
//         const { razorpayOrder } = orderResponse;

//         const options = {
//           key: RAZORPAY_CONFIG.keyId,
//           amount: razorpayOrder.amount,
//           currency: razorpayOrder.currency,
//           name: "eMadhyam",
//           description: "Purchase from eMadhyam",
//           order_id: razorpayOrder.id,
//           handler: async (response: any) => {
//             try {
//               // Verify payment
//               const verificationResponse = await paymentService.verifyPayment({
//                 razorpay_order_id: response.razorpay_order_id,
//                 razorpay_payment_id: response.razorpay_payment_id,
//                 razorpay_signature: response.razorpay_signature,
//               });

//               if (
//                 verificationResponse.message === "Payment verified successfully"
//               ) {
//                 dispatch(clearCart());
//                 onSuccess?.();
//               }
//             } catch (error) {
//               onError?.(error);
//             }
//           },
//           prefill: {
//             name: "", // You can get these from user redux store
//             email: "",
//             contact: "",
//           },
//           theme: {
//             color: "#528FF0",
//           },
//         };

//         const razorpay = new (window as any).Razorpay(options);
//         razorpay.open();
//       } catch (error) {
//         onError?.(error);
//       }
//     },
//     [dispatch]
//   );

//   return { initializePayment };
// };
