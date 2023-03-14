import { useState } from 'react';
import './App.css';
import { Configuration, OpenAIApi } from 'openai';
import Card from './components/Card';

function App() {
  const [result, setResult] = useState('');
  const [stringTipo, setStringTipo] = useState('');
  const [stringAtributo, setStringAtributo] = useState('');
  const arrayResult = [];

  const stringSearch = `Pokemon tipo ${stringTipo} con ${stringAtributo}`;

  const configuration = new Configuration({
    apiKey: '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',
  });

  const openai = new OpenAIApi(configuration);

  const generateImage = async () => {
    const res = await openai.createImage({
      prompt: stringSearch,
      n: 1,
      size: '1024x1024',
    });
    setResult(res.data.data[0].url);
  };
  
  arrayResult.push(stringSearch);
  console.log(arrayResult)

  return (
    <div className='App'>
      <h2>Generador de Pokemones por IA</h2>
      <select
        name='tipo'
        id='tipo'
        onChange={(e) => setStringTipo(e.target.value)}
      >
        <option value='Fuego'>Fuego</option>
        <option value='Agua'>Agua</option>
        <option value='Planta'>Planta</option>
        <option value='Electrico'>Electrico</option>
      </select>

      <select
        name='atributo'
        id='atributo'
        onChange={(e) => setStringAtributo(e.target.value)}
      >
        <option value='Alas'>Alas</option>
        <option value='Dientes Grandes'>Dientes Grandes</option>
        <option value='Cola larga'>Cola larga</option>
        <option value='Antenas'>Antenas</option>
      </select>

      <h1>{stringSearch}</h1>

      <button onClick={generateImage}>Generar</button>

      {arrayResult.map(res => <Card res={res} />)}

      {result.length > 0 ? (
        <img src={result} alt='result' className='imagenGenerated' />
      ) : null}
    </div>
  );
}

export default App;
