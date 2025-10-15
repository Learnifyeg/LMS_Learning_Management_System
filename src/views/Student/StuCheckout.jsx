// React
import { useState, useEffect } from "react";
import { Lock } from "lucide-react";
import { useNavigate } from "react-router";
import { lazy, Suspense } from "react";
const Footer = lazy(() => import("../../components/Footer/Footer"));

function StuCheckout() {
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("card");

  // 🧾 Billing Address State
  const [address, setAddress] = useState({
    firstName: "Joginder",
    lastName: "Singh",
    academyName: "Gambolthemes",
    country: "India",
    address1: "#1234 Street No. 45, Ward No. 60, Phase 3",
    address2: "Shahid Karnail Singh Nagar, Near Pakhowal Road",
    city: "Ludhiana",
    state: "Punjab",
    postal: "141013",
    phone: "+91123456789",
  });

  // 💳 Card Details
  const [cardDetails, setCardDetails] = useState({
    holderName: "",
    cardNumber: "",
    expiryMonth: "",
    expiryYear: "",
    cvc: "",
  });

  // 🏦 Bank Details
  const [bankDetails, setBankDetails] = useState({
    bankName: "",
    accountNumber: "",
    iban: "",
  });

  useEffect(() => {
    const saved = localStorage.getItem("studentAddress");
    if (saved) setAddress(JSON.parse(saved));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddress((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    localStorage.setItem("studentAddress", JSON.stringify(address));
    alert("✅ saved succssesfuly");
    setShowForm(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (paymentMethod === "card") {
      const { holderName, cardNumber, expiryMonth, expiryYear, cvc } =
        cardDetails;

      if (!holderName || !cardNumber || !expiryMonth || !expiryYear || !cvc) {
        alert("⚠️ Please fill in all card details.");
        return;
      }

      if (!/^\d{16}$/.test(cardNumber)) {
        alert("⚠️ Card number must be 16 digits.");
        return;
      }

      if (!/^\d{3,4}$/.test(cvc)) {
        alert("⚠️ CVC must be 3 or 4 digits.");
        return;
      }

      console.log("💳 Card Details:", cardDetails);
      alert("✅ Card details logged successfully!");
    }

    if (paymentMethod === "bank") {
      const { bankName, accountNumber, iban } = bankDetails;

      if (!bankName || !accountNumber || !iban) {
        alert("⚠️ Please fill in all bank details.");
        return;
      }

      console.log("🏦 Bank Details:", bankDetails);
      alert("✅ Bank details logged successfully!");
    }

    if (paymentMethod === "paypal") {
      alert("🔷 Redirecting to PayPal...");
    }
  };
  useEffect(() => {
    if (paymentMethod === "paypal" && window.paypal) {
      window.paypal
        .Buttons({
          createOrder: function (data, actions) {
            return actions.order.create({
              purchase_units: [{ amount: { value: "51.00" } }],
            });
          },
          onApprove: function (data, actions) {
            return actions.order.capture().then(function (details) {
              alert(
                `✅ Transaction completed by ${details.payer.name.given_name}`
              );
            });
          },
        })
        .render("#paypal-button-container");
    }
  }, [paymentMethod]);

  return (
    <div className="w-full min-h-screen bg-card flex flex-col pt-16">
      {/* Header */}
      <div className="w-full bg-white dark:bg-gray-800 shadow-sm px-24 max-lg:px-6 max-md:px-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center px-4 sm:px-6 py-2 gap-2 sm:gap-0">
          <span className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">
            <a href="#" className="hover:underline cursor-pointer"
            onClick={() =>  navigate("/StudentLayout/StuDashboard")} >
              Home
            </a>{" "}
            {/* /{" "}
            <a href="#" className="hover:underline">
              Paid Membership
            </a>{" "} */}
            / Checkout
          </span>
        </div>
        <h1 className="px-4 sm:px-6 py-3 text-xl sm:text-2xl md:text-3xl font-semibold text-gray-800 dark:text-white">
          Checkout
        </h1>
      </div>

      {/* Main Section */}
      <div className="w-[70%] mx-auto mt-10 pb-32 grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Billing + Payment */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          {/* Billing */}
          <div className="bg-white dark:bg-gray-800 p-4 rounded shadow relative">
            <div className="flex justify-between items-center">
              <h1 className="inline-block text-lg font-semibold text-gray-800 dark:text-white">
                <span className="border-b-2 border-orange-400 pb-2">
                  Billing
                </span>{" "}
                Details
              </h1>
              <button
                onClick={() => setShowForm(!showForm)}
                className="w-8 h-8 flex items-center justify-center rounded-full cursor-pointer text-xl text-gray-800 dark:text-white"
              >
                {!showForm ? "+" : "-"}
              </button>
            </div>

            {/* Billing Info / Form */}
            {!showForm ? (
              <div className="text-sm text-gray-600 dark:text-gray-300 my-5 space-y-1">
                <p>
                  {address.firstName} {address.lastName}
                </p>
                <p>{address.address1}</p>
                <p>{address.address2}</p>
                <p>
                  {address.city}, {address.state}, {address.postal}
                </p>
                <p>{address.country}</p>
                <p>{address.phone}</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4 mt-4">
                {[
                  ["firstName", "First Name*"],
                  ["lastName", "Last Name*"],
                  ["academyName", "Academy Name*"],
                  ["country", "Country*"],
                  ["address1", "Address 1*"],
                  ["address2", "Address 2*"],
                  ["city", "City*"],
                  ["state", "State / Province / Region*"],
                  ["postal", "Zip / Postal Code*"],
                  ["phone", "Phone Number*"],
                ].map(([key, label]) => (
                  <div
                    key={key}
                    className={
                      [
                        "academyName",
                        "country",
                        "address1",
                        "address2",
                      ].includes(key)
                        ? "col-span-2"
                        : ""
                    }
                  >
                    <label className="block text-sm font-medium mb-1 text-gray-800 dark:text-gray-200">
                      {label}
                    </label>
                    <input
                      type="text"
                      name={key}
                      value={address[key]}
                      onChange={handleChange}
                      className="w-full border border-gray-300 dark:border-gray-700 rounded px-3 py-2 bg-white dark:bg-stone-950 text-gray-800 dark:text-gray-200 focus:ring-1 focus:ring-orange-400"
                    />
                  </div>
                ))}
                <div className="col-span-2 flex justify-end">
                  <button
                    onClick={handleSave}
                    className="bg-orange-400 text-white px-5 py-2 rounded hover:bg-orange-600 transition"
                  >
                    Save
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Payment Section */}
          <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
            <h1 className="inline-block text-gray-800 dark:text-white">
              <span className="border-b-2 border-orange-400 pb-2">Select</span>{" "}
              Payment Method
            </h1>
            <form onSubmit={handleSubmit}>
              <div className="flex border border-gray-200 dark:border-gray-700 rounded mb-6 bg-card mt-5">
                {["card", "bank", "paypal"].map((method) => (
                  <button
                    key={method}
                    type="button"
                    onClick={() => setPaymentMethod(method)}
                    className={`flex-1 py-2 px-4 text-center cursor-pointer ${
                      paymentMethod === method
                        ? "border-b-2 border-orange-400 text-orange-400 font-semibold bg-white dark:bg-stone-950"
                        : "text-gray-600 dark:text-gray-300"
                    }`}
                  >
                    {method === "card"
                      ? "Credit/Debit Card"
                      : method === "bank"
                      ? "Bank Transfer"
                      : "Paypal"}
                  </button>
                ))}
              </div>

              {/* Card Payment */}
              {paymentMethod === "card" && (
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="col-span-2">
                    <label className="block mb-1 text-sm font-medium text-gray-800 dark:text-gray-200">
                      Holder Name
                    </label>
                    <input
                      type="text"
                      value={cardDetails.holderName}
                      onChange={(e) =>
                        setCardDetails({
                          ...cardDetails,
                          holderName: e.target.value,
                        })
                      }
                      placeholder="Enter Holder Name"
                      className="w-full border border-gray-300 dark:border-gray-700 rounded px-3 py-2 bg-white dark:bg-stone-950 text-gray-800 dark:text-gray-200"
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="block mb-1 text-sm font-medium text-gray-800 dark:text-gray-200">
                      Card Number
                    </label>
                    <input
                      type="text"
                      value={cardDetails.cardNumber}
                      onChange={(e) =>
                        setCardDetails({
                          ...cardDetails,
                          cardNumber: e.target.value,
                        })
                      }
                      placeholder="Card #"
                      className="w-full border border-gray-300 dark:border-gray-700 rounded px-3 py-2 bg-white dark:bg-stone-950 text-gray-800 dark:text-gray-200"
                    />
                  </div>
                  <div>
                    <label className="block mb-1 text-sm font-medium text-gray-800 dark:text-gray-200">
                      Expiration Month
                    </label>
                    <select
                      value={cardDetails.expiryMonth}
                      onChange={(e) =>
                        setCardDetails({
                          ...cardDetails,
                          expiryMonth: e.target.value,
                        })
                      }
                      className="w-full border border-gray-300 dark:border-gray-700 rounded px-3 py-2 bg-white dark:bg-stone-950 text-gray-800 dark:text-gray-200"
                    >
                      <option>Month</option>
                      {[
                        "01",
                        "02",
                        "03",
                        "04",
                        "05",
                        "06",
                        "07",
                        "08",
                        "09",
                        "10",
                        "11",
                        "12",
                      ].map((m) => (
                        <option key={m}>{m}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block mb-1 text-sm font-medium text-gray-800 dark:text-gray-200">
                      Expiration Year
                    </label>
                    <input
                      type="text"
                      value={cardDetails.expiryYear}
                      onChange={(e) =>
                        setCardDetails({
                          ...cardDetails,
                          expiryYear: e.target.value,
                        })
                      }
                      placeholder="Year"
                      className="w-full border border-gray-300 dark:border-gray-700 rounded px-3 py-2 bg-white dark:bg-stone-950 text-gray-800 dark:text-gray-200"
                    />
                  </div>
                  <div>
                    <label className="block mb-1 text-sm font-medium text-gray-800 dark:text-gray-200">
                      CVC
                    </label>
                    <input
                      type="text"
                      value={cardDetails.cvc}
                      onChange={(e) =>
                        setCardDetails({ ...cardDetails, cvc: e.target.value })
                      }
                      placeholder="CVC"
                      className="w-full border border-gray-300 dark:border-gray-700 rounded px-3 py-2 bg-white dark:bg-stone-950 text-gray-800 dark:text-gray-200"
                    />
                  </div>
                </div>
              )}

              {/* Bank Transfer */}
              {paymentMethod === "bank" && (
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="col-span-2">
                    <label className="block mb-1 text-sm font-medium text-gray-800 dark:text-gray-200">
                      Bank Name
                    </label>
                    <input
                      type="text"
                      value={bankDetails.bankName}
                      onChange={(e) =>
                        setBankDetails({
                          ...bankDetails,
                          bankName: e.target.value,
                        })
                      }
                      placeholder="Enter Bank Name"
                      className="w-full border border-gray-300 dark:border-gray-700 rounded px-3 py-2 bg-white dark:bg-stone-950 text-gray-800 dark:text-gray-200"
                    />
                  </div>
                  <div>
                    <label className="block mb-1 text-sm font-medium text-gray-800 dark:text-gray-200">
                      Account Number
                    </label>
                    <input
                      type="text"
                      value={bankDetails.accountNumber}
                      onChange={(e) =>
                        setBankDetails({
                          ...bankDetails,
                          accountNumber: e.target.value,
                        })
                      }
                      placeholder="Enter Account Number"
                      className="w-full border border-gray-300 dark:border-gray-700 rounded px-3 py-2 bg-white dark:bg-stone-950 text-gray-800 dark:text-gray-200"
                    />
                  </div>
                  <div>
                    <label className="block mb-1 text-sm font-medium text-gray-800 dark:text-gray-200">
                      IBAN
                    </label>
                    <input
                      type="text"
                      value={bankDetails.iban}
                      onChange={(e) =>
                        setBankDetails({ ...bankDetails, iban: e.target.value })
                      }
                      placeholder="Enter IBAN"
                      className="w-full border border-gray-300 dark:border-gray-700 rounded px-3 py-2 bg-white dark:bg-stone-950 text-gray-800 dark:text-gray-200"
                    />
                  </div>
                </div>
              )}

              {/* Paypal */}
              {paymentMethod === "paypal" && (
                <div className="mt-6 mb-10 text-gray-600 dark:text-gray-300">
                  <p className="mb-4">
                    After payment via PayPal's secure checkout, you’ll receive a
                    download link.
                  </p>
                  <p className="font-semibold mb-2">PayPal accepts</p>
                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg"
                      alt="Visa"
                      className="h-6 object-contain"
                    />
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/0/04/Mastercard-logo.png"
                      alt="MasterCard"
                      className="h-8 object-contain"
                    />
                  </div>
                  <div id="paypal-button-container"></div>{" "}
                  {/* هنا هيتعمل render لزر PayPal */}
                </div>
              )}

              {/* Order Details */}
              <h3 className="font-semibold mb-4 text-gray-800 dark:text-white">
                <span className="border-b-2 border-orange-400 pb-2">Order</span>{" "}
                Details
              </h3>
              <div className="mb-2 flex justify-between text-gray-800 dark:text-gray-200">
                <span>Baby Plan</span>
                <span>$49</span>
              </div>
              <hr className="m-5 border-gray-300 dark:border-gray-700" />
              <div className="mb-2 flex justify-between text-gray-400 dark:text-gray-400">
                <span>Taxes (GST)</span>
                <span>$2</span>
              </div>
              <hr className="m-5 border-gray-300 dark:border-gray-700" />
              <div className="mb-6 flex justify-between font-bold text-gray-800 dark:text-white">
                <span>Total</span>
                <span>$51</span>
              </div>
              <hr className="m-5 border-gray-300 dark:border-gray-700" />
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-orange-400 text-white py-3 px-6 rounded hover:bg-orange-600 transition flex items-center gap-2"
                >
                  <Lock className="w-4 h-4" />
                  Confirm Checkout
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-4">
          <div className="sticky top-24 bg-white dark:bg-gray-800 p-4 rounded shadow">
            <h1 className="inline-block text-gray-800 dark:text-white">
              <span className="border-b-2 border-orange-400 pb-2">Order</span>{" "}
              Summary
            </h1>
            <div className="mt-4">
              <div className="flex justify-between items-center text-gray-800 dark:text-gray-200">
                <h2 className="font-semibold ml-2">Baby Plan</h2>
                <h2 className="mr-2">$49</h2>
              </div>
              <hr className="my-5 border-gray-300 dark:border-gray-700" />
              <div className="flex justify-between items-center text-gray-400 dark:text-gray-400">
                <h2 className="font-semibold ml-2">Taxes (GST)</h2>
                <h2 className="mr-2">$2</h2>
              </div>
              <hr className="my-5 border-gray-300 dark:border-gray-700" />
              <div className="flex justify-between items-center font-bold text-gray-800 dark:text-white">
                <h2 className="ml-2">Total</h2>
                <h2 className="mr-2">$51</h2>
              </div>
              <hr className="my-5 border-gray-300 dark:border-gray-700" />
              <h2 className="text-center mt-5 text-gray-400 dark:text-gray-400">
                <Lock className="w-5 h-5 text-gray-400 dark:text-gray-400 inline-block mr-1" />{" "}
                Secure Checkout
              </h2>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default StuCheckout;
