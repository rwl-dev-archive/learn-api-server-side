import { Handler } from '@netlify/functions';

interface StatusMessage {
  statusCode: number
  body: string
}

const handler: Handler = async (event, context): Promise<StatusMessage> => {
  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Hello, World!!'})
  }
}

export { handler }
