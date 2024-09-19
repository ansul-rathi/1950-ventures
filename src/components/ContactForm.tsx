import { useEffect, useState, type FormEvent } from "react";

const Loader = () => (
  <svg
    aria-hidden="true"
    style={{ margin: "auto" }}
    className="flex w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600 justify-start items-start"
    viewBox="0 0 100 101"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
      fill="currentColor"
    />
    <path
      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
      fill="currentFill"
    />
  </svg>
);

export default function SubscribeForm() {
  const [responseMessage, setResponseMessage] = useState("");
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [values, setValues] = useState({
    email: "",
    name: "",
    message: "",
  });
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    if (responseMessage) {
      setIsPopupOpen(true);
    }
  }, [responseMessage]);

  const closeModal = () => {
    setIsPopupOpen(false);
    setResponseMessage("");
  };

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!values.email || !values.name || !values.message) {
      setResponseMessage("Please fill in all the fields before submitting.");
      setIsPopupOpen(true);
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error("Something went wrong");
      }

      const data = await response.json();
      setLoading(false);
      if (data.message) {
        setResponseMessage(
          "We’ve received your message and will get back to you shortly."
        );
        setValues({ email: "", name: "", message: "" });
      }
    } catch (err) {
      setLoading(false);
      setResponseMessage("We have already captured your response.");
      setIsPopupOpen(true);
    }
  }

  const onChange = (ev: any, key: string) => {
    setValues((v) => ({ ...v, [key]: ev.target.value }));
  };

  return (
    <div className="relative container px-4 mx-auto max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl z-10 sm:mt-10">
      <form
        onSubmit={submit}
        noValidate
        className="bg-gray-400 bg-opacity-10 backdrop-filter backdrop-blur-lg p-6 sm:p-8 rounded-lg shadow-md"
      >
        <div className="flex flex-col gap-4 w-full">
          <div className="mb-4">
            <span className="block text-black font-bold mb-2">Name</span>

            <input
              type="text"
              name="name"
              id="name"
              className="w-full px-3 py-2 rounded-lg bg-white bg-opacity-20 text-black border-2 border-black focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              onChange={(event) => onChange(event, "name")}
              value={values.name}
              autoComplete="name"
            />
          </div>
          <div className="mb-4">
            <span className="block text-black font-bold mb-2">Email</span>
            <input
              type="email"
              name="email"
              id="email"
              className="w-full px-3 py-2 rounded-lg bg-white bg-opacity-20 text-black border-2 border-black focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              value={values.email}
              onChange={(event) => onChange(event, "email")}
              autoComplete="email"
            />
          </div>
          <div className="sm:col-span-2 mb-4">
            <span className="block text-black font-bold mb-2">Message</span>
            <textarea
              name="message"
              id="message"
              rows={4}
              className="w-full px-3 py-2 rounded-lg bg-white bg-opacity-20 text-black border-2 border-black focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(event) => onChange(event, "message")}
              value={values.message}
              autoComplete="message"
              required
            ></textarea>
          </div>
        </div>

        {isLoading ? (
          <div className="mt-4">
            <Loader />
          </div>
        ) : (
          <div className="text-center">
            <button className="px-6 py-2 w-full sm:w-auto rounded-lg bg-blue-600 hover:bg-blue-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
              Submit
            </button>
          </div>
        )}

        {/* {responseMessage && (
          <p className="flex justify-end text-black mt-4">{responseMessage}</p>
        )} */}
      </form>

      {isPopupOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-3 sm:p-4 lg:p-5">
          <div className="bg-white p-3 sm:p-4 lg:p-5 rounded-lg shadow-lg border-2 border-black transform transition-transform duration-300 ease-out scale-100 max-w-full sm:max-w-md lg:max-w-lg mx-auto">
            <h2 className="text-lg sm:text-xl lg:text-2xl font-bold mb-3 text-center text-black">
              {/* {responseMessage ===
              "Thank you for your response, our team will contact you soon!!!"
                ? "Thank You"
                : "Oops!"} */}
              Thank you for your inquiry!
            </h2>
            <p className="text-center text-sm sm:text-md lg:text-lg text-black">
              {responseMessage}
            </p>
            <button
              onClick={closeModal}
              className="mt-3 sm:mt-4 border-2 border-black text-black px-2 py-1 rounded-3xl transition-all duration-200 ease-in-out mx-auto block text-xs sm:text-sm font-semibold w-24"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
