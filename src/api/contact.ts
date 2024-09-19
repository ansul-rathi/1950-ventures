import type { APIRoute } from "astro";
import mailchimp from "@mailchimp/mailchimp_marketing";

export const prerender = false;

// const { MAILCHIMP_API_KEY, MAILCHIMP_SERVER_PREFIX } = import.meta.env;
const MAILCHIMP_API_KEY = "a5bbd12b95c6c0904fc7c9e5b7d192ac";
const MAILCHIMP_SERVER_PREFIX = "us13";
console.log(`Mailchimp Server Prefix: ${MAILCHIMP_SERVER_PREFIX}`); // Debugging line

mailchimp.setConfig({
  apiKey: MAILCHIMP_API_KEY,
  server: MAILCHIMP_SERVER_PREFIX,
});

export const POST: APIRoute = async ({ request }) => {
  console.log("hiii");
  const { email, name, message } = (await request.json()) as {
    email: string;
    name: string;
    message: string;
  };

  if (!email || !name || !message) {
    return new Response(JSON.stringify({ error: "All fields are required" }), {
      status: 400,
    });
  }

  try {
    // Add member to Mailchimp list
    await mailchimp.lists.addListMember("0fb5bbe44c", {
      email_address: email,
      status: "subscribed",
      merge_fields: {
        FNAME: name,
        MESSAGE: message,
      },
    });

    return new Response(JSON.stringify({ message: "Submission successful" }), {
      status: 201,
    });
  } catch (error) {
    console.error("Mailchimp API Error:", error); // Debugging line
    return new Response(JSON.stringify({ error: (error as Error).message }), {
      status: 500,
    });
  }
};
