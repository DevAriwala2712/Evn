import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI('AIzaSyADxuFxmhCTJywjD_sB-ZjOMOVJ4g3hEGc');
async function test() {
  const models = ['gemini-1.5-flash', 'gemini-1.5-flash-latest', 'gemini-pro'];
  for (const m of models) {
    try {
      const model = genAI.getGenerativeModel({ model: m });
      const result = await model.generateContent('Hi');
      console.log(m + ' SUCCESS: ' + result.response.text());
    } catch(e) {
      console.log(m + ' FAILED: ' + e.message);
    }
  }
}
test();
