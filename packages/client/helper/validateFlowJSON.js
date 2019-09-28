export default function validateFlowJSON(jsonStringified) {
  let jsonFlow;

  if(typeof jsonStringified === 'string') {
    try {
      jsonFlow = JSON.parse(jsonStringified);
    } catch(e) {
      return null;
    }
  } else {
    jsonFlow = jsonStringified
  }
  

  delete jsonFlow.id;
  if (!jsonFlow.name) jsonFlow.name = 'Imported';
  if (!jsonFlow.nodes) jsonFlow.nodes = [];

  return jsonFlow;
};
