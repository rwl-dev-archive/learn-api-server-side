import { Handler } from "@netlify/functions";
import { statusCode, StatusCodeNumber } from "../../utils/status";

interface APIResponse {
  statusCode: StatusCodeNumber;
  body: string;
}

interface ResponseBody {
  data: {
    name: string;
    age: number;
    description: string;
  }[];
}

const response = <T extends {} | string>(
  statusCode: StatusCodeNumber,
  body: T,
): APIResponse => {
  if (typeof body === "string") {
    return {
      statusCode,
      body,
    };
  }
  return {
    statusCode,
    body: JSON.stringify(body),
  };
};

const data: ResponseBody["data"] = [{
  name: "あそまか といか",
  age: 24,
  description: "ある日突然思いついた謎の名前っぽいもの",
}, {
  name: "WhyK",
  age: 24,
  description: "私",
}];

const handler: Handler = async (event, context): Promise<APIResponse> => {
  if (event.headers.API_KEY !== process.env.API_KEY) {
    return response<string>(
      statusCode.unauthorized,
      `ERR!!! ${statusCode.unauthorized}`,
    );
  }
  return response<ResponseBody>(statusCode.ok, { data });
};

export { handler };
